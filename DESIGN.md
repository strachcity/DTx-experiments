# DESIGN.md

Design judgement for the CustomerFirst Drivers Medical prototypes. `CLAUDE.md` covers how to build here. This file covers what a screen should look like and say, and why.

No token block. The GDS palette, type scale and spacing live as CSS variables in `components.html`, and that is the single source of truth. Read them from there.

This file is short on purpose and grows only from real failures. Every line should trace back to a generation where the output was wrong.

## Overview

Most people opening this screen are waiting to find out whether they can still drive, and for many the licence is how they get to work, to hospital, or to someone they look after. What frightens them is the silence. An open-ended wait with nothing visible inside it reads as a decision already being taken about them, out of sight, so what this service needs is definiteness: say what is happening, who holds the case and roughly how long, even when the honest answer is bad news or that DVLA does not know.

## What prominence is for

This service exists to remove the reason to phone. Prominence goes to whatever a customer would otherwise ring the contact centre to ask, not to whatever the information architecture puts first. Over half of all inbound calls are people asking where their case is. If a screen answers that clearly and a customer would still call, the screen has failed regardless of how correct it is.

## Never

- Never a numbered stepper, a percentage complete, or a countdown to a specific date. The case does not move through a fixed number of steps and DVLA does not know the date.
- Never a status without what happens next and roughly when, attached to it. A status alone is the thing that generates the call.
- Never internal vocabulary in anything a customer sees: no "Level 3", "EOC", "escalated", "triage", "CALD", "second series", "case owner".
- Never meaning carried by colour alone. Every tag carries text.
- Never an empty panel. If there is nothing in a section, say what that absence means in a sentence.
- Never soften a long wait or a bad outcome into vagueness. Plainly stated bad news is kinder than an ambiguous screen, and it generates fewer calls.
- Never a status label presented as if it came from the real case management system. Prototype labels are flagged in a comment as needing mapping.

## Content

Plain English. Dates written as "3 March 2026". Waits expressed as a range with a reason ("usually 2 to 4 weeks, because we are waiting for your GP to reply"), never a single date.

Say who holds the case in terms the customer recognises. "A DVLA doctor is reviewing your case", not "escalated to medical adviser".

A design note should state the argument the screen is making, not describe what is on it.

## Edge cases

This is where generated UI fails most predictably, because the agent has no guidance for situations that do not fit neatly. Handle these explicitly rather than letting them render as blank space:

- A case with only one timeline entry, and a case open for more than a year.
- A wait where the third party has not replied and has been chased more than once.
- A condition name or an action description long enough to wrap to three lines.
- A bad outcome. Revoked and refused need weight without cruelty, and a route to what happens now.
- Any state where the honest answer is that DVLA does not know how long it will take.

## Open questions

Not yet resolved. Flag rather than guess:

- Legal framing of decision language. DVLA's position on first notifications may be that no decision is being made, which would make "a decision has been made" wrong on that path even though it reads naturally. Check with policy before that wording ships anywhere real.
- Whether a challenged or appealed decision is a closed case reopened, or a decided case with an action outstanding.
- How much internal routing to expose at all. Telling someone a DVLA doctor has their case is honest and may also be alarming. This is a research question, not a design one.
