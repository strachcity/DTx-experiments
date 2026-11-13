# Setup — scaffolding and running a GOV.UK Prototype Kit

## Create a fresh kit

If there is no kit in the working directory, create one with the official installer:

```bash
npx govuk-prototype-kit@latest create
npm install
npm run dev
```

This scaffolds the folder structure below and starts a live-reloading server at
http://localhost:3000.

A known-good pinned setup (what a working real-world prototype uses):

**`package.json`** (scripts + core deps):
```json
{
  "scripts": {
    "dev": "govuk-prototype-kit dev",
    "serve": "govuk-prototype-kit serve",
    "start": "govuk-prototype-kit start"
  },
  "dependencies": {
    "@govuk-prototype-kit/common-templates": "2.0.1",
    "govuk-frontend": "6.0.0",
    "govuk-prototype-kit": "13.18.1"
  }
}
```

## Folder structure

```
app/
├── assets/
│   ├── javascripts/application.js    # Custom JavaScript
│   └── sass/application.scss         # Custom SCSS
├── data/
│   └── session-data-defaults.js      # Default session data
├── views/
│   ├── layouts/
│   │   └── main.html                 # Main layout (extends govuk-branded)
│   └── *.html                        # Page templates (auto-routed by filename)
├── config.json                       # Service name + plugin config
├── routes.js                         # Route handlers
└── filters.js                        # Custom Nunjucks filters
```

## `app/config.json`

Set the service name here. `rebrand: true` enables the current GOV.UK brand (crown + Transport
typeface refresh) — always use it for a current-looking prototype.

```json
{
  "serviceName": "Check your council tax band",
  "plugins": {
    "govuk-frontend": {
      "rebrand": true
    }
  }
}
```

## `app/views/layouts/main.html`

The base layout every page extends. Extends the kit's branded layout and adds the header +
service navigation:

```nunjucks
{% extends "govuk-prototype-kit/layouts/govuk-branded.njk" %}
{% from "govuk/components/service-navigation/macro.njk" import govukServiceNavigation %}

{% block header %}
  {{ govukHeader() }}
  {{ govukServiceNavigation({
    serviceName: serviceName
  }) }}
{% endblock %}
```

## Page template skeleton

Every page follows this shape. `pageName` sets the `<title>`; the visible `<h1>` is written in
the content block.

```nunjucks
{% extends "layouts/main.html" %}

{% set pageName = "What is your postcode?" %}

{% block beforeContent %}
  {# optional: back link, breadcrumbs, phase banner #}
  <a href="/start" class="govuk-back-link">Back</a>
{% endblock %}

{% block content %}
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      {# heading, content and component macros go here #}
    </div>
  </div>
{% endblock %}
```

Constrain question/content pages to `govuk-grid-column-two-thirds` — this is the GDS line-length
rule for readability.

## Running

```bash
npm run dev      # development with live reload (use this while building)
npm run serve    # serve without live reload
npm run start    # production-style start
```

Server: **http://localhost:3000**.

### Optional: Claude Code launch config

To let Claude Code start the preview, add `.claude/launch.json`:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "govuk-prototype",
      "runtimeExecutable": "node",
      "runtimeArgs": ["node_modules/.bin/govuk-prototype-kit", "dev", "--suppress-node-version-warning"],
      "port": 3000,
      "autoPort": false
    }
  ]
}
```
