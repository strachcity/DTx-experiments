# DTx-experiments

HTML prototypes for service design work, built to GOV.UK patterns. These are workshop artefacts used to make service design arguments visible, and to develop concepts and draw out requirements. They are not an attempt at final UI design, and they get thrown away and rebuilt often.

The rules in this file are defaults, not gates. If one is in the way of a better approach, say so and propose the change rather than working around it or refusing.

Each project has its own folder at the root, and `components.html` stays at the root because it is shared. Inside a project folder, prototypes are grouped by the kind of work they are. For Drivers Medical (`drivers-medical/`) that is:

- `service-vision/`: the whole-service maps, plus the older blueprint and the hand-built first version of the map. These are canvases, not prototypes, so the prototype conventions below do not apply to them. See "Whole-service map" below.
- `prototypes/`: customer-facing prototypes.
- `ivr/`: NewCo routing maps and phone or web chat prototypes.

Put a new file in the group it belongs to. Do not invent a new group without asking. Links between prototypes are relative, so files that link to each other move together.

For anything affecting what a screen looks like or says, follow `drivers-medical/DESIGN.md`. It is scoped to the DVLA Drivers Medical prototypes, so a new project needs its own design judgement rather than inheriting that one.

## Whole-service map

`service-vision/whole-service-map/` draws every map (CX, NewCo, and any added later, such as healthcare professionals) from data, with one shared renderer.

- The content is edited in the map editor artifact, https://claude.ai/artifact/QXGoryDQP2AnYbf77dDaqA, which keeps it in its database: `maps/<id>` and `registry/components`. That database is the working copy. Do not rebuild map HTML by hand to change content.
- `data/*.js` in the repo is a snapshot of it. To save a version, read `maps` and `registry` out with ArtifactData (`out_dir`), run `python3 write-data.py <that folder>`, check `index.html`, and commit.
- `map.js` and `map.css` are the renderer, shared by `index.html` and `editor.html`. A change to them means republishing `editor.html` to the artifact URL above, with `map.js`, `map.css` and `illustrations/*.webp` as its files.
- Epics are the user outcomes in each step. Status (exists, planned, building, BAU, unresolved) belongs to the components behind an epic, in one register shared by every map. "Unresolved" is the same thing the maps used to call "tbc".
- Step illustrations live in `service-vision/illustrations/`, named by the step's `image` field. Step ids are stable and do not change when steps are reordered, so the file names stay put.
- `whole-service-map.html` is the hand-built first version, kept as it was. `future-state-service-blueprint.html` is older still.

## Conventions

These apply to the prototypes in `prototypes/` and `ivr/`.

Every prototype is one self-contained HTML file in its project folder, named for what it shows. No numbers, no version suffixes.

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
