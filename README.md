# DTx-experiments

HTML prototypes for CustomerFirst, the DSIT/GDS partnership transforming the DVLA Drivers Medical service.

These are workshop artefacts. They exist to make a service design argument visible quickly, so a room can disagree with something concrete instead of with a description of it. They are here to develop concepts and draw out requirements, and they are not an attempt at final UI design. Expect them to be thrown away and rebuilt.

Nothing here is a real service. Every prototype carries a fictional-prototype warning and a prototype phase banner, every case is invented, no screen makes or reports a real licensing decision, and all personal details are dummy data.

## What is in here

Each prototype is one self-contained HTML file. Open it from GitHub Pages or straight from disk. Nothing to install, nothing to run.

- `components.html`: the component reference. Every `govuk-*` component the other prototypes draw on, with the markup beside it. Start here if you are building a new one.
- `case-status-tracker.html`: where is my case, what happens next, and can I drive. Over half of all inbound calls to the contact centre ask the first of those.
- `Futurestatevisionprototypecustomer.html` and `3-Futurestatevisionprototypecustomer.html`: earlier walkthroughs of a future-state customer journey. The second carries no health data, to show what that version costs.

Every prototype has an "All screens" index, so any single screen can be opened directly in a workshop, and a design-notes toggle that shows the argument each screen is making.

## Working here

`CLAUDE.md` covers how to build: conventions, journey structure, and what every prototype needs. `DESIGN.md` covers what a screen should look like and say, and why. Read `DESIGN.md` before changing anything a customer would see.
