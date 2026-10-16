// Preset palettes. Each section picks a role, never a raw hex, so swapping
// config.palette re-skins the whole page.
//   deep   rich dark brand colour (stats, booking, featured package)
//   bright loud accent block (testimonials)
//   paper  light ground (services, packages, faq)
//   ink    near-black (gallery, footer, body text)
//   onBright text colour that reads on `bright`
export const palettes = {
  marigold: { deep: '#5B1A18', bright: '#F2A900', paper: '#FBF3E4', ink: '#1E1412', onBright: '#1E1412' },
  jasmine: { deep: '#1F3D2B', bright: '#C8745A', paper: '#F7F2E7', ink: '#17201B', onBright: '#17201B' },
  temple: { deep: '#0F4C4A', bright: '#B5472B', paper: '#EBD9BF', ink: '#1B1411', onBright: '#EBD9BF' },
  'ink-gold': { deep: '#6B1E23', bright: '#C9A24B', paper: '#F1ECE2', ink: '#121110', onBright: '#121110' },
} as const

export type PaletteName = keyof typeof palettes

/** CSS custom properties for every palette, keyed by html[data-palette]. */
export function paletteCss(): string {
  return Object.entries(palettes)
    .map(([name, p]) => {
      const vars = Object.entries(p)
        .map(([role, hex]) => `--${role.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())}:${hex}`)
        .join(';')
      return `html[data-palette="${name}"]{${vars}}`
    })
    .join('')
}
