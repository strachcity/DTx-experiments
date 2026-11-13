# CustomerFirst design

How the CustomerFirst design team builds prototypes and other design artefacts with Claude. The team owns this file. If a rule here gets in the way of good work, change it.

## How the repo is organised

- Each project has its own folder at the root, like `drivers-medical/`. A project can have its own `CLAUDE.md`, `DESIGN.md` and `README.md` for its context. Inside a project folder, they win over this file.
- Shared things stay at the root: this file, `components.html` and the skills in `.claude/skills/`.
- Put new work in the project it belongs to. To start a new project, make a folder for it and add it to the list in `README.md`.
- A project's `DESIGN.md` holds the design judgement for that one service: who it's for, what it must never do, and its edge cases. Start one from `DESIGN-template.md` once the project has its first screens, and grow it from things that went wrong.
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

## Design principles

### The Service Standard

Prototypes are where the [Service Standard](https://www.gov.uk/service-manual/service-standard) gets tested before anything is built. Every prototype should be able to answer these:

- **1. Understand users and their needs.** Who is this for, and which need is it meeting? Say so in the design notes.
- **2. Solve a whole problem for users.** What happens before and after this journey? Don't stop the prototype where our organisation's responsibility stops.
- **3. Provide a joined-up experience across all channels.** What does the person see in letters, texts, emails and on the phone at the same moment? Show it, or say what's missing.
- **4. Make the service simple to use.** Could someone complete it first time without help?
- **5. Make sure everyone can use the service.** See "Accessibility" below, and think about people who won't use it online at all.
- **9. Create a secure service which protects users' privacy.** Show only the personal information each screen and message needs. See "Customer communications and privacy" below.
- **13. Use and contribute to open standards, common components and patterns.** Use the GOV.UK Design System before inventing anything.

The other points are about teams, technology and running a live service. They matter, but a prototype doesn't test them.

### Usability heuristics

Use [Nielsen's ten usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) to check screens:

1. **Visibility of system status.** People can always tell what's happening, what happens next and roughly when.
2. **Match with the real world.** Use the words people use, not ours.
3. **User control and freedom.** People can go back, change an answer or leave without losing their work.
4. **Consistency and standards.** The same thing looks and works the same way everywhere, and follows GOV.UK patterns.
5. **Error prevention.** Design out the mistake before writing the error message.
6. **Recognition rather than recall.** Don't make people remember something from an earlier page or a letter they can't see.
7. **Flexibility and efficiency of use.** People who know what they're doing can get there quickly.
8. **Aesthetic and minimalist design.** Every element earns its place. Say each fact once.
9. **Help people recognise, diagnose and recover from errors.** Say what went wrong and how to fix it, in plain English.
10. **Help and documentation.** Help is where it's needed, not in a separate place.

### Rules that hold in every service

- Never a status without what happens next and roughly when. A status on its own is what makes people phone.
- Never an empty panel or section. If there's nothing there, say what the absence means.
- Never internal vocabulary, team names or system labels in anything a customer sees.
- Never soften bad news or a long wait into vagueness. Plainly stated bad news is kinder than an ambiguous screen.
- Never a countdown or a single date you don't actually know. Give a range and a reason: "usually 2 to 4 weeks, because we're waiting for your GP to reply".
- Say each fact once. If a date, status or action appears twice on a screen, remove one.
- Plain English, and dates written as "3 March 2026".
- Handle edge cases on purpose: no data yet, a very long wait, a bad outcome, text long enough to wrap, a third party who hasn't replied. Generated screens fail most often here.
- A design note states the argument the screen is making, not what's on it.

## Accessibility

Every prototype meets [WCAG 2.2 AA](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps), the level public sector services must meet. Prototypes are tested with real people, including disabled people, so this isn't something to fix later.

- Build from GOV.UK components. They're tested with assistive technology; home-made ones aren't.
- One `h1` per page, and headings in order without skipping levels.
- A visible label on every input, connected with `for` and `id`. Questions that need a fieldset use a legend.
- Everything works with a keyboard alone, in a sensible order, with the yellow focus state visible.
- Never meaning carried by colour alone. Every tag and status has text.
- Text and interactive elements meet contrast ratios: 4.5:1 for text, 3:1 for large text and component edges. The palette in `components.html` already does.
- Link text makes sense on its own. "Change" links get `govuk-visually-hidden` text saying what they change.
- Errors use the error summary at the top of the page, linked to each field, with the same wording beside the field.
- Images have `alt` text, or `alt=""` if they're decorative.
- Pages work at 320px wide and at 400% zoom, without scrolling sideways.
- Don't put time limits on people without a way to extend them.

## Customer communications and privacy

When a prototype includes what a person is sent or told (letters, emails, texts, notifications, status messages, phone scripts) or shows personal or health information, use the [government communication skills](https://github.com/strachcity/gov-communication-skills). This repo offers to install them when you open it in Claude.

- `government-communication` drafts or reviews a message, and plans which messages a case journey needs.
- `privacy-aware-communications` checks what a message or screen reveals about a person, in each channel, and who might see it.
- `govuk-content` checks content against GOV.UK style.

They flag legal, policy and privacy questions rather than answering them. Put those questions in a design note, not in the prototype as if they were settled.

## Checking your work

Run the `design-review` skill before a prototype goes in front of anyone. It checks the journey structure, the Service Standard questions, the heuristics, accessibility and the project's `DESIGN.md`, and lists what fails. It doesn't change anything unless you ask.

## How to work here

- **Say what you're unsure about.** If a brief has a hole in it, like an unhandled branch or two things under one label, name it before building around it. Being told the model is wrong early is worth more than a finished version of the wrong model.
- **Confirm the plan before building.** For a prototype, that's the list of screens.
- **Keep it simple.** Build what was asked, nothing speculative.
- **Change only what you need to.** Match the style of the file you're in, and don't tidy things you weren't asked to touch.
- **Check it works** before saying it's done. Click through every screen.
- **When something comes out wrong** in a way these rules didn't anticipate, say so and suggest the line that would have prevented it.
