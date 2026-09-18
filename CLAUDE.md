# DTx-experiments

HTML prototypes for service design work, built to GOV.UK patterns. These are workshop artefacts used to make service design arguments visible, and to develop concepts and draw out requirements. They are not an attempt at final UI design, and they get thrown away and rebuilt often.

The repo holds more than one project. Prototypes sit flat at the root while there are few enough for that to be readable; when that stops being true they move into a folder per project, and `components.html` stays at the root because it is shared. Do not create that structure before it is needed.

For anything affecting what a screen looks like or says, follow `DESIGN.md`. It is scoped to the DVLA Drivers Medical prototypes, so a new project needs its own design judgement rather than inheriting that one.

## Conventions

Every prototype is one self-contained HTML file at the repo root, named for what it shows. No numbers, no version suffixes.

- No build step, no npm, no framework, no bundler.
- No CDN dependencies beyond the Google Fonts import already in use.
- Hand-rolled `govuk-*` CSS classes in a single `<style>` block. Do not pull in `govuk-frontend`.
- Vanilla JS. Hash router, one mutable `state` object, a `resetState()`, fictional data in top-level consts.
- All state in memory. Never localStorage or sessionStorage.

`components.html` is the component reference and the single authority for the `govuk-*` layer. Copy its `<style>` block rather than writing new CSS, and copy its markup rather than inventing class names. It is more authoritative than any description of it, including this file.

Read the prototype you are extending as well, for how a screen is assembled from those parts. Anything in it specific to that one prototype — a case-status hero, a condition strand — stays there and does not belong in `components.html`.

`components.html` carries the GOV.UK rebrand palette, read from `govuk-frontend` 6.0.0 rather than guessed. The prototypes built before it carry the older values. These are loose prototypes for demonstrating concepts, so exact visual consistency between them is not a goal and not worth spending time on. Do not retrofit the older files unless asked.

## Journey structure

Taken from GDS practice rather than from a failure here, because the first form journey in this repo has not been built yet and this is the shape it should take.

- One thing per page. A page asks a single question or does a single thing. A heading in the plural usually means several pages have been stacked into one.
- The page heading is the question. Where the question needs a fieldset, the legend carries the `h1` rather than sitting next to one.
- A journey runs start → one question per page → check your answers → confirmation. The check page is a summary list with a Change link on every row the customer supplied.
- One `h1` per page, a label on every input, and `govuk-visually-hidden` text on any link whose visible text repeats down the page.
- One primary action per page. The secondary route is a link or a secondary button, never a second green one.
- A confirmation panel is not the end of the page. A reference number on its own is what generates the next call; say what happens next and roughly when, under it.

A conditional reveal is a page you decided not to make. Fine for one short follow-up field, wrong as soon as the revealed content deserves its own heading — at that point it is a branch in the journey.

## Required on every prototype

- The fictional-prototype warning banner and the "Prototype — this is not a real service" phase banner.
- A `note()` design-note toggle, off by default. Design notes are prototype annotations, not service UI.
- An "All screens" index so any single screen can be opened directly in a workshop.
- Invented personal details only. Dummy data that looks like the real thing is good, because a plausible-looking record makes the screen easier to argue about. What matters is that it belongs to nobody: never a real person, and never a licence number issued to anyone.

## How to work here

Say what you are unsure about rather than resolving it silently. If a spec has a hole in it, a gap in a state model, an unhandled branch, two things conflated under one label, name it before building around it. Being told the model is wrong early is worth more than a complete implementation of the wrong model.

When a generated screen turns out wrong in a way `DESIGN.md` did not anticipate, say so, and propose the line that would have prevented it.
