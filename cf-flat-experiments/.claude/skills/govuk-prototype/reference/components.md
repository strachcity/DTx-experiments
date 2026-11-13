# Components — GOV.UK macro catalogue

All components are Nunjucks macros, **auto-imported** by the kit — no `{% from %}` needed. Full
options for every macro: https://govuk-components.x-govuk.org/ and
https://design-system.service.gov.uk/components/.

## Button

```nunjucks
{{ govukButton({ text: "Continue", type: "submit" }) }}

{{ govukButton({ text: "Start now", href: "/first-page", isStartButton: true }) }}

{{ govukButton({ text: "Delete", classes: "govuk-button--warning" }) }}

{{ govukButton({ text: "Find address", classes: "govuk-button--secondary" }) }}
```

## Input

```nunjucks
{{ govukInput({
  id: "email",
  name: "email",
  type: "email",
  value: data.email,
  label: { text: "Email address", classes: "govuk-label--m" },
  hint: { text: "We'll use this to contact you" },
  errorMessage: { text: "Enter a valid email" } if errors.email,
  classes: "govuk-input--width-20",
  autocomplete: "email"
}) }}
```

Width classes: `govuk-input--width-2`, `--width-3`, `--width-4`, `--width-5`, `--width-10`,
`--width-20`, `--width-30`.

Prefix/suffix:
```nunjucks
{{ govukInput({
  name: "cost",
  label: { text: "Cost" },
  prefix: { text: "£" },
  suffix: { text: "per month" }
}) }}
```

Input + button (search pattern):
```nunjucks
{{ govukInput({
  id: "search", name: "q",
  label: { text: "Search", classes: "govuk-visually-hidden" },
  formGroup: {
    afterInput: {
      html: '<button type="submit" class="govuk-button" data-module="govuk-button">Search</button>'
    }
  }
}) }}
```

## Textarea

```nunjucks
{{ govukTextarea({
  name: "details",
  label: { text: "Provide details", classes: "govuk-label--m" },
  hint: { text: "Do not include personal info" },
  rows: "5",
  value: data.details
}) }}
```

## Radios

Use for "select one". Legend as page heading for single-question pages.

```nunjucks
{{ govukRadios({
  name: "contact-method",
  fieldset: {
    legend: { text: "How should we contact you?", classes: "govuk-fieldset__legend--m" }
  },
  items: [
    { value: "email", text: "Email" },
    { value: "phone", text: "Phone" },
    {
      value: "text", text: "Text message",
      conditional: {
        html: '<div class="govuk-form-group">
          <label class="govuk-label" for="mobile">Mobile number</label>
          <input class="govuk-input govuk-input--width-20" id="mobile" name="mobile" type="tel">
        </div>'
      }
    }
  ]
}) }}
```

## Checkboxes

Use for "select all that apply". `behaviour: "exclusive"` for a "None of these" option.

```nunjucks
{{ govukCheckboxes({
  name: "waste-types",
  fieldset: { legend: { text: "Which waste types?" } },
  items: [
    { value: "animal", text: "Animal waste" },
    { value: "mines", text: "Mining waste" },
    { value: "none", text: "None of these", behaviour: "exclusive" }
  ]
}) }}
```

## Select (dropdown)

Prefer radios for a small number of options; use select only for long lists.

```nunjucks
{{ govukSelect({
  name: "sort-by",
  label: { text: "Sort by" },
  items: [
    { value: "date", text: "Date", selected: true },
    { value: "name", text: "Name" }
  ]
}) }}
```

## Date input

```nunjucks
{{ govukDateInput({
  id: "dob",
  namePrefix: "dob",
  fieldset: { legend: { text: "Date of birth", classes: "govuk-fieldset__legend--m" } },
  hint: { text: "For example, 27 3 2007" }
}) }}
```
Creates `dob-day`, `dob-month`, `dob-year`.

## Table

```nunjucks
{{ govukTable({
  caption: "Dates and amounts",
  captionClasses: "govuk-table__caption--m",
  head: [ { text: "Date" }, { text: "Amount", format: "numeric" } ],
  rows: [
    [ { text: "1 January" }, { text: "£50", format: "numeric" } ],
    [ { text: "1 February" }, { text: "£75", format: "numeric" } ]
  ]
}) }}
```

## Summary list — the "Check your answers" component

```nunjucks
{{ govukSummaryList({
  rows: [
    {
      key: { text: "Name" },
      value: { text: data.fullName },
      actions: { items: [{ href: "/name", text: "Change", visuallyHiddenText: "name" }] }
    },
    {
      key: { text: "Date of birth" },
      value: { text: data['dob-day'] + "/" + data['dob-month'] + "/" + data['dob-year'] },
      actions: { items: [{ href: "/dob", text: "Change", visuallyHiddenText: "date of birth" }] }
    }
  ]
}) }}
```

With a card wrapper:
```nunjucks
{{ govukSummaryList({
  card: {
    title: { text: "Personal details" },
    actions: { items: [{ href: "/edit", text: "Edit" }] }
  },
  rows: [ ... ]
}) }}
```

## Tag

```nunjucks
{{ govukTag({ text: "Completed", classes: "govuk-tag--green" }) }}
{{ govukTag({ text: "In progress", classes: "govuk-tag--blue" }) }}
{{ govukTag({ text: "Not started", classes: "govuk-tag--grey" }) }}
```
Colours: `--green`, `--grey`, `--blue`, `--orange`, `--red`, `--purple`, `--pink`, `--yellow`,
`--turquoise`.

## Details (expandable)

```nunjucks
{{ govukDetails({
  summaryText: "Help with nationality",
  text: "If you're not sure about your nationality, try looking at your passport."
}) }}
```

## Panel (confirmation page)

```nunjucks
{{ govukPanel({
  titleText: "Application complete",
  html: "Your reference number<br><strong>HDJ2123F</strong>"
}) }}
```

## Notification banner

```nunjucks
{{ govukNotificationBanner({
  type: "success",
  text: "Training outcome recorded and an email sent to the provider."
}) }}
```

## Inset text / Warning text

```nunjucks
{{ govukInsetText({ text: "It can take up to 8 weeks to register a lasting power of attorney." }) }}

{{ govukWarningText({ text: "You can be fined up to £5,000 if you do not register." }) }}
```

## Breadcrumbs / Phase banner

```nunjucks
{{ govukBreadcrumbs({
  items: [ { text: "Home", href: "/" }, { text: "Cases", href: "/cases" }, { text: "Stuart Morrison" } ]
}) }}

{{ govukPhaseBanner({
  tag: { text: "Beta" },
  html: 'This is a new service - your <a class="govuk-link" href="#">feedback</a> will help us improve it.'
}) }}
```

## Pagination / Tabs / Accordion

```nunjucks
{{ govukPagination({
  previous: { href: "/page/1" },
  next: { href: "/page/3" },
  items: [ { number: 1, href: "/page/1" }, { number: 2, current: true }, { number: 3, href: "/page/3" } ]
}) }}

{{ govukTabs({
  id: "case-tabs",
  items: [
    { id: "overview", label: "Overview", panel: { html: "<h2>Overview</h2><p>Content here</p>" } },
    { id: "documents", label: "Documents", panel: { html: "<h2>Documents</h2><p>Content here</p>" } }
  ]
}) }}

{{ govukAccordion({
  id: "accordion-1",
  items: [
    { heading: { text: "Section 1" }, summary: { text: "Summary text" }, content: { html: "<p>Detailed content</p>" } },
    { heading: { text: "Section 2" }, content: { html: "<p>More content</p>" } }
  ]
}) }}
```

## Fieldset (heading pattern)

Use when a single question spans multiple inputs and the legend is the page heading:

```nunjucks
{{ govukFieldset({
  legend: { text: "What is your address?", classes: "govuk-fieldset__legend--l", isPageHeading: true }
}) }}
```

---

## Utility classes

**Spacing:** `govuk-!-margin-bottom-0`…`9`, `govuk-!-margin-top-0`…`9`, `govuk-!-padding-4`,
`govuk-!-margin-left-2`, `govuk-!-margin-right-2`.

**Typography:** `govuk-heading-xl|l|m|s`, `govuk-body`, `govuk-body-s`, `govuk-body-l`,
`govuk-!-font-weight-bold|regular`, `govuk-!-font-size-16|19|24|27|36|48`.

**Grid:** `govuk-grid-row` (container); columns `-full`, `-one-half`, `-one-third`,
`-two-thirds`, `-one-quarter`, `-three-quarters`.

**Display:** `govuk-!-display-none`, `govuk-!-display-inline-block`, `govuk-visually-hidden`.

**Section break:**
```nunjucks
<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
```
