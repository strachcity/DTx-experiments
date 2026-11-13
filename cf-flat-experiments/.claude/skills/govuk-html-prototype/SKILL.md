---
name: govuk-html-prototype
description: Build a GOV.UK prototype as one self-contained HTML file that opens in any browser with nothing to install. The default way to prototype in this repo. Use whenever someone asks for a prototype, a journey, some screens or a clickable mock-up of a government service, unless they ask for the GOV.UK Prototype Kit or the work is being handed to developers as a spec (then use govuk-prototype).
---

# GOV.UK HTML prototype

One HTML file. It opens from GitHub Pages or straight from disk, so anyone in a workshop can click through it without installing anything.

## Start from the template

Copy `template.html` from this skill's folder into the project folder it belongs to, and rename it for what it shows, like `apply-for-a-blue-badge.html`. It already has:

- the `<style>` block from `components.html`
- the GOV.UK header, the prototype phase banner and the fictional-prototype warning
- a design notes toggle, off by default, and `note(title, body)` to add one
- an "All screens" index, built from `SCREENS`, so any screen can be opened directly
- a hash router, one `state` object, `resetState()`, and invented data in consts at the top
- an example journey: start, one question, check your answers, confirmation

Replace the example journey with the real one. Keep the structure.

## How to build

1. **Confirm the page list first.** Say the screens you plan (start, each question, check answers, confirmation) and any branches, and let the person change it before you build.
2. **Copy markup from `components.html`** at the repo root. It is the reference for every `govuk-*` class. Don't invent class names or write new CSS. If a component isn't there, say so.
3. **Follow the journey rules in the repo's `CLAUDE.md`.** One thing per page, the heading is the question, one primary action per page.
4. **Add design notes** for the argument each screen is making. They are for the workshop, not the service.
5. **Check it works.** Open the file in a browser (Playwright if you have it), click through every screen and every Change link, and check there are no console errors.

## What not to do

- No build step, no npm, no framework, no CDN scripts.
- Never `localStorage` or `sessionStorage`. A reload should reset the prototype for the next person in the room.
- No real personal details. Plausible-looking dummy data is good, as long as it belongs to nobody.
