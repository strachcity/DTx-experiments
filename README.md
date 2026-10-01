# DTx-experiments

HTML prototypes for service design work, built to GOV.UK patterns.

These are workshop artefacts. They exist to make a service design argument visible quickly, so a room can disagree with something concrete instead of with a description of it. They are here to develop concepts and draw out requirements, and they are not an attempt at final UI design. Expect them to be thrown away and rebuilt.

Each project has its own folder. Everything currently in here comes from the DVLA Drivers Medical work, in `drivers-medical/`, and more projects will follow. `components.html` stays at the root because it is shared.

Nothing here is a real service. Every prototype carries a fictional-prototype warning and a prototype phase banner, every case is invented, no screen makes or reports a real licensing decision, and all personal details are dummy data.

## What is in here

Each prototype is one self-contained HTML file. Open it from GitHub Pages or straight from disk. Nothing to install, nothing to run.

- `components.html`: the component reference. Every `govuk-*` component the other prototypes draw on, with the markup beside it. Start here if you are building a new one.

### `drivers-medical/`

`DESIGN.md` sits here because it is scoped to this project.

`service-vision/`

- `future-state-service-blueprint.html`: the Drivers Medical target state as a whole-service blueprint, stage by stage from finding out to renewal. A working draft, and a single wide canvas rather than a clickable prototype, so it has no screen index or design notes.
- `whole-service-map.html`: the next iteration of that blueprint, as two maps in one page, switched with a CX / NewCo toggle in the top corner. `#cx` and `#newco` open either one directly. Step illustrations are AI-generated (ChatGPT) and live in `illustrations/`, one WebP per step; boxes still marked "[Illustration]" are waiting for theirs.
  - CX: the service from the customer's side. The tasks row is reworked against the service model workstream epics, with each task tagged with its epic and gaps marked "No epic yet". It leaves out the future operating team.
  - NewCo: the future operation, organised around its own work stages from a workshop whiteboard. Its outcome row is operational, with the measures underneath. Data modelling and awareness are greyed as upstream of NewCo, the decision stage is open between automated, AI-assisted and human, and each task is tagged with the operating-model hypothesis it tests.

`prototypes/`

- `case-status-tracker.html`: where is my case, what happens next, and can I drive. Over half of all inbound calls to the contact centre ask the first of those.
- `Futurestatevisionprototypecustomer.html` and `3-Futurestatevisionprototypecustomer.html`: earlier walkthroughs of a future-state customer journey. The second carries no health data, to show what that version costs.

`ivr/`

- `newco-routing-map.html`: the NewCo routing map for phone and web chat, with the requirements, decisions, open questions and risks behind it.
- `newco-call-simulator.html`: the phone route from the routing map played as a call. The phone line reads each prompt aloud and you answer on a keypad, so a room can hear how long it takes to reach a person. The route and NewCo scripts are copied from the map; today's steps use stand-in wording marked "TBC script (as-is)" until the real scripts arrive.

Every prototype has an "All screens" index, so any single screen can be opened directly in a workshop, and a design-notes toggle that shows the argument each screen is making.

## Working here

`CLAUDE.md` covers how to build: conventions, journey structure, and what every prototype needs. `drivers-medical/DESIGN.md` covers what a Drivers Medical screen should look like and say, and why. Read it before changing anything a customer would see.
