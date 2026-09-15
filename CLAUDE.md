# DTx-experiments

HTML prototypes for CustomerFirst, the DSIT/GDS partnership transforming the DVLA Drivers Medical service. These are workshop artefacts used to make service design arguments visible. They get thrown away and rebuilt often.

For anything affecting what a screen looks like or says, follow `DESIGN.md`.

## Conventions

Every prototype is one self-contained HTML file at the repo root, named for what it shows. No numbers, no version suffixes.

- No build step, no npm, no framework, no bundler.
- No CDN dependencies beyond the Google Fonts import already in use.
- Hand-rolled `govuk-*` CSS classes in a single `<style>` block. Do not pull in `govuk-frontend`.
- Vanilla JS. Hash router, one mutable `state` object, a `resetState()`, fictional data in top-level consts.
- All state in memory. Never localStorage or sessionStorage.

Read the prototype you are extending before writing anything, and copy its `<style>` block rather than writing new CSS. It is the reference for structure, naming and idiom, and it is more authoritative than any description of it.

## Required on every prototype

- The fictional-prototype warning banner and the "Prototype — this is not a real service" phase banner.
- A `note()` design-note toggle, off by default. Design notes are prototype annotations, not service UI.
- An "All screens" index so any single screen can be opened directly in a workshop.
- Invented personal details only. Never anything resembling a real licence number or a real person.

## How to work here

Say what you are unsure about rather than resolving it silently. If a spec has a hole in it, a gap in a state model, an unhandled branch, two things conflated under one label, name it before building around it. Being told the model is wrong early is worth more than a complete implementation of the wrong model.

When a generated screen turns out wrong in a way `DESIGN.md` did not anticipate, say so, and propose the line that would have prevented it.
