# Drivers Medical

Prototypes and canvases from the DVLA Drivers Medical work. Nothing here is a real service: every case is invented, no screen makes or reports a real licensing decision, and all personal details are dummy data.

`CLAUDE.md` in this folder covers how this project is organised. `DESIGN.md` covers what a Drivers Medical screen should look like and say, and why. Read it before changing anything a customer would see.

## `service-vision/`

- [`future-state-service-blueprint.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/service-vision/future-state-service-blueprint.html): the Drivers Medical target state as a whole-service blueprint, stage by stage from finding out to renewal. A working draft, and a single wide canvas rather than a clickable prototype, so it has no screen index or design notes.
- [`whole-service-map.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/service-vision/whole-service-map.html): the next iteration of that blueprint, as two maps in one page, switched with a CX / NewCo toggle in the top corner. `#cx` and `#newco` open either one directly. Step illustrations are AI-generated (ChatGPT) and live in `illustrations/`, one WebP per step; boxes still marked "[Illustration]" are waiting for theirs.
  - CX: the service from the customer's side. Each stage has its service outcome with the measures that show it is working. The tasks row is reworked against the service model workstream epics, with each task tagged with its epic and gaps marked "No epic yet". It leaves out the future operating team.
  - NewCo: the future operation, organised around its own work stages from a workshop whiteboard. Its outcome row is operational, with the measures underneath. Data modelling and awareness are greyed as upstream of NewCo, the decision stage is open between automated, AI-assisted and human, and each task is tagged with the operating-model hypothesis it tests.
- [`whole-service-map-v2.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/service-vision/whole-service-map-v2.html): the next version of the whole-service map, being reworked from a second round of workshop whiteboards. Its illustrations live in `illustrations/v2/`, so the first version stays viewable unchanged.
- [`cx-vision.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/service-vision/cx-vision.html): the customer experience vision as six shifts people will feel. Each shift has a v2 illustration, what it means for the customer, today's problem with one figure, the whole-service map measures that would show it working, and the capability map items that make it possible. Gaps the capability map doesn't cover yet are marked. Below are what changes for teams, what stays the same, and a 'where we're starting' strip waiting for placements.
- [`capability-map.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/service-vision/capability-map.html): the DM transformation opportunities map. Today's journey across nine stages, with five lanes of evidence (customer, staying informed, casework, third parties, technology), and under them 12 technology enablers (4 added from the 3 November whiteboard session, 1 from the ITS prioritised list of Dynamics changes) and 7 service changes drawn as bars across the stages they change, each labelled with its three horizons classification. Select an item for what it unlocks, evidence of size, blockers and dependencies, or a stage for what acts on it. Owners are left out.

## `prototypes/`

- [`DM-Vision-Prototype-Guided.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/prototypes/DM-Vision-Prototype-Guided.html): future-state guided journeys.
- [`Futurestatevisionprototypecustomer.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/prototypes/Futurestatevisionprototypecustomer.html) and [`3-Futurestatevisionprototypecustomer.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/prototypes/3-Futurestatevisionprototypecustomer.html): earlier walkthroughs of a future-state customer journey. The second carries no health data, to show what that version costs.
- [`Medical evidence service_ customer and healthcare professional journeys 2.5 (prototype).html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/prototypes/Medical%20evidence%20service_%20customer%20and%20healthcare%20professional%20journeys%202.5%20%28prototype%29.html): the medical evidence service, from both the customer and the healthcare professional side.
- [`Medical evidence service for healthcare professionals (medportal prototype).html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/prototypes/Medical%20evidence%20service%20for%20healthcare%20professionals%20%28medportal%20prototype%29.html): the healthcare professional side of the medical evidence service on its own.
- [`Medical portal_ customer and healthcare professional (prototype).html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/prototypes/Medical%20portal_%20customer%20and%20healthcare%20professional%20%28prototype%29.html): an earlier version of the medical portal, for customers and healthcare professionals.

## `staying-informed/`

The status tracking and secure communications propositions, now combined. See the folder's own `README.md` for how the case updates timeline is derived.

- [`case-updates.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/staying-informed/case-updates.html): the combined prototype. Sign-in leads to the driver and vehicles account, where a "Your health and driving" card answers what is happening and whether you can drive. It is built around the person, not the case. Behind it, letters and updates worked out from the letters Dynamics already logs, with a "How this was built" toggle that shows the row and rule behind each entry. Switch situation from the yellow box on any screen.
- [`case-status-tracker.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/staying-informed/case-status-tracker.html): where is my case, what happens next, and can I drive. Over half of all inbound calls to the contact centre ask the first of those.
- [`secure-messages/`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/staying-informed/secure-messages/): the one exception to "nothing to install": a GOV.UK Prototype Kit app, built that way because it is a step towards production. It shows an authenticated, two-way channel where customers read the letters DVLA posts them and reply to a driver questionnaire, by GOV.UK One Login or by a code printed on the paper letter. A GitHub Action builds a browser-only version of it for GitHub Pages from the same routes and templates. See its own `README.md` for running the kit locally with `npm install` and `npm run dev`.

## `ivr/`

- [`newco-routing-map.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/ivr/newco-routing-map.html): the NewCo routing map for phone and web chat, with the requirements, decisions and open questions behind it.
- [`newco-call-simulator.html`](https://gds-dtx.github.io/cf-flat-experiments/drivers-medical/ivr/newco-call-simulator.html): the phone route from the routing map played as a call. The phone line reads each prompt aloud and you answer on a keypad, so a room can hear how long it takes to reach a person. The route and NewCo scripts are copied from the map; today's steps use stand-in wording marked "TBC script (as-is)" until the real scripts arrive.

Every prototype has an "All screens" index, so any single screen can be opened directly in a workshop, and a design-notes toggle that shows the argument each screen is making.

## `archive/`

Earlier versions, kept for reference: the first Drivers Medical prototype, the eye test prototype, an earlier future-state customer walkthrough, and an earlier NewCo routing map (`newco-IVR-requirements.html`).
