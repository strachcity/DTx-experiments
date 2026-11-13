//
// Secure messages: session data defaults.
//
// This is the data model developers will reuse, so it is kept explicit
// and flat. Everything here is invented. The customer is nobody, the
// contact details use reserved ranges (example.com, 07700 900xxx), and
// no licence number appears anywhere.
//
// The kit merges this object into each new session with a shallow
// Object.assign, which would share the arrays below between sessions.
// routes.js deep-clones it with structuredClone instead (see seed()),
// so mutate session data freely but never this object.
//
// Status labels and tag text are prototype wording. They need mapping
// to whatever the case management system actually holds before they
// mean anything.
//

module.exports = {

  // The prototype's "today". Dates are fixed so the screens read the
  // same in every workshop. The legal-layer switch on the index moves
  // this forward to show a serving notice after it has been delivered.
  today: '2026-10-16',

  // digital | paper | failedSignIn. See SCENARIOS in routes.js.
  scenario: 'digital',

  customer: {
    name: 'Dana Whitlock',
    dateOfBirth: '1979-06-14',
    // email | sms | both | none. "none" is not in the handover's list.
    // It is added for the paper customer, who has given DVLA no email
    // or mobile number. Flagged in the README.
    contactPreference: 'both',
    email: 'dana.whitlock@example.com',
    mobile: '07700 900 412'
  },

  // What the customer can do now, and what happens next. Shown as the
  // card at the top of the messages list.
  //
  // servedOnly is the part of the status that comes from a serving
  // notice. It is shown only once that letter is available (today on
  // or after its availableFrom). Until then the card says a letter is
  // on its way and nothing about what it says, so the status card can
  // never serve the notice ahead of the paper.
  drivingStatus: {
    answer: 'Yes, you can keep driving a car',
    detail: 'You can carry on driving a car while we look at your diabetes, as long as your own doctor has not told you to stop.',
    whatHappensNext: 'We need you to answer some questions about your hypos by 6 November 2026. We cannot finish looking at your case until we have your answers.',
    roughlyWhen: 'Usually 2 to 4 weeks after we get your answers, because one of our doctors may need to read them alongside your GP’s report.',
    servedOnly: {
      messageId: 'msg-005',
      answer: 'You must not drive a lorry or a bus',
      detail: 'This is because your GP told us you had a severe hypo while you were awake in the last 12 months. The letter explains how to reapply and how to appeal.'
    }
  },

  // Newest first. letterType is one of:
  //   information          - tells the customer something, no action
  //   issue                - a licence issue letter, carrying a decision
  //   driverQuestionnaire  - asks the customer to reply
  //   servingNotice        - serves a legal notice. Paper first; the
  //                          secure copy appears from availableFrom.
  //
  // body carries the three parts every message page shows, in order:
  // what it means for your driving, what you need to do, and the full
  // letter. Fields the handover did not list are marked "added".
  messages: [
    {
      id: 'msg-005',
      letterType: 'servingNotice',
      title: 'You can no longer drive lorries or buses',
      // added: what the list shows before the copy is available, so the
      // title cannot give the decision away ahead of the paper.
      titleBeforeAvailable: 'A letter about your driving licence',
      tag: { text: 'Decision', colour: 'purple' },
      sentDate: '2026-10-14',
      paperPostedDate: '2026-10-14',
      // Deemed delivered two working days after second-class posting.
      // What actually counts as served is an open question for Legal.
      availableFrom: '2026-10-20',
      openedAt: null,
      replyBy: null,
      requiresAction: false,
      reply: null,
      body: {
        forYourDriving: 'You must not drive a lorry or a bus. You can still drive a car.',
        whatToDo: 'Send us your licence so we can send you a new one that only covers cars. You can reapply to drive lorries and buses once you have gone 12 months without a severe hypo while awake.',
        letter: [
          'Dear Dana Whitlock,',
          'We have looked at the report your GP sent us on 2 October 2026. It says you had a severe hypo while you were awake in July 2026. A severe hypo is one where you needed help from another person.',
          'The law says you cannot hold a licence to drive lorries or buses if you have had a severe hypo while awake in the last 12 months. We have therefore revoked your entitlement to drive lorries and buses (categories C1, C, D1 and D). This takes effect when you receive this letter.',
          'This decision does not cover cars. We are still looking at whether you can keep driving a car, and we have written to you separately with some questions.',
          'Send your licence to us at the address below. We will send you a new licence that covers cars and any other categories you still hold.',
          'If you disagree with this decision, you can appeal to a magistrates’ court within 6 months of the date of this letter, or to a sheriff court within 21 days if you live in Scotland.',
          'Drivers Medical, DVLA, Swansea, SA99 1ZZ'
        ]
      }
    },
    {
      id: 'msg-004',
      letterType: 'driverQuestionnaire',
      title: 'We need more information about your diabetes',
      tag: { text: 'Action needed', colour: 'orange' },
      sentDate: '2026-10-09',
      paperPostedDate: '2026-10-09',
      availableFrom: null,
      openedAt: null,
      replyBy: '2026-11-06',
      requiresAction: true,
      // added: the submitted reply, once there is one.
      // { submittedAt, route, answers }
      reply: null,
      body: {
        forYourDriving: 'You can keep driving a car while we look at your case, as long as your own doctor has not told you to stop. If we do not get your answers by 6 November 2026, we may have to take your licence away.',
        whatToDo: 'Answer 4 short questions about your hypos and how you check your blood glucose before you drive. It takes about 5 minutes. You do not need to send the paper form as well.',
        letter: [
          'Dear Dana Whitlock,',
          'Thank you for telling us about your diabetes. Your GP has sent us a report, and we need to ask you some questions about your hypos before we can finish looking at your case.',
          'Please answer the questions by 6 November 2026. You can reply online, or fill in the form that came with this letter and post it back to us.',
          'If we do not hear from you by 6 November 2026, we may have to revoke your licence, because we will not have enough information to know whether you meet the standard for driving.',
          'You can carry on driving a car while we look at your case, as long as your own doctor has not told you to stop.',
          'Drivers Medical, DVLA, Swansea, SA99 1ZZ'
        ]
      }
    },
    {
      id: 'msg-003',
      letterType: 'information',
      title: 'We’ve written to your doctor',
      tag: { text: 'Information', colour: 'blue' },
      sentDate: '2026-09-08',
      paperPostedDate: '2026-09-08',
      availableFrom: null,
      openedAt: null,
      replyBy: null,
      requiresAction: false,
      reply: null,
      body: {
        forYourDriving: 'Nothing changes. You can keep driving while we wait for your GP to reply, as long as your own doctor has not told you to stop.',
        whatToDo: 'You do not need to do anything. GPs usually reply within 4 to 6 weeks. If your GP asks you to book an appointment, please do, because that is often what is holding the report up.',
        letter: [
          'Dear Dana Whitlock,',
          'We have asked your GP, Dr Okonjo at Harbour Lane Surgery, for a report about your diabetes. We will not charge you for this.',
          'GPs usually reply within 4 to 6 weeks. We will write to you again once we have the report.',
          'Drivers Medical, DVLA, Swansea, SA99 1ZZ'
        ]
      }
    },
    {
      id: 'msg-002',
      letterType: 'information',
      title: 'We’ve received your medical questionnaire',
      tag: { text: 'We received it', colour: 'green' },
      sentDate: '2026-08-27',
      paperPostedDate: '2026-08-27',
      availableFrom: null,
      openedAt: null,
      replyBy: null,
      requiresAction: false,
      reply: null,
      body: {
        forYourDriving: 'You can keep driving while we look at your case, as long as your own doctor has not told you to stop.',
        whatToDo: 'You do not need to do anything. We will tell you if we need more information.',
        letter: [
          'Dear Dana Whitlock,',
          'We received your medical questionnaire about your diabetes on 24 August 2026. We will now look at what you have told us and decide whether we need any more information.',
          'Drivers Medical, DVLA, Swansea, SA99 1ZZ'
        ]
      }
    },
    {
      id: 'msg-001',
      letterType: 'issue',
      title: 'You can keep your licence',
      tag: { text: 'Decision', colour: 'purple' },
      sentDate: '2023-11-02',
      paperPostedDate: '2023-11-02',
      availableFrom: null,
      openedAt: null,
      replyBy: null,
      requiresAction: false,
      reply: null,
      body: {
        forYourDriving: 'You could keep driving cars, lorries and buses. Your licence lasted 3 years, because we needed to check your diabetes again in 2026.',
        whatToDo: 'Nothing now. This is an older letter, kept here so you can find it.',
        letter: [
          'Dear Dana Whitlock,',
          'We have decided you meet the medical standard for driving. We have sent you a new licence, which lasts 3 years.',
          'You must tell us if your diabetes changes in a way that could affect your driving, for example if you have a severe hypo.',
          'Drivers Medical, DVLA, Swansea, SA99 1ZZ'
        ]
      }
    }
  ],

  // Added: the code printed on each paper letter that can be replied
  // to. It unlocks the reply to that one letter and nothing else: no
  // message list, no other letters. Single-use once a reply is sent,
  // which is the IAG question made concrete, not an answer to it.
  paperCodes: [
    { code: 'HX7K9MPQ', messageId: 'msg-004', usedAt: null }
  ],

  // Every interaction is an event on the case.
  // type:  notified | opened | signInStarted | signInCompleted |
  //        codeUsed | replySubmitted
  // route: oneLogin | code | post, or null where none applies
  // channel (added): email | sms, for notified events only, because a
  //        Notify ping does not have a route in the sense above.
  // Seeded per scenario in routes.js, because what has already
  // happened depends on whether the customer has digital contact
  // details.
  events: [],

  // Who the session is signed in as. Not part of the case record.
  // oneLogin: true once simulated sign-in completes.
  // codeMessageId: the one letter the paper code has unlocked.
  access: { oneLogin: false, codeMessageId: null },

  // The reply in progress, before it is sent. Fields are named after
  // the question they answer.
  reply: {},

  // Design notes, off by default. Any page with ?notes=on turns them
  // on; ?notes=off turns them off. The kit stores the query in session.
  notes: 'off'
}
