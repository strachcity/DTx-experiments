# Staying informed (Drivers Medical)

Fictional prototypes. Nothing here is a real DVLA or GOV.UK service. Cases, letters, template codes and personal details are invented. The one exception is the name in `case-updates.html`, which is used with permission.

This folder holds two propositions that have been combined: status tracking (where is my case, can I drive) and secure communications (read the letter, reply to it).

- `case-updates.html`: the combined prototype. Start here.
- `case-status-tracker.html`: the earlier status tracking prototype.
- `secure-messages/`: the earlier secure communications prototype, a GOV.UK Prototype Kit app with its own `README.md`.

## Case updates: the idea

The case timeline is built from the letters DVLA already sends and receives, not from new case states. Dynamics already logs every letter on a case in its Communications tab. A template map turns each logged row into something a customer can read.

The prototype keeps three things and works everything else out from them, in one function, `derive()`:

1. **Communications rows**, one per letter, with the fields Dynamics holds: template code, direction (Incoming or Outgoing), created on, response due by, response status and print status.
2. **The template map**, one rule per template code: the timeline state it sets, a plain-English summary, whether it is shown (Yes, Signal only, Receipt only or No) and whether it serves a legal notice.
3. **The case status**, one of the five real values: Renewal sent, With DVLA, Waiting for details, Closed or Cancelled.

Template codes are invented, because this repo is public. The real codes are mapped privately.

## How the timeline is worked out

1. **No codes.** A customer never sees a template code. Every entry uses the rule's summary.
2. **Outgoing letters appear from the next working day** after they are created, because that is when they leave the building. Weekends are skipped. Bank holidays are not, yet.
3. **Incoming items say "Received on" the date we logged them**, with a line saying forms can take a few days to reach us and be added to the case.
4. **Letters to healthcare professionals are a signal, never content.** They show that we are waiting on someone else. They cannot be opened, and there is no PDF.
5. **Questionnaires are receipt only.** The customer sees that it arrived, not the form.
6. **Replies close requests.** A request is an outgoing letter with a reply-by date. Once its response status includes "Received", it is resolved.
7. **Working out where the case is now**, in this order:
   - the latest decision on the timeline, because a decision ends the case
   - a Closed or Cancelled case status, unless a decision letter has not left the building yet, in which case it is held back
   - the latest unresolved request
   - the latest entry that sets a state ("Information only" entries do not)
   - the case status, as the frame
8. **Decisions are paper first.** From the next working day, only "We've posted you a decision about your licence. It should arrive within 1 to 4 days." The full letter appears 4 working days after posting. Every decision waits, good or bad, so that message says nothing about the outcome. The handover proposed holding back only decisions that serve a notice, but then "decision posted" could only ever mean bad news.
9. **Quiet periods are said out loud.** If there has been no new entry for over 3 weeks, the case page says so, and how long this stage usually takes.

The prototype adds a few fields the handover did not have, all marked "added" in the file:

- `status`: the headline on the status card
- `canDrive`: the answer for decisions. Ordinary letters cannot answer "can I drive?", so an open case uses a default.
- who has the case, and how long each state usually takes
- an incoming `RCV-ONLINE-REPLY` row for a reply sent online. Today an online reply is not a letter and would write nothing to the Communications tab.

## Scenarios

1. Waiting on a healthcare professional, overdue and chased once.
2. Waiting on you, for blood glucose readings. Reply online or with the paper code (`HX7K 9MPQ`, date of birth 14 June 1979).
3. Good news: a licence-kept decision.
4. Revocation, as three scenarios: the day it is decided (nothing shows), the day it is posted (the neutral message only), and after the letter has arrived (the full letter).
5. Quiet period: no letters for 5 weeks.

Switch between them from the yellow box at the top of any screen.

## About the person, not the case

Dynamics opens a case for each notification or renewal. The customer never sees one. They see "Your health and driving" on their driver and vehicles account: the conditions they have told us about, what is happening, whether they can drive, and every letter. Letters open as pages, in the style of an HMRC message, with the posted PDF behind them. Where the customer has more than one thing open at once, the page would show a status for each and one list of letters across them. Which one answers "can I drive?" then is a policy question.

## Open questions

Each one is on the screen it affects when design notes are on.

- Can the customer account read letters from Azure Blob storage?
- Is the Communications data available outside Dynamics?
- How should the "decision posted" message be framed, and when can the full copy appear? (Keya)
- What can each layer show, and what identity checks are needed? (DPP)
- Should "Waiting on someone else" name who, such as "your GP", or stay general?
- The licence card on the account reads the driver record, which changes on the day of the decision. Should it be held to the same release rule as the letter?
