# Drivers Medical

The DVLA Drivers Medical work. The team rules in the root `CLAUDE.md` apply here too. This file adds what is specific to this project.

For anything affecting what a screen looks like or says, follow `DESIGN.md` in this folder. It is scoped to Drivers Medical, so other projects need their own design judgement rather than inheriting it.

## Folders

Work is grouped by the kind of work it is:

- `service-vision/`: the future-state service blueprint, whole-service maps, CX vision and capability map. These are canvases. Step illustrations are WebP files in `service-vision/illustrations/`, named by map and step (`cx-01.webp`, `newco-17.webp`). A versioned canvas gets its own folder (`illustrations/v2/`), because adding a step renumbers the images.
- `prototypes/`: customer-facing prototypes.
- `ivr/`: NewCo routing maps and phone or web chat prototypes.
- `staying-informed/`: the staying informed proposition, combining status tracking and secure communications: the case status tracker, the secure messages app, and the case updates prototype that merges them. This is the one group named after a proposition rather than a kind of work, because those three are argued about together. Ask before adding another group like it.
- `archive/`: earlier versions kept for reference. Don't build on them.

Put a new file in the group it belongs to. Don't invent a new group without asking.

## Secure messages

`staying-informed/secure-messages/` is a GOV.UK Prototype Kit app, not a single HTML file. It is a step towards production, so it uses GOV.UK Frontend through npm, Nunjucks macros, routes and session data that developers can read as a spec. Everything else in the team rules still applies: the banners, design notes, the "All screens" index, dummy data, the journey structure and `DESIGN.md`. Its own `README.md` says how to run it. GitHub Pages gets a browser-only build of it, made by `.github/workflows/pages.yml` from the same routes and templates, so change the app rather than the build.

## Dummy data

"Jack Strachan" may be used as a dummy name in this project. Every other personal detail stays invented, and never a licence number issued to anyone.

## Older files

`components.html` carries the GOV.UK rebrand palette, read from `govuk-frontend` 6.0.0. Prototypes built before it carry the older values. Don't retrofit them unless asked.
