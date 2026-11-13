//
// Builds the static version of this prototype into dist/, for GitHub
// Pages. Run with `npm run build`. See README.md.
//
// 1. Collects every template the app needs into one JSON file: the app's
//    views, GOV.UK Frontend's templates, and a static stand-in for the
//    kit's layout with the Frontend macros imported, as the kit does.
// 2. Bundles static/main.js, which runs app/routes.js in the browser.
// 3. Compiles the CSS with the kit's own Sass pipeline.
// 4. Copies GOV.UK Frontend's fonts and images, and writes the page shell.
//

const fs = require('fs')
const path = require('path')
const esbuild = require('esbuild')

const root = path.join(__dirname, '..')
const dist = path.join(root, 'dist')
const tmp = path.join(root, '.tmp', 'static')
const frontend = path.join(root, 'node_modules', 'govuk-frontend')

function walk (dir, extensions) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full, extensions)
    return extensions.includes(path.extname(entry.name)) ? [full] : []
  })
}

function toKey (base, file) {
  return path.relative(base, file).split(path.sep).join('/')
}

// --- 1. Templates -------------------------------------------------------

const templates = {}

const viewsDir = path.join(root, 'app', 'views')
walk(viewsDir, ['.html', '.njk']).forEach(file => {
  templates[toKey(viewsDir, file)] = fs.readFileSync(file, 'utf8')
})

const govukDir = path.join(frontend, 'dist')
walk(path.join(govukDir, 'govuk'), ['.njk']).forEach(file => {
  templates[toKey(govukDir, file)] = fs.readFileSync(file, 'utf8')
})

const frontendConfig = require(path.join(frontend, 'govuk-prototype-kit.config.json'))
const macroImports = frontendConfig.nunjucksMacros
  .map(({ importFrom, macroName }) => `{% from "${importFrom}" import ${macroName} %}`)
  .join('\n')
templates['govuk-prototype-kit/layouts/govuk-branded.njk'] =
  macroImports + '\n\n' + fs.readFileSync(path.join(__dirname, 'layout.njk'), 'utf8')

templates['__config.json'] = require(path.join(root, 'app', 'config.json'))

fs.mkdirSync(tmp, { recursive: true })
fs.writeFileSync(path.join(tmp, 'templates.json'), JSON.stringify(templates))

// --- 2. Bundle ----------------------------------------------------------

fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(dist, { recursive: true })

esbuild.buildSync({
  entryPoints: [path.join(__dirname, 'main.js')],
  outfile: path.join(dist, 'app.js'),
  bundle: true,
  minify: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  alias: { 'govuk-prototype-kit': path.join(__dirname, 'kit-shim.js') },
  logLevel: 'warning'
})

// --- 3. CSS -------------------------------------------------------------

// The kit's build writes .tmp/public/stylesheets/application.css from
// app/assets/sass, with GOV.UK Frontend's assets under /plugin-assets.
process.chdir(root)
require('govuk-prototype-kit/lib/build').generateAssetsSync()
const css = fs.readFileSync(path.join(root, '.tmp', 'public', 'stylesheets', 'application.css'), 'utf8')
  .split('/plugin-assets/govuk-frontend/dist/govuk/assets/').join('assets/')
fs.writeFileSync(path.join(dist, 'application.css'), css)

// --- 4. Assets and page shell -------------------------------------------

fs.cpSync(path.join(frontend, 'dist', 'govuk', 'assets'), path.join(dist, 'assets'), { recursive: true })

fs.writeFileSync(path.join(dist, 'index.html'), `<!DOCTYPE html>
<html lang="en" class="govuk-template">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="robots" content="noindex, nofollow">
  <title>Drivers Medical secure messages - prototype</title>
  <link rel="icon" sizes="48x48" href="assets/images/favicon.ico">
  <link rel="stylesheet" href="application.css">
</head>
<body class="govuk-template__body">
  <noscript><p>This prototype needs JavaScript. It is a fictional prototype, not a real DVLA or GOV.UK service.</p></noscript>
  <script src="app.js"></script>
</body>
</html>
`)

console.log('Built static prototype into ' + path.relative(process.cwd(), dist))
