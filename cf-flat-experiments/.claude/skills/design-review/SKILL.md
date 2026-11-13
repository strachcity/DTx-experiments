---
name: design-review
description: Review a prototype, screen or journey in this repo against the team's design rules before it goes in front of anyone. Checks journey structure, the GOV.UK Service Standard questions, Nielsen's usability heuristics, WCAG 2.2 AA accessibility, the project's DESIGN.md and what every prototype must have, then lists what fails with a fix for each. Use when someone asks to review, check, critique, QA or "sense check" a prototype, or asks whether something is ready to show.
---

# Design review

Finds problems. It doesn't fix them unless the person asks.

## What to read first

1. The root `CLAUDE.md`. The checks below come from it, and it wins if they disagree.
2. The project's `CLAUDE.md` and `DESIGN.md`, if it has them. They win over the root inside their project.
3. The prototype itself, all of it.

## How to check

Open the prototype in a browser (Playwright if you have it) and go through it as a person would:

- Click through every screen from the "All screens" index, every branch and every Change link.
- Do the main journey with the keyboard alone: Tab, Shift+Tab, Enter, Space.
- Look at every screen at 320px wide.
- Submit forms empty and with wrong answers, where the prototype has validation.
- Check the console for errors.

Then read the code for what you can't see: heading order, labels, `alt` text, `visually-hidden` text and colour contrast.

Don't report something you haven't checked. If you couldn't open it in a browser, say so and say which checks that leaves out.

## Checklist

**Every prototype has**
- The fictional-prototype warning and the prototype phase banner.
- Design notes, off by default, stating the argument of each screen.
- An "All screens" index that opens every screen.
- Invented personal details only.

**Journey structure**
- One thing per page. The heading is the question.
- Start, one question per page, check your answers, confirmation.
- A Change link on every answer the person gave.
- One primary action per page.
- What happens next, and roughly when, under the confirmation panel.
- Conditional reveals only for one short follow-up field.

**Service Standard**
For points 1 to 5, 9 and 13, as listed in `CLAUDE.md`: can the prototype answer the question? If it can't, that's a gap to name, not always a failure. Point 3 often needs the letters, texts and calls around the journey that aren't shown.

**Usability heuristics**
All ten, as listed in `CLAUDE.md`. Name the heuristic for each problem.

**Rules that hold in every service**
As listed in `CLAUDE.md`. Look hard at the edge cases: no data, long waits, bad outcomes, long text, no reply from a third party.

**Accessibility (WCAG 2.2 AA)**
As listed in `CLAUDE.md`. Give the WCAG success criterion where you can, like "1.4.3 Contrast (Minimum)".

**The project's `DESIGN.md`**
Every "Never" line, the content rules and the edge cases.

**Communications and privacy**
If the prototype shows messages, letters, texts, notifications or status text, or personal or health information, say so and suggest running `government-communication` or `privacy-aware-communications` on them. Don't do a privacy assessment here.

## What to report

Start with one line: what you reviewed, and anything you couldn't check.

Then a table, most serious first:

| # | Screen | Problem | Rule broken | Suggested fix |
|---|---|---|---|---|

Use three levels of seriousness:
- **Blocks testing:** someone couldn't complete the journey, or a screen is inaccessible.
- **Should fix:** it breaks a rule and would affect what research finds.
- **Worth a look:** a judgement call.

Then two short lists:
- **Questions for the team:** gaps the prototype can't answer, such as an unhandled branch or a policy question.
- **Rules to add:** if a problem wasn't covered by `CLAUDE.md` or `DESIGN.md`, suggest the line that would have prevented it.

Keep it short. If nothing fails, say so in one line rather than padding the review.
