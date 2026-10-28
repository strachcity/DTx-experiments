# Secure messages (Drivers Medical)

A fictional prototype. Not a real DVLA or GOV.UK service. Every person, case, letter and code in it is invented.

This folder is a GOV.UK Prototype Kit app, not a single HTML file like the rest of the repo. It is being handed over as a step towards production, so developers can read its routes and data model as a spec. `CLAUDE.md` at the repo root records the exception.

## The concept

Today, anything with medical content goes to Drivers Medical customers by Royal Mail second class. Secure messages is an authenticated, two-way channel where customers read those letters and act on them, bound to their case record. GOV.UK Notify is the doorbell. Secure messages is the room behind the door.

Four rules hold on every screen. Notify pings, secure messages holds the content: the text or email names no condition, outcome or case type. Sign-in is the gate for reading, downloading and replying, with GOV.UK One Login as the primary route (simulated here). Every interaction is an event on the case, shown in the staff view. And channel choice is the customer's, but the record is single: paper still goes out, and a customer with only the paper letter uses a code printed on it to reach the same reply, which lands on the same record.

In scope: signed-in copies of information and issue letters (slice 1), replying to a driver questionnaire by One Login or by paper code (slice 2), and serving notices as a state (paper first, secure copy only after delivery). Out of scope: decisions served digitally, third parties, payments and free-text chat.

## How to run it

You need Node.js 22 or later.

```
cd drivers-medical/staying-informed/secure-messages
npm install
npm run dev
```

Then open http://localhost:3000. The index is the "All screens" page.

## On GitHub Pages

https://strachcity.github.io/DTx-experiments/drivers-medical/staying-informed/secure-messages/

Pages only serves files, so it cannot run the kit's server. Instead, `npm run build` builds a browser-only version into `dist/`. It is not a copy: it runs the same `app/routes.js`, `app/filters.js`, session data defaults and templates in the browser, through a small stand-in for the kit (`static/`). Change the app, and the Pages version changes with it.

`.github/workflows/pages.yml` runs the build on every push to `main` and publishes the whole repo, with this folder replaced by `dist/`. Screens live in the URL hash (`#/messages`), so any screen can still be linked to directly. State is in memory and resets on reload, like the other prototypes in this repo.

To check the Pages version locally, run `npm run build`, then serve `dist/` with any static file server.

Dependencies are GOV.UK Prototype Kit 14.0.0 and GOV.UK Frontend 6.6.0, plus `@govuk-prototype-kit/common-templates`, which the kit installs as part of its own default setup. The Pages build adds two development dependencies: `esbuild` to bundle it, and `nunjucks` 3.2.4, the same version the kit uses, to render the templates in the browser.

## Where things are

- `app/data/session-data-defaults.js`: the data model, with fictional data.
- `app/routes.js`: every route, and the four rules in code.
- `app/filters.js`: date formats and labels.
- `app/views/`: one template per screen, built from GOV.UK Frontend macros.
- `app/assets/sass/application.scss`: only what Frontend does not provide: the design notes, prototype controls and the phone and email mock-ups.
- `static/`: the Pages build. `build.js` collects the templates, bundles `main.js` and compiles the CSS with the kit's own Sass pipeline. `kit-shim.js` stands in for the kit's router and filters, so `routes.js` runs unchanged.

All state is in the kit's session data, or in memory on Pages. Nothing uses localStorage. There is no research log yet. If one is added, it is the one thing that should outlive a session and could go in localStorage.

## Route map

Prototype controls

| Route | What it does |
| --- | --- |
| `GET /` | All screens, scenario switcher, reset, legal-layer state |
| `POST /scenario` | Switch scenario and reset all data |
| `GET /reset` | Reset data for the current scenario |
| `GET /legal-layer/:state` | `posted` or `delivered`. Moves "today" either side of the serving notice's `availableFrom` |
| `GET /jump?_as=&_to=` | Open a screen directly. `_as` is `oneLogin`, `code` or `nobody`. `_fill=yes` fills example answers. Writes no events |
| any page `?notes=on` / `?notes=off` | Design notes on or off, kept in session |

Slice 1: secure view

| Route | Screen | Gate |
| --- | --- | --- |
| `GET /notification` | The neutral text message and email | none |
| `GET /start` | You have a secure message from DVLA | none |
| `GET /sign-in/begin` | Records `signInStarted`, then goes to sign-in | none |
| `GET /sign-in`, `POST /sign-in` | Simulated One Login. Records `signInCompleted`, or goes to the problem page in scenarios where sign-in fails | none |
| `GET /sign-in/problem` | We could not confirm who you are | none |
| `GET /messages` | Driving status card, then the messages | One Login |
| `GET /messages/:id` | One message. Records `opened` | One Login |
| `GET /messages/:id/pdf` | PDF placeholder | One Login |

Slice 2: secure action

| Route | Screen | Gate |
| --- | --- | --- |
| `GET /code`, `POST /code` | Code and date of birth. Records `codeUsed` | none |
| `GET /code/letter` | You are replying to this letter | code |
| `GET /code/already-used` | You have already replied to this letter | none |
| `/reply/:id/severe-hypos` | Question 1 | One Login, or the code for this letter |
| `/reply/:id/most-recent-severe-hypo` | Question 2, skipped if the answer to question 1 is 0 | as above |
| `/reply/:id/warning-signs` | Question 3 | as above |
| `/reply/:id/glucose-checks` | Question 4 | as above |
| `/reply/:id/check` | Check your answers. `POST` sends the reply, records `replySubmitted`, adds the acknowledgement message and updates the status card | as above |
| `GET /reply/:id/confirmation` | Answers sent. `?_preview=oneLogin` or `?_preview=code` shows it without sending | whoever sent it |

`?change=yes` on any question returns to check your answers. Changing question 1 from 0 to more than 0 goes through question 2 first.

Staff

| Route | Screen |
| --- | --- |
| `GET /staff/case` | Case correspondence: each letter's posted date, secure copy opened or not, how the reply came back, suggested agent wording, and the event log |

## Data model

All in `app/data/session-data-defaults.js`. Fields the handover did not list are marked "added" in the file.

- `today`: the prototype's fixed date, 16 October 2026.
- `customer`: `name`, `dateOfBirth`, `contactPreference` (`email`, `sms`, `both` or `none`), `email`, `mobile`.
- `drivingStatus`: `answer` and `detail` (can I drive), `whatHappensNext`, `roughlyWhen`, and `servedOnly`, the part of the status that comes from a serving notice. That part is shown only once the notice is available.
- `messages[]`: `id`, `letterType` (`information`, `issue`, `driverQuestionnaire`, `servingNotice`), `title`, `tag` (`text`, `colour`), `sentDate`, `paperPostedDate`, `availableFrom` (serving notices only), `openedAt`, `replyBy`, `requiresAction`, `body` (`forYourDriving`, `whatToDo`, `letter[]`). Added: `titleBeforeAvailable`, `reply` (`submittedAt`, `route`, `answers`), `acknowledges`.
- `paperCodes[]` (added): `code`, `messageId`, `usedAt`. A code unlocks the reply to one letter and nothing else.
- `events[]`: `timestamp`, `messageId`, `type` (`notified`, `opened`, `signInStarted`, `signInCompleted`, `codeUsed`, `replySubmitted`), `route` (`oneLogin`, `code`, `post`, or null). Added: `channel` (`email` or `sms`) on `notified` events.
- `access` (session, not case): `oneLogin`, `codeMessageId`.
- `reply` (session): the reply in progress, before it is sent.

The kit merges the defaults into each session with a shallow `Object.assign`, which would share the arrays between sessions. `routes.js` seeds each session from a `structuredClone` instead, so reset is always clean.

## Scenarios

The same customer and the same letters. What differs is how she reaches them.

1. **Digital customer signs in and replies.** Email and text. Has signed in before. Notification, start, One Login, messages, the questionnaire, the reply, the confirmation, and a "We've received your answers" message with an updated status card.
2. **Paper customer uses the code.** No email or mobile, so no notification. Code and date of birth, the reply, a confirmation with no way into the message list. Trying the code again reaches "already replied".
3. **Sign-in fails, customer switches to the code.** Text only. The sign-in fails, the customer uses the code, and the staff view shows a sign-in that started and never completed, then the code and the reply.

For prototype use only: code `HX7K 9MPQ`, date of birth 14 June 1979.

## Open questions

Each one appears on the screen it affects when design notes are on.

- **Legal (Keya):** which letters serve a notice, what counts as served, and does a secure copy alongside paper raise any issue? The prototype treats a notice as served two working days after second-class posting. It also keeps the status card silent about the decision until then. Is that enough, and does listing a letter as "posted" before it arrives raise any issue?
- **IAG:** the assurance floor for the paper code (single-use or reusable, expiry, lockout after wrong attempts, what happens if it is lost), and retention if messages never expire. The prototype makes the code single-use once a reply is sent, with no lockout, and backfills a 2023 letter.
- **Content:** the rule for what is safe for Notify and what must go through secure messages.
- **Which letters first:** waiting on volumes per template. Driver questionnaires are the leading candidate.
- **Where it lives:** the Dynamics customer account, or GOV.UK App Mailbox.

Decisions taken while building that need checking:

- **The serving notice is a lorry and bus revocation, not a full one.** A full revocation would contradict the status card and the open questionnaire in the same inbox. The case is: a GP report showed a severe hypo while awake, which settles lorries and buses; cars need more information, hence the questionnaire.
- **There is no `signInFailed` event.** A failed sign-in shows as `signInStarted` with no `signInCompleted`. Is that enough for an agent?
- **`contactPreference: none`** is added for the paper customer, who has given no email or mobile.
- **Notified events have a channel, not a route,** and sign-in events have no `messageId`.
- **Reply-by dates.** `DESIGN.md` bans countdowns to a specific date. A reply-by date is a real deadline printed on today's letters, so it is shown as a date, never as "days left".
- **Declaration.** The paper form has a signed declaration. Online, it is the sentence above "Accept and send". Policy needs to say if that is enough.
- **No reference number on the confirmation.** The customer already has a case. The confirmation says what happens next, roughly when, and whether they can drive.
- Template codes such as D1V1 appear only in design notes, never in customer text.
