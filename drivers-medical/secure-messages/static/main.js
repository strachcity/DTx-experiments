//
// Secure messages in the browser, for GitHub Pages.
//
// The kit app is the spec. This file runs the same app/routes.js,
// app/filters.js, session data defaults and Nunjucks templates in the
// browser, and does the few things the kit's Express server would
// otherwise do: store form data in the session, match routes, render
// templates and follow redirects.
//
// Routes live in the URL hash (#/messages), so links work on any Pages
// subpath and can be opened in a new tab. State is in memory, like the
// kit's session, and is lost on reload, like every other prototype in
// this repo.
//

const nunjucks = require('nunjucks/browser/nunjucks.js')
const { initAll } = require('govuk-frontend')
const kit = require('./kit-shim.js')
const templates = require('../.tmp/static/templates.json')
const defaults = require('../app/data/session-data-defaults.js')

// Registers filters and routes with the shim.
require('../app/filters.js')
require('../app/routes.js')

// --- Templates ----------------------------------------------------------

const Loader = nunjucks.Loader.extend({
  getSource (name) {
    const key = name.replace(/^\//, '')
    const src = templates[key] ?? templates[key + '.html']
    if (src === undefined) throw new Error('Template not found: ' + name)
    return { src, path: key, noCache: false }
  },
  resolve (from, to) {
    const parts = from.split('/')
    parts.pop()
    to.split('/').forEach(segment => {
      if (segment === '..') parts.pop()
      else if (segment !== '.') parts.push(segment)
    })
    return parts.join('/')
  }
})

const env = new nunjucks.Environment(new Loader(), { autoescape: true })
Object.entries(kit._filters).forEach(([name, fn]) => env.addFilter(name, fn))

// What the kit sets as app.locals.
const appLocals = {
  serviceName: templates['__config.json'].serviceName,
  serviceUrl: '/',
  assetPath: 'assets'
}

// --- Session, as the kit's autoStoreData does it ------------------------

const session = { data: {} }

// Copied from govuk-prototype-kit lib/session.js, so form data is stored
// exactly as it is on the server.
function storeData (input, data) {
  for (const i in input) {
    if (i.indexOf('_') === 0) continue
    let val = input[i]
    if (val === '_unchecked') {
      delete data[i]
      continue
    }
    if (Array.isArray(val)) {
      val = val.filter(item => item !== '_unchecked')
    } else if (typeof val === 'object') {
      if (typeof data[i] !== 'object') data[i] = {}
      storeData(val, data[i])
      continue
    }
    data[i] = val
  }
}

// "reply[hypoDate][day]=27" to { reply: { hypoDate: { day: '27' } } },
// as Express's extended URL-encoded parser does.
function parseNested (entries) {
  const result = {}
  for (const [name, value] of entries) {
    const keys = name.replace(/\]/g, '').split('[')
    let target = result
    keys.forEach((key, i) => {
      if (i === keys.length - 1) {
        if (key in target) target[key] = [].concat(target[key], value)
        else target[key] = value
      } else {
        if (typeof target[key] !== 'object') target[key] = {}
        target = target[key]
      }
    })
  }
  return result
}

// --- Requests -----------------------------------------------------------

function handle (method, url, bodyEntries) {
  const parsed = new URL(url, 'https://prototype.invalid')
  const body = parseNested(bodyEntries || [])
  const query = parseNested(parsed.searchParams.entries())

  session.data = Object.assign({}, defaults, session.data)
  storeData(body, session.data)
  storeData(query, session.data)

  const req = {
    method,
    path: parsed.pathname,
    originalUrl: parsed.pathname + parsed.search,
    query,
    body,
    params: {},
    session
  }

  let done = false
  const res = {
    locals: { data: { ...session.data } },
    render (view, locals) {
      done = true
      show(env.render(view.endsWith('.html') ? view : view + '.html', { ...appLocals, ...res.locals, ...locals }), req.originalUrl)
    },
    redirect (to) {
      done = true
      go(to)
    }
  }

  const layers = kit._layers
  let index = 0

  function nextLayer () {
    while (!done && index < layers.length) {
      const layer = layers[index++]
      if (layer.method && layer.method !== method) continue
      const params = layer.match(req.path)
      if (!params) continue
      req.params = params
      return runHandlers(layer.handlers, 0)
    }
    if (!done) notFound(req.originalUrl)
  }

  function runHandlers (handlers, i) {
    if (done) return
    if (i >= handlers.length) return nextLayer()
    handlers[i](req, res, () => runHandlers(handlers, i + 1))
  }

  try {
    nextLayer()
  } catch (error) {
    showError(error)
  }
}

function notFound (url) {
  const html = env.renderString(
    '{% extends "layouts/main.html" %}{% set pageName = "Page not found" %}' +
    '{% block content %}<h1 class="govuk-heading-l">Page not found</h1>' +
    '<p class="govuk-body">There is no screen at {{ url }} in this prototype.</p>' +
    '<p class="govuk-body"><a class="govuk-link" href="/">Go to all screens</a></p>{% endblock %}',
    { ...appLocals, data: session.data, showNotes: session.data.notes === 'on', currentPath: url, url }
  )
  show(html, url)
}

function showError (error) {
  console.error(error)
  document.body.innerHTML = '<main class="govuk-width-container govuk-main-wrapper"><h1 class="govuk-heading-l">Something went wrong in the prototype</h1>' +
    '<pre class="govuk-body-s">' + String(error && error.message).replace(/</g, '&lt;') + '</pre>' +
    '<p class="govuk-body"><a class="govuk-link" href="#/">Go to all screens</a></p></main>'
}

// --- Navigation and display ---------------------------------------------

function currentUrl () {
  return decodeURI(location.hash.slice(1)) || '/'
}

function go (url) {
  if (currentUrl() === url) handle('GET', url)
  else location.hash = url
}

// Swaps in the rendered page and turns root-relative links into hash
// links, so they work under any Pages path.
function show (html, url) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  document.title = doc.title
  document.documentElement.className = doc.documentElement.className
  document.body.className = doc.body.className + ' js-enabled govuk-frontend-supported'
  document.body.innerHTML = doc.body.innerHTML
  document.body.querySelectorAll('script').forEach(script => script.remove())

  document.querySelectorAll('a[href^="/"]:not([href^="//"])').forEach(link => {
    link.setAttribute('href', '#' + link.getAttribute('href'))
  })
  document.querySelectorAll('form').forEach(form => {
    form.dataset.action = form.getAttribute('action') || url
  })

  window.scrollTo(0, 0)
  initAll()
  const heading = document.querySelector('.govuk-error-summary') ? null : document.querySelector('h1')
  if (heading) {
    heading.setAttribute('tabindex', '-1')
    heading.focus({ preventScroll: true })
  }
}

document.addEventListener('submit', event => {
  const form = event.target
  if ((form.getAttribute('method') || '').toLowerCase() !== 'post') return
  event.preventDefault()
  handle('POST', form.dataset.action, Array.from(new FormData(form).entries()))
})

window.addEventListener('hashchange', () => handle('GET', currentUrl()))
handle('GET', currentUrl())
