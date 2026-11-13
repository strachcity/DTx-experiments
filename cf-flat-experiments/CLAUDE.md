# CustomerFirst design

How the CustomerFirst design team builds prototypes and other design artefacts with Claude. The team owns this file. If a rule here gets in the way of good work, change it.

## How the repo is organised

- Each project has its own folder at the root, like `drivers-medical/`. A project can have its own `CLAUDE.md`, `DESIGN.md` and `README.md` for its context. Inside a project folder, they win over this file.
- Shared things stay at the root: this file, `components.html` and the skills in `.claude/skills/`.
- Put new work in the project it belongs to. Ask before starting a new project folder.
- Name files for what they show, like `case-status-tracker.html`. Add `-v2` when the earlier version needs to stay viewable; otherwise replace it.
- Links between files are relative, so files that link to each other move together.

## Building to the GOV.UK Design System

The [GOV.UK Design System](https://design-system.service.gov.uk/) is the default. Most of what we build should follow it. Deviate when the work needs to, for example a service in another design system, a service map or something that doesn't exist yet. When you do, say why in a design note or the project's README.

There are two ways to build a prototype. Choose per piece of work:

| | Single HTML file | GOV.UK Prototype Kit |
|---|---|---|
| Skill | `govuk-html-prototype` | `govuk-prototype` |
| Use it for | Most things: workshops, concepts, testing an idea | Handing a journey to developers as a spec |
| Runs | In any browser, nothing to install | Needs Node.js to run locally |

Start with a single HTML file unless there's a reason not to.

For a single HTML file, `components.html` is the reference. Copy its `<style>` block and its markup rather than writing new CSS or inventing class names.

For a Prototype Kit app, `drivers-medical/staying-informed/secure-messages/` shows how to publish one to GitHub Pages so people can use it without running it. The Pages workflow only builds that one app at the moment, so a new Kit app needs adding to `.github/workflows/pages.yml`.

## Kinds of artefact

What we make will keep changing. So far:

- **Prototype:** a clickable journey through a service.
- **Canvas:** a service blueprint, whole-service map, capability map or vision. One wide page to argue over, not a journey. Canvases can keep images in an `illustrations/` folder beside them.
- **Routing map and call simulator:** phone and web chat routes, and a way to hear how long they take.

Make something new when the work needs it. When you make the same kind of thing a second time, write down how it's built, either here or as a skill, so the next person can make it the same way.

## Journey structure

From GDS practice, for any prototype with a journey in it:

- One thing per page. A page asks a single question or does a single thing. A heading in the plural usually means several pages have been stacked into one.
- The page heading is the question. Where the question needs a fieldset, the legend carries the `h1`.
- A journey runs start → one question per page → check your answers → confirmation. The check page is a summary list with a Change link on every answer the person gave.
- One `h1` per page, a label on every input, and `govuk-visually-hidden` text on any link whose visible text repeats down the page.
- One primary action per page. The secondary route is a link or a secondary button, never a second green one.
- A confirmation panel isn't the end of the page. Say what happens next and roughly when, under it.

A conditional reveal is fine for one short follow-up field. As soon as the revealed content deserves its own heading, make it its own page.

## Every prototype has

- The fictional-prototype warning and the "Prototype: this is not a real service" phase banner.
- Design notes, off by default, that explain the argument each screen is making.
- An "All screens" index, so any single screen can be opened directly in a workshop.
- Invented personal details only. Dummy data that looks like the real thing makes a screen easier to argue about, but it must belong to nobody: never a real person and never a real reference, licence, NHS or National Insurance number.

## How to work here

- **Say what you're unsure about.** If a brief has a hole in it, like an unhandled branch or two things under one label, name it before building around it. Being told the model is wrong early is worth more than a finished version of the wrong model.
- **Confirm the plan before building.** For a prototype, that's the list of screens.
- **Keep it simple.** Build what was asked, nothing speculative.
- **Change only what you need to.** Match the style of the file you're in, and don't tidy things you weren't asked to touch.
- **Check it works** before saying it's done. Click through every screen.
- **When something comes out wrong** in a way these rules didn't anticipate, say so and suggest the line that would have prevented it.
