import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { config } from '@/config'
import { srcSet, waLink } from '@/lib/site'
import { useMediaQuery, useReducedMotion } from '@/lib/hooks'
import { Img } from '@/components/Img'
import { Button } from '@/components/ui/button'

const SLIDE_MS = 6500

export function Hero({ onBook }: { onBook: () => void }) {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion()
  // Phones and reduced-motion users get the first photo only, and never
  // download the other two.
  const cycle = desktop && !reduced
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!cycle) return
    // Warm the cache so each crossfade lands on a loaded photo.
    for (const url of config.heroImages.slice(1)) {
      const img = new Image()
      img.sizes = '100vw'
      img.srcset = srcSet(url)
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % config.heroImages.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [cycle])

  const shown = cycle ? index : 0

  return (
    <section id="top" className="surface-ink relative isolate flex h-[calc(100svh-4rem)] min-h-[34rem] max-h-[64rem] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <m.div
            key={shown}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          >
            <Img
              src={config.heroImages[shown]}
              alt=""
              priority={shown === 0}
              className="size-full"
            />
          </m.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-ink/45" />
      </div>

      <div className="wrap grid-12 pb-8 md:pb-12">
        <h1 className="col-span-full text-display text-paper">{config.businessName}</h1>
        <p className="col-span-full mt-6 max-w-[34ch] text-lg leading-snug text-paper md:col-span-6 md:mt-10 md:text-xl">
          {config.tagline}
        </p>
        <div className="col-span-full mt-8 flex flex-col gap-3 sm:flex-row md:col-span-6 md:mt-10 md:items-end md:justify-end">
          {/* A real link, so it scrolls to the form before the page has hydrated. */}
          <Button size="lg" asChild className="bg-paper text-ink hover:bg-bright hover:text-on-bright">
            <a href="#book" onClick={(e) => { e.preventDefault(); onBook() }}>
              Check availability
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-paper/70 bg-transparent text-paper hover:bg-paper hover:text-ink">
            <a href={waLink(config.whatsappNumber, config.whatsappMessage)} target="_blank" rel="noopener">
              WhatsApp us
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
