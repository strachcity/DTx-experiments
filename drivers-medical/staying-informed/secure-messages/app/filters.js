//
// Secure messages: filters.
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// "2026-10-16" or "2026-10-16T10:42:00" to "16 October 2026".
addFilter('longDate', iso => {
  if (!iso) return ''
  return new Date(String(iso).slice(0, 10) + 'T12:00:00Z')
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
})

// "2026-10-16T10:42:00" to "16 October 2026 at 10:42am".
addFilter('longDateTime', iso => {
  if (!iso) return ''
  const [date, time] = String(iso).split('T')
  const [hours, minutes] = (time || '00:00').split(':').map(Number)
  const suffix = hours < 12 ? 'am' : 'pm'
  const clock = ((hours + 11) % 12 + 1) + ':' + String(minutes).padStart(2, '0') + suffix
  const day = new Date(date + 'T12:00:00Z')
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
  return day + ' at ' + clock
})

// A tag colour name to the GOV.UK Frontend modifier class.
addFilter('tagClass', colour => colour ? 'govuk-tag--' + colour : '')

// Staff-facing labels for the event log. These are what an agent
// reads, so they are plain, but they are not customer content.
const EVENT_TYPES = {
  notified: 'Notification sent',
  opened: 'Secure copy opened',
  signInStarted: 'Started signing in',
  signInCompleted: 'Signed in',
  codeUsed: 'Paper code used',
  replySubmitted: 'Reply received'
}
addFilter('eventType', type => EVENT_TYPES[type] || type)

const ROUTES = {
  oneLogin: 'GOV.UK One Login',
  code: 'Code from paper letter',
  post: 'Post'
}
addFilter('routeName', route => ROUTES[route] || '')

const CHANNELS = { email: 'Email', sms: 'Text message' }
addFilter('channelName', channel => CHANNELS[channel] || '')

const LETTER_TYPES = {
  information: 'Information letter',
  issue: 'Licence issue letter',
  driverQuestionnaire: 'Driver questionnaire',
  servingNotice: 'Serving notice'
}
addFilter('letterTypeName', type => LETTER_TYPES[type] || type)

// Answers to the words the customer chose.
const ANSWERS = {
  warningSigns: {
    always: 'Yes, always',
    sometimes: 'Sometimes',
    never: 'No, never'
  },
  glucoseChecks: {
    meter: 'With a finger-prick blood glucose meter',
    sensor: 'With a sensor (a continuous or flash glucose monitor)',
    none: 'I do not check before I drive'
  }
}
addFilter('answerText', (value, question) => (ANSWERS[question] || {})[value] || value)
