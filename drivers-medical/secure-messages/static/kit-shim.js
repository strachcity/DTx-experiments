//
// Stands in for the parts of govuk-prototype-kit that routes.js and
// filters.js use, so the same files run in the browser on GitHub Pages.
// The build aliases require('govuk-prototype-kit') to this file.
//
// Only what this prototype uses is implemented: router.use, router.get,
// router.post with :params, and views.addFilter.
//

const filters = {}
const layers = []

function toMatcher (path) {
  if (!path) return () => ({})
  const keys = []
  const pattern = new RegExp('^' + path.replace(/:([A-Za-z]+)/g, (_, key) => {
    keys.push(key)
    return '([^/]+)'
  }) + '/?$')
  return requestPath => {
    const match = pattern.exec(requestPath)
    if (!match) return null
    return Object.fromEntries(keys.map((key, i) => [key, decodeURIComponent(match[i + 1])]))
  }
}

function add (method, path, handlers) {
  layers.push({ method, match: toMatcher(path), handlers })
}

const router = {
  use: (...handlers) => add(null, null, handlers),
  get: (path, ...handlers) => add('GET', path, handlers),
  post: (path, ...handlers) => add('POST', path, handlers)
}

module.exports = {
  requests: { setupRouter: () => router },
  views: { addFilter: (name, fn) => { filters[name] = fn } },
  // Used by the browser app, not by routes.js.
  _layers: layers,
  _filters: filters
}
