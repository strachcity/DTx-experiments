# cf-flat-experiments
CustomerFirst flat site experiments

This repo contains a number of experiments that require version control and are being iterated with partner organisations.

# CustomerFirst
Build the future of public services with us

# About us
Millions of people rely on public services every day and those experiences shape trust in government. Too many services still feel slow, fragmented or held back by outdated systems and processes. Small, isolated improvements aren’t enough to meet the scale of the challenge.

# Read more
[https://customerfirst.campaign.gov.uk/](https://customerfirst.campaign.gov.uk/)

# Design at CustomerFirst

This is where the CustomerFirst design team keeps its prototypes, service maps and other design artefacts, and the rules and Claude skills we use to build them.

## What's in here

| | |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | How we build: the GOV.UK Design System as the default, the Service Standard, usability heuristics, accessibility, journey structure and what every prototype needs. Written by the team, and open to change. |
| [`DESIGN-template.md`](DESIGN-template.md) | A starting point for a project's own design guidance. |
| [`components.html`](components.html) | The GOV.UK components every single-file prototype is built from, with the markup beside each one. |
| [`.claude/skills/`](.claude/skills) | Skills Claude picks up when you work in this repo. |
| Project folders | One per project, each with its own context and artefacts. |

## Skills

| Skill | What it does |
|---|---|
| `govuk-html-prototype` | Builds a GOV.UK prototype as one HTML file that opens in any browser, with nothing to install. The default. |
| `govuk-prototype` | Builds a prototype with the GOV.UK Prototype Kit, for journeys being handed to developers. Needs Node.js. |
| `govuk-style-writer` | Rewrites text in GOV.UK style for screens, letters, emails and text messages, with optional Welsh. |
| `design-review` | Checks a prototype against the team's rules, the Service Standard, usability heuristics and accessibility, and lists what to fix. Run it before showing anything. |

When you open this repo in Claude, it also offers to install the [government communication skills](https://github.com/strachcity/gov-communication-skills), for drafting and checking letters, emails, texts and status messages and what they reveal about a person. Say yes.

You don't need to name a skill. Ask for "a prototype of…" or "rewrite this in GOV.UK style" and Claude chooses.

## Projects

| Project | What it is |
|---|---|
| [Drivers Medical](drivers-medical/) | DVLA Drivers Medical: service vision, customer prototypes, phone routing and staying informed. |
| [NHS App](nhs-app/) | NHS App adoption model. |

## Working in this repo

1. Clone this repo in GitHub Desktop.
2. In the Claude desktop app, start a Code session in the repo folder. Claude reads `CLAUDE.md` and the skills from there.
3. Build in your project's folder.
4. In GitHub Desktop, check your changes, commit them with a short summary of what changed, and push.

To add a project, make a folder for it, add it to the table above, and give it a `README.md` saying what it is. Add a `DESIGN.md`, from `DESIGN-template.md`, once the project has its first screens, and a `CLAUDE.md` if it has its own way of organising things.

## Improving how we work

The rules in `CLAUDE.md`, the components and the skills get better when people change them. If something got in your way, or you've made a new kind of artefact more than once, change the rule or add a skill, and tell the team what you changed.
