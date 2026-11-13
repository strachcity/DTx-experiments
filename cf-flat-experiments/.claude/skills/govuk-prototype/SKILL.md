---
name: govuk-prototype
description: Build GOV.UK service prototypes with the GOV.UK Prototype Kit (Nunjucks + Express). Use when someone asks for the Prototype Kit, or when a journey is being handed to developers as a spec. For most prototypes, use govuk-html-prototype instead, which needs nothing installed. Covers scaffolding a fresh kit, the Design System component macros, routing, session data, and GDS interaction patterns.
---

# GOV.UK service prototypes

This skill produces **real, runnable GOV.UK prototypes** using the official
[GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/docs) — the same tool GDS and
government service teams use for user research. Output is Nunjucks templates + a small Express
router, styled with `govuk-frontend`, so pages look and behave like real gov.uk services.

Do not hand-write GOV.UK HTML/CSS from scratch, and do not use a generic frontend framework.
Use the Prototype Kit and its component macros — that is what makes prototypes "perfect".

## When to use

Trigger on: "gov.uk prototype", "GDS", "government service page", "service journey",
"check your answers", "start page", "one thing per page form", or any request to prototype a
UK public-sector service.

## Golden rules (GDS)

These are what separate a passable prototype from a correct one:

1. **One thing per page.** Each page asks a single question or does a single thing. Split
   multi-part forms across pages rather than stacking fields.
2. **The page heading is the question.** Use `<h1 class="govuk-heading-xl">` (or the fieldset
   legend as page heading) — not a generic title with the question buried below.
3. **Use the component macros, never bare HTML.** `{{ govukInput(...) }}`, `{{ govukRadios(...) }}`,
   etc. They are auto-imported — no `{% from %}` needed.
4. **Every journey has: start page → question pages → check-your-answers → confirmation panel.**
5. **Accessibility is not optional.** Labels on every input, `autocomplete` where it applies,
   `govuk-visually-hidden` for icon/search labels, one `<h1>` per page.
6. **Real content, plain English.** Follow GDS content style: short sentences, active voice,
   "You'll need…", contractions. (For deeper content help, use the
   `govuk-content` skill from the government communication skills.)
7. **Phase banner** ("Alpha"/"Beta") on services under development.

## Workflow

1. **Confirm the journey before building.** State the page list (start → each question →
   check answers → confirmation) and any branching. Adjust with the user, then build.
2. **Scaffold or reuse a kit.** If no kit exists in the working directory, create one — see
   [reference/setup.md](reference/setup.md). If one exists, add pages to `app/views/` and
   routes to `app/routes.js`.
3. **Build each page** as a Nunjucks template extending `layouts/main.html`, using component
   macros — see [reference/components.md](reference/components.md).
4. **Wire the flow** with routes, session data, branching and check-your-answers — see
   [reference/patterns.md](reference/patterns.md).
5. **Run and verify.** `npm run dev` serves at http://localhost:3000. Click through the whole
   journey, including a branch and the change-answer links, before calling it done.

## In this repo

The root `CLAUDE.md` applies to Prototype Kit apps too, and wins where it differs from this skill:

- Use the "Prototype: this is not a real service" phase banner, not "Alpha" or "Beta", and add the fictional-prototype warning.
- Add design notes, off by default, and an "All screens" index page.
- Use invented personal details only.

`drivers-medical/staying-informed/secure-messages/` does all of this. Copy how it does it: `app/views/layouts/main.html` for the banners, `app/views/macros/notes.njk` for design notes and `app/views/index.html` for the index. It also has a build that publishes the app to GitHub Pages without anyone running it, in `static/` and `.github/workflows/pages.yml`.

## Reference files

- [reference/setup.md](reference/setup.md) — scaffold a fresh kit, `config.json`, layout,
  `launch.json`, running the server, folder structure.
- [reference/components.md](reference/components.md) — the full component macro catalogue
  (inputs, radios, checkboxes, dates, tables, summary lists, tags, panels, banners…) plus
  typography, spacing and grid utility classes.
- [reference/patterns.md](reference/patterns.md) — routing, session data, multi-step forms,
  branching, filtering, check-your-answers, custom Nunjucks filters, custom JS.

## Authoritative sources

- Components: https://design-system.service.gov.uk/components/
- Patterns: https://design-system.service.gov.uk/patterns/
- Styles: https://design-system.service.gov.uk/styles/
- Macro options (x-govuk): https://govuk-components.x-govuk.org/
- Kit docs: https://prototype-kit.service.gov.uk/docs
