# Patterns — routing, data and journeys

## Routing (`app/routes.js`)

```javascript
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// GET route
router.get('/my-page', function (req, res) {
  res.render('my-page', { customData: 'value' })
})

// POST route (form handling)
router.post('/step-1', function (req, res) {
  // Form data is auto-saved to req.session.data by input `name`
  res.redirect('/step-2')
})
```

**Auto-routing:** any `.html` in `app/views/` is served at its path
(`views/about.html` → `/about`). You only need explicit routes for POST handling, branching,
or passing computed data.

## Session data

Default values in **`app/data/session-data-defaults.js`**:
```javascript
module.exports = {
  firstName: '',
  email: ''
}
```

- Form inputs are **automatically saved** to the session by their `name` attribute.
- Read in templates with `{{ data.firstName }}` or `{{ data['field-name'] }}`.
- Pre-fill inputs with `value: data.firstName` so Back/Change returns show prior answers.
- Persists across pages for the session (clear via the kit's "Clear data" page).

## Multi-step form ("one thing per page")

**Routes:**
```javascript
router.post('/step-1', (req, res) => res.redirect('/step-2'))
router.post('/step-2', (req, res) => res.redirect('/check-answers'))
```

**Each step template:**
```nunjucks
<form method="post" novalidate>
  {{ govukInput({ name: "firstName", value: data.firstName, label: { text: "First name" } }) }}
  {{ govukButton({ text: "Continue" }) }}
</form>
```

The **check-answers page** uses `govukSummaryList` (see components.md) with a Change link back to
each step, then a final `{{ govukButton({ text: "Accept and send" }) }}` posting to a route that
redirects to the **confirmation page** (a `govukPanel`).

## Branching

```javascript
router.post('/do-you-live-in-uk', (req, res) => {
  if (req.session.data['live-in-uk'] === 'yes') {
    res.redirect('/uk-address')
  } else {
    res.redirect('/international-address')
  }
})
```

## Filtering / search with GET params

```javascript
router.get('/results', (req, res) => {
  const keyword = req.query.keyword || ''
  const filtered = allItems.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  )
  res.render('results', { results: filtered, keyword: keyword })
})
```

## Custom Nunjucks filters (`app/filters.js`)

```javascript
const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

addFilter('formatDate', function (dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
})
```
Usage: `{{ "2025-03-15" | formatDate }}` → "15 March 2025".

## Custom JavaScript (`app/assets/javascripts/application.js`)

```javascript
window.GOVUKPrototypeKit.documentReady(() => {
  // Your code here
})
```

## A complete minimal journey

```
views/start.html            → start page with green "Start now" button → /postcode
views/postcode.html         → one question, form posts to /results
routes.js                   → GET /results filters data and renders results
views/results.html          → table / list of results
views/check-answers.html    → govukSummaryList with Change links
routes.js                   → POST /check-answers → /confirmation
views/confirmation.html     → govukPanel with a reference number
```

Always click through the whole journey (including one branch and the Change links) in
`npm run dev` before considering it complete.
