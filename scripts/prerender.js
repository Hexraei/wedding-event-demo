// Renders the page to static HTML after `vite build`, so the first paint
// needs no JavaScript, and inlines the CSS to drop a render-blocking request.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const { render } = await import(pathToFileURL('dist-ssr/entry-server.js').href)
let html = readFileSync('dist/index.html', 'utf8')

if (!html.includes('<div id="root"></div>')) throw new Error('root element not found in dist/index.html')
html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`)

html = html.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = readFileSync(`dist${href}`, 'utf8')
  return `<style>${css}</style>`
})

// Start the app after the window load event: the prerendered page is already
// complete, so the hero photo and fonts get the bandwidth first.
html = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, (_, src) =>
  `<script type="module">addEventListener('load', () => import('${src}'), { once: true })</script>`,
)
if (html.includes('<script type="module" crossorigin')) throw new Error('entry script tag not rewritten')

writeFileSync('dist/index.html', html)
rmSync('dist-ssr', { recursive: true, force: true })
console.log('prerendered dist/index.html')
