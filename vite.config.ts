import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { config } from './src/config.ts'
import { paletteCss, palettes } from './src/lib/palettes.ts'
import { sized, srcSet } from './src/lib/site.ts'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Writes the config-driven <head> at build time so crawlers and link previews
// see it without running JS, and the palette is set before first paint.
function siteHead(): Plugin {
  const p = palettes[config.palette]
  const title = `${config.businessName}: ${config.vendorType} in ${config.city} | Demo preview`
  const initial = config.businessName.trim().charAt(0).toUpperCase()
  const favicon =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${p.deep}"/>` +
    `<text x="32" y="46" font-family="Georgia,serif" font-size="42" text-anchor="middle" fill="${p.paper}">${esc(initial)}</text></svg>`
  const hero = config.heroImages[0]
  return {
    name: 'site-head',
    transformIndexHtml: (html) =>
      html
        .replace('<html lang="en">', `<html lang="en" data-palette="${config.palette}">`)
        .replace(
          '<!-- site-head -->',
          [
            `<title>${esc(title)}</title>`,
            `<meta name="description" content="${esc(config.copy.metaDescription)}" />`,
            `<meta name="theme-color" content="${p.paper}" />`,
            `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(favicon)}" />`,
            `<meta property="og:type" content="website" />`,
            `<meta property="og:title" content="${esc(config.businessName)}" />`,
            `<meta property="og:description" content="${esc(config.tagline)}" />`,
            `<meta property="og:image" content="${esc(sized(hero, 1200))}" />`,
            `<meta name="twitter:card" content="summary_large_image" />`,
            `<link rel="preconnect" href="https://images.unsplash.com" />`,
            `<link rel="preload" as="image" href="${esc(sized(hero, 1200))}" imagesrcset="${esc(srcSet(hero))}" imagesizes="100vw" fetchpriority="high" />`,
            `<style>${paletteCss()}</style>`,
          ].join('\n    '),
        ),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteHead()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
