//
// Secure messages: routes.
//
// Read this file as the spec. The four rules every route respects:
//
// 1. Notify pings, secure messages holds the content. Nothing here
//    sends content to a phone or inbox. /notification only shows the
//    neutral ping.
// 2. Sign-in is the gate for reading, downloading and replying. See
//    requireOneLogin and requireReplyAccess.
// 3. Every interaction is an event on the case. See recordEvent.
// 4. Channel choice is the customer's, but the record is single. A
//    reply by One Login and a reply by paper code run through the same
//    /reply routes and land on the same message and the same events.
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const defaults = require('./data/session-data-defaults.js')

// ---------------------------------------------------------------------
// Scenarios
// ---------------------------------------------------------------------

// Each scenario is the same customer and the same letters. What
// differs is how the customer reaches them, so what differs in the data
// is contact preference, how sign-in goes, and what has already
// happened on the case.
const SCENARIOS = {
  digital: {
    name: 'Digital customer signs in and replies',
    description: 'Dana has given DVLA an email address and mobile number. She gets the text, signs in with GOV.UK One Login, reads the letter and replies.',
    contactPreference: 'both',
    signInSucceeds: true,
    startUrl: '/notification'
  },
  paper: {
    name: 'Paper customer uses the code',
    description: 'Dana has given DVLA no email or mobile number. She has only the paper letter, and uses the code printed on it to reply.',
    contactPreference: 'none',
    signInSucceeds: false,
    startUrl: '/code'
  },
  failedSignIn: {
    name: 'Sign-in fails, customer switches to the code',
    description: 'Dana gets the text and tries to sign in, but GOV.UK One Login cannot confirm who she is. She uses the code from her paper letter instead.',
    contactPreference: 'sms',
    signInSucceeds: false,
    startUrl: '/notification'
  }
}

// What happened on the case before the workshop starts. A notified
// event is only seeded for channels the customer has given us, and an
// earlier sign-in only for the customer whose sign-in works.
function seedEvents (scenario) {
  const { contactPreference, signInSucceeds } = SCENARIOS[scenario]
  const events = []
  const channels = {
    email: ['email'],
    sms: ['sms'],
    both: ['email', 'sms'],
    none: []
  }[contactPreference]

  const notify = (timestamp, messageId) => channels.forEach(channel => {
    events.push({ timestamp, messageId, type: 'notified', route: null, channel })
  })

  notify('2026-09-08T09:02:00', 'msg-003')
  if (signInSucceeds) {
    events.push({ timestamp: '2026-09-09T19:41:00', messageId: null, type: 'signInStarted', route: 'oneLogin' })
    events.push({ timestamp: '2026-09-09T19:43:00', messageId: null, type: 'signInCompleted', route: 'oneLogin' })
    events.push({ timestamp: '2026-09-09T19:43:00', messageId: 'msg-003', type: 'opened', route: 'oneLogin' })
  }
  notify('2026-10-09T09:05:00', 'msg-004')
  // No notified event for the serving notice. The ping goes when the
  // secure copy becomes available, not when the paper is posted.
  return events
}

// The case record has secure copies opened before today only for a
// customer who has signed in before.
function seedOpened (data) {
  if (SCENARIOS[data.scenario].signInSucceeds) {
    findMessage(data, 'msg-003').openedAt = '2026-09-09T19:43:00'
  }
}

// Deep-clones the defaults so no session ever writes into them.
function seed (req, scenarioKey) {
  const scenario = SCENARIOS[scenarioKey] ? scenarioKey : 'digital'
  const notes = req.session.data && req.session.data.notes
  const data = structuredClone(defaults)
  data.scenario = scenario
  data.customer.contactPreference = SCENARIOS[scenario].contactPreference
  data.events = seedEvents(scenario)
  seedOpened(data)
  data.notes = notes || defaults.notes
  data.seeded = true
  req.session.data = data
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

function findMessage (data, id) {
  return data.messages.find(message => message.id === id)
}

function isAvailable (data, message) {
  return !message.availableFrom || data.today >= message.availableFrom
}

// Timestamps use the prototype's fixed "today" with the real time of
// day, so the event log reads as happening now.
function now (data) {
  const time = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour12: false })
  return data.today + 'T' + time
}

function recordEvent (data, type, route, messageId) {
  data.events.push({ timestamp: now(data), messageId: messageId || null, type, route })
}

// Turns "hx7k 9mpq" or "HX7K-9MPQ" into "HX7K9MPQ".
function normaliseCode (value) {
  return String(value || '').toUpperCase().replace(/[\s-]/g, '')
}

// Day, month and year fields into an ISO date, or null if it is not a
// real date.
function toIsoDate (day, month, year) {
  const d = Number(day)
  const m = Number(month)
  const y = Number(year)
  if (!/^\d{1,2}$/.test(String(day).trim()) || !/^\d{1,2}$/.test(String(month).trim()) || !/^\d{4}$/.test(String(year).trim())) return null
  const date = new Date(Date.UTC(y, m - 1, d))
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null
  return date.toISOString().slice(0, 10)
}

function oneYearBefore (iso) {
  const date = new Date(iso + 'T00:00:00Z')
  date.setUTCFullYear(date.getUTCFullYear() - 1)
  return date.toISOString().slice(0, 10)
}

// ---------------------------------------------------------------------
// Every request
// ---------------------------------------------------------------------

router.use((req, res, next) => {
  if (!req.session.data.seeded) seed(req, req.session.data.scenario)
  const data = req.session.data
  // Point views at the live session object, so changes made in a
  // route show up in the page it renders.
  res.locals.data = data
  res.locals.currentPath = req.path
  res.locals.scenarios = SCENARIOS
  res.locals.showNotes = data.notes === 'on'
  next()
})

// ---------------------------------------------------------------------
// Index, scenarios and reset
// ---------------------------------------------------------------------

router.get('/', (req, res) => {
  const data = req.session.data
  res.render('index', {
    scenario: SCENARIOS[data.scenario],
    noticeDelivered: isAvailable(data, findMessage(data, 'msg-005'))
  })
})

router.post('/scenario', (req, res) => {
  seed(req, req.body._scenario)
  res.redirect('/')
})

router.get('/reset', (req, res) => {
  seed(req, req.session.data.scenario)
  res.redirect('/')
})

// The legal layer is a state, not a journey: switch between the
// serving notice posted but not delivered, and delivered.
router.get('/legal-layer/:state', (req, res) => {
  const data = req.session.data
  const notice = findMessage(data, 'msg-005')
  data.today = req.params.state === 'delivered' ? notice.availableFrom : defaults.today
  res.redirect('/')
})

const EXAMPLE_REPLY = {
  severeHypos: '1',
  mostRecentSevereHypo: '2026-07-27',
  hypoDate: { day: '27', month: '7', year: '2026' },
  warningSigns: 'sometimes',
  glucoseChecks: 'sensor'
}

// Opens any screen directly from the index without walking the
// journey. Grants access but records no events, because nothing
// happened on the case.
router.get('/jump', (req, res) => {
  const data = req.session.data
  if (req.query._as === 'oneLogin') data.access.oneLogin = true
  if (req.query._as === 'code') data.access.codeMessageId = 'msg-004'
  if (req.query._as === 'nobody') data.access = { oneLogin: false, codeMessageId: null }
  // _fill=yes fills the reply in progress with example answers, so
  // check your answers can be opened directly.
  if (req.query._fill === 'yes') data.reply = { ...EXAMPLE_REPLY }
  const to = String(req.query._to || '/')
  res.redirect(to.startsWith('/') && !to.startsWith('//') ? to : '/')
})

// ---------------------------------------------------------------------
// Slice 1: secure view
// ---------------------------------------------------------------------

router.get('/notification', (req, res) => {
  res.render('notification')
})

router.get('/start', (req, res) => {
  res.render('start')
})

// Starting sign-in is an event. The index links straight to /sign-in
// so that opening the screen in a workshop does not write one.
router.get('/sign-in/begin', (req, res) => {
  // Sign-in belongs to the session, not to one letter, so messageId is
  // null. Which notification brought them here is not tracked yet.
  recordEvent(req.session.data, 'signInStarted', 'oneLogin', null)
  res.redirect('/sign-in')
})

router.get('/sign-in', (req, res) => {
  res.render('sign-in')
})

router.post('/sign-in', (req, res) => {
  const data = req.session.data
  if (!SCENARIOS[data.scenario].signInSucceeds) {
    // No signInCompleted. A failed sign-in shows in the log as a start
    // with no completion. There is no signInFailed event type yet.
    return res.redirect('/sign-in/problem')
  }
  data.access.oneLogin = true
  recordEvent(data, 'signInCompleted', 'oneLogin', null)
  const returnTo = data.returnTo || '/messages'
  delete data.returnTo
  res.redirect(returnTo)
})

router.get('/sign-in/problem', (req, res) => {
  res.render('sign-in-problem')
})

function requireOneLogin (req, res, next) {
  if (req.session.data.access.oneLogin) return next()
  req.session.data.returnTo = req.originalUrl
  res.redirect('/start')
}

router.get('/messages', requireOneLogin, (req, res) => {
  const data = req.session.data
  const notice = findMessage(data, 'msg-005')
  res.render('messages', {
    messages: data.messages.map(message => ({ ...message, available: isAvailable(data, message) })),
    noticeAvailable: isAvailable(data, notice),
    noticeDeliveredBy: notice.availableFrom
  })
})

router.get('/messages/:id', requireOneLogin, (req, res) => {
  const data = req.session.data
  const message = findMessage(data, req.params.id)
  if (!message || !isAvailable(data, message)) return res.redirect('/messages')
  if (!message.openedAt) message.openedAt = now(data)
  recordEvent(data, 'opened', 'oneLogin', message.id)
  res.render('message', { message })
})

router.get('/messages/:id/pdf', requireOneLogin, (req, res) => {
  const message = findMessage(req.session.data, req.params.id)
  if (!message || !isAvailable(req.session.data, message)) return res.redirect('/messages')
  res.render('pdf', { message })
})

// ---------------------------------------------------------------------
// Slice 2: secure action, by paper code
// ---------------------------------------------------------------------

router.get('/code', (req, res) => {
  // ?_example=errors shows the error state from the index.
  if (req.query._example === 'errors') {
    return res.render('code', {
      errors: {
        code: 'The code must be 8 letters and numbers, like HX7K 9MPQ',
        dateOfBirth: 'Date of birth must include a year'
      },
      values: { code: 'HX7K 9MP', day: '14', month: '6', year: '' }
    })
  }
  res.render('code', { errors: {}, values: {} })
})

router.post('/code', (req, res) => {
  const data = req.session.data
  const values = {
    code: req.body._code || '',
    day: req.body._dobDay || '',
    month: req.body._dobMonth || '',
    year: req.body._dobYear || ''
  }
  const errors = {}

  const code = normaliseCode(values.code)
  if (!code) errors.code = 'Enter the code from your letter'
  else if (!/^[A-Z0-9]{8}$/.test(code)) errors.code = 'The code must be 8 letters and numbers, like HX7K 9MPQ'

  const parts = [values.day, values.month, values.year].map(v => v.trim())
  const dateOfBirth = toIsoDate(...parts)
  if (parts.every(v => !v)) errors.dateOfBirth = 'Enter your date of birth'
  else if (!parts[0]) errors.dateOfBirth = 'Date of birth must include a day'
  else if (!parts[1]) errors.dateOfBirth = 'Date of birth must include a month'
  else if (!parts[2]) errors.dateOfBirth = 'Date of birth must include a year'
  else if (!dateOfBirth) errors.dateOfBirth = 'Date of birth must be a real date'
  else if (dateOfBirth >= data.today) errors.dateOfBirth = 'Date of birth must be in the past'

  if (!Object.keys(errors).length) {
    const paperCode = data.paperCodes.find(entry => entry.code === code)
    // One message for both, so the page does not tell someone guessing
    // which half they got right.
    if (!paperCode || dateOfBirth !== data.customer.dateOfBirth) {
      errors.code = 'The code or date of birth does not match our records. Check the letter and try again'
    } else if (paperCode.usedAt) {
      return res.redirect('/code/already-used')
    } else {
      data.access.codeMessageId = paperCode.messageId
      recordEvent(data, 'codeUsed', 'code', paperCode.messageId)
      return res.redirect('/code/letter')
    }
  }

  res.render('code', { errors, values })
})

router.get('/code/letter', (req, res) => {
  const data = req.session.data
  const message = findMessage(data, data.access.codeMessageId)
  if (!message) return res.redirect('/code')
  res.render('code-letter', { message })
})

router.get('/code/already-used', (req, res) => {
  const message = findMessage(req.session.data, 'msg-004')
  res.render('code-already-used', { message })
})

// ---------------------------------------------------------------------
// Slice 2: secure action, the reply journey
//
// One question per page. Both routes in: signed in with One Login, or
// unlocked by the paper code for this one letter.
// ---------------------------------------------------------------------

function requireReplyAccess (req, res, next) {
  const data = req.session.data
  const message = findMessage(data, req.params.id)
  if (!message || !message.requiresAction) return res.redirect(data.access.oneLogin ? '/messages' : '/')
  if (message.reply) return res.redirect('/reply/' + message.id + '/confirmation')
  if (data.access.oneLogin || data.access.codeMessageId === message.id) {
    res.locals.message = message
    res.locals.route = data.access.oneLogin ? 'oneLogin' : 'code'
    return next()
  }
  data.returnTo = req.originalUrl
  res.redirect('/start')
}

// The order of the questions. mostRecentSevereHypo is skipped when the
// customer has had no severe hypos, because there is nothing to date.
const QUESTIONS = ['severe-hypos', 'most-recent-severe-hypo', 'warning-signs', 'glucose-checks']

function nextPage (req, current) {
  const data = req.session.data
  const base = '/reply/' + req.params.id + '/'
  if (req.query.change === 'yes') {
    // Changing the count to something above 0 means the date is now
    // needed, so go there before returning to check your answers.
    if (current === 'severe-hypos' && data.reply.severeHypos !== '0' && !data.reply.mostRecentSevereHypo) {
      return base + 'most-recent-severe-hypo?change=yes'
    }
    return base + 'check'
  }
  let next = QUESTIONS[QUESTIONS.indexOf(current) + 1] || 'check'
  if (next === 'most-recent-severe-hypo' && data.reply.severeHypos === '0') next = 'warning-signs'
  return base + next
}

function backLink (req, current) {
  const data = req.session.data
  const base = '/reply/' + req.params.id + '/'
  if (req.query.change === 'yes') return base + 'check'
  if (current === 'severe-hypos') {
    return data.access.oneLogin ? '/messages/' + req.params.id : '/code/letter'
  }
  let previous = QUESTIONS[QUESTIONS.indexOf(current) - 1]
  if (previous === 'most-recent-severe-hypo' && data.reply.severeHypos === '0') previous = 'severe-hypos'
  return base + previous
}

function renderQuestion (req, res, page, errors) {
  res.render('reply/' + page, {
    errors: errors || {},
    backLink: backLink(req, page),
    change: req.query.change === 'yes'
  })
}

// Question 1: how many severe hypos.
router.get('/reply/:id/severe-hypos', requireReplyAccess, (req, res) => {
  renderQuestion(req, res, 'severe-hypos')
})

router.post('/reply/:id/severe-hypos', requireReplyAccess, (req, res) => {
  const data = req.session.data
  const value = String(data.reply.severeHypos || '').trim()
  let error
  if (!value) error = 'Enter how many severe hypos you have had while awake in the last 12 months'
  else if (!/^\d+$/.test(value)) error = 'Number of severe hypos must be a whole number, like 0 or 2'
  else if (Number(value) > 99) error = 'Number of severe hypos must be 99 or fewer'
  if (error) return renderQuestion(req, res, 'severe-hypos', { severeHypos: error })

  data.reply.severeHypos = String(Number(value))
  if (data.reply.severeHypos === '0') delete data.reply.mostRecentSevereHypo
  res.redirect(nextPage(req, 'severe-hypos'))
})

// Question 2: when was the most recent one. Only asked if there was one.
router.get('/reply/:id/most-recent-severe-hypo', requireReplyAccess, (req, res) => {
  renderQuestion(req, res, 'most-recent-severe-hypo')
})

router.post('/reply/:id/most-recent-severe-hypo', requireReplyAccess, (req, res) => {
  const data = req.session.data
  const parts = ['day', 'month', 'year'].map(part => String((data.reply.hypoDate || {})[part] || '').trim())
  const iso = toIsoDate(...parts)
  let error
  if (parts.every(v => !v)) error = 'Enter the date of your most recent severe hypo'
  else if (!parts[0]) error = 'Date of your most recent severe hypo must include a day'
  else if (!parts[1]) error = 'Date of your most recent severe hypo must include a month'
  else if (!parts[2]) error = 'Date of your most recent severe hypo must include a year'
  else if (!iso) error = 'Date of your most recent severe hypo must be a real date'
  else if (iso > data.today) error = 'Date of your most recent severe hypo must be today or in the past'
  else if (iso < oneYearBefore(data.today)) error = 'Date of your most recent severe hypo must be in the last 12 months. If it was longer ago, go back and change how many you have had to 0'
  if (error) return renderQuestion(req, res, 'most-recent-severe-hypo', { hypoDate: error })

  data.reply.mostRecentSevereHypo = iso
  res.redirect(nextPage(req, 'most-recent-severe-hypo'))
})

// Question 3: warning signs.
router.get('/reply/:id/warning-signs', requireReplyAccess, (req, res) => {
  renderQuestion(req, res, 'warning-signs')
})

router.post('/reply/:id/warning-signs', requireReplyAccess, (req, res) => {
  if (!req.session.data.reply.warningSigns) {
    return renderQuestion(req, res, 'warning-signs', { warningSigns: 'Select whether you get warning signs before a hypo' })
  }
  res.redirect(nextPage(req, 'warning-signs'))
})

// Question 4: how they check blood glucose before driving.
router.get('/reply/:id/glucose-checks', requireReplyAccess, (req, res) => {
  renderQuestion(req, res, 'glucose-checks')
})

router.post('/reply/:id/glucose-checks', requireReplyAccess, (req, res) => {
  if (!req.session.data.reply.glucoseChecks) {
    return renderQuestion(req, res, 'glucose-checks', { glucoseChecks: 'Select how you check your blood glucose before you drive' })
  }
  res.redirect(nextPage(req, 'glucose-checks'))
})

// Check your answers. Anything unanswered sends the customer back to
// the first gap rather than letting a half reply through.
router.get('/reply/:id/check', requireReplyAccess, (req, res) => {
  const gap = firstGap(req.session.data.reply)
  if (gap) return res.redirect('/reply/' + req.params.id + '/' + gap)
  res.render('reply/check', { backLink: '/reply/' + req.params.id + '/glucose-checks' })
})

function firstGap (reply) {
  if (!reply.severeHypos) return 'severe-hypos'
  if (reply.severeHypos !== '0' && !reply.mostRecentSevereHypo) return 'most-recent-severe-hypo'
  if (!reply.warningSigns) return 'warning-signs'
  if (!reply.glucoseChecks) return 'glucose-checks'
  return null
}

router.post('/reply/:id/check', requireReplyAccess, (req, res) => {
  const data = req.session.data
  const message = res.locals.message
  const route = res.locals.route
  if (firstGap(data.reply)) return res.redirect('/reply/' + message.id + '/check')

  const submittedAt = now(data)
  message.reply = {
    submittedAt,
    route,
    answers: {
      severeHypos: data.reply.severeHypos,
      mostRecentSevereHypo: data.reply.mostRecentSevereHypo || null,
      warningSigns: data.reply.warningSigns,
      glucoseChecks: data.reply.glucoseChecks
    }
  }
  message.requiresAction = false
  message.tag = { text: 'Replied', colour: 'green' }
  recordEvent(data, 'replySubmitted', route, message.id)

  if (route === 'code') {
    data.paperCodes.find(entry => entry.messageId === message.id).usedAt = submittedAt
  }

  // The acknowledgement lands on the same record whichever route the
  // reply came by, so a code customer who signs in later sees it.
  data.messages.unshift(acknowledgement(data, message))

  data.drivingStatus.whatHappensNext = 'We are looking at your answers alongside your GP’s report. We will write to you and send you a secure message when we have decided.'
  data.drivingStatus.roughlyWhen = 'Usually 2 to 4 weeks from ' + formatDate(data.today) + ', because one of our doctors may need to read your answers.'

  data.reply = {}
  res.redirect('/reply/' + message.id + '/confirmation')
})

router.get('/reply/:id/confirmation', (req, res) => {
  const data = req.session.data
  const message = findMessage(data, req.params.id)
  // _preview=oneLogin or _preview=code shows the page from the index
  // without sending anything, so no reply or event is written.
  const preview = req.query._preview
  if (message && !message.reply && (preview === 'oneLogin' || preview === 'code')) {
    return res.render('reply/confirmation', { message: { ...message, reply: { submittedAt: now(data), route: preview } }, route: preview })
  }
  if (!message || !message.reply) return res.redirect('/')
  // Seen only by whoever sent it: signed in, or holding the code.
  if (!data.access.oneLogin && data.access.codeMessageId !== message.id) return res.redirect('/start')
  res.render('reply/confirmation', { message, route: message.reply.route })
})

function acknowledgement (data, message) {
  const received = formatDate(data.today)
  return {
    id: 'msg-' + String(data.messages.length + 1).padStart(3, '0'),
    letterType: 'information',
    title: 'We’ve received your answers',
    tag: { text: 'We received it', colour: 'green' },
    sentDate: data.today,
    paperPostedDate: data.today,
    availableFrom: null,
    openedAt: null,
    replyBy: null,
    requiresAction: false,
    reply: null,
    // added: the message this one acknowledges.
    acknowledges: message.id,
    body: {
      forYourDriving: 'You can keep driving a car while we look at your answers, as long as your own doctor has not told you to stop.',
      whatToDo: 'You do not need to do anything. We will write to you when we have decided, usually within 2 to 4 weeks.',
      letter: [
        'Dear Dana Whitlock,',
        'We received your answers about your diabetes on ' + received + '. Thank you.',
        'We will look at them alongside your GP’s report. One of our doctors may need to read them, so this usually takes 2 to 4 weeks.',
        'Drivers Medical, DVLA, Swansea, SA99 1ZZ'
      ]
    }
  }
}

function formatDate (iso) {
  return new Date(iso.slice(0, 10) + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

// ---------------------------------------------------------------------
// Staff
// ---------------------------------------------------------------------

router.get('/staff/case', (req, res) => {
  const data = req.session.data
  const titles = Object.fromEntries(data.messages.map(message => [message.id, message.title]))
  res.render('staff-case', {
    messages: data.messages.map(message => ({ ...message, available: isAvailable(data, message) })),
    events: data.events
      .slice()
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .map(event => ({ ...event, letterTitle: titles[event.messageId] || null })),
    hasSignedIn: data.events.some(event => event.type === 'signInCompleted'),
    agentWording: agentWording(data)
  })
})

// One line an agent can say, built from the record, about the letter
// that is most likely to be why the customer is calling.
function agentWording (data) {
  const questionnaire = findMessage(data, 'msg-004')
  const sent = formatDate(questionnaire.sentDate)
  if (questionnaire.reply) {
    const how = { oneLogin: 'through your secure messages', code: 'using the code on your letter', post: 'by post' }[questionnaire.reply.route]
    return 'Your answers about your diabetes reached us on ' + formatDate(questionnaire.reply.submittedAt) + ', ' + how + '. One of our doctors may need to read them, so it is usually 2 to 4 weeks before we write to you.'
  }
  if (questionnaire.openedAt) {
    return 'I can see you opened the letter we sent on ' + sent + ' in your secure messages. We need your answers by ' + formatDate(questionnaire.replyBy) + '. You can reply there, or with the code on the paper letter.'
  }
  return 'We posted you a letter on ' + sent + ' with some questions about your diabetes. We need your answers by ' + formatDate(questionnaire.replyBy) + '. You can reply online with the code printed on it.'
}

module.exports = router
