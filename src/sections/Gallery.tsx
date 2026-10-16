import { useState } from 'react'
import { m } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { config, type GalleryImage } from '@/config'
import { sized, srcSet } from '@/lib/site'
import { Img } from '@/components/Img'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ALL = 'All'
const ratios = { portrait: '4 / 5', landscape: '3 / 2', square: '1 / 1' } as const
const categories = [ALL, ...new Set(config.galleryImages.map((g) => g.category))]

function Masonry({ images, onOpen }: { images: GalleryImage[]; onOpen: (i: number) => void }) {
  return (
    <div className="columns-2 gap-3 md:columns-3 md:gap-6">
      {images.map((img, i) => (
        <m.figure
          key={img.url}
          className="mb-3 break-inside-avoid md:mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: (i % 3) * 0.08 }}
        >
          <button
            type="button"
            onClick={() => onOpen(i)}
            className="block w-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-paper"
            aria-label={`Open photo: ${img.alt}`}
          >
            <Img
              src={img.url}
              alt={img.alt}
              ratio={ratios[img.ratio]}
              color={img.color}
              sizes="(min-width: 1440px) 450px, (min-width: 768px) 32vw, 50vw"
              imgClassName="transition-transform duration-700 hover:scale-[1.03]"
            />
          </button>
        </m.figure>
      ))}
    </div>
  )
}

export function Gallery() {
  const [category, setCategory] = useState(ALL)
  const [open, setOpen] = useState<number | null>(null)
  const images = category === ALL ? config.galleryImages : config.galleryImages.filter((g) => g.category === category)
  const current = open === null ? null : images[open]
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length))

  return (
    <section id="work" className="surface-ink section-y">
      <Tabs value={category} onValueChange={setCategory} className="wrap gap-0">
        <div className="grid-12 items-end gap-y-8">
          <h2 className="col-span-full text-h2 md:col-span-6">{config.copy.gallery}</h2>
          <div className="col-span-full -mx-4 overflow-x-auto px-4 md:col-span-6 md:mx-0 md:px-0">
            <TabsList variant="line" aria-label="Filter photos" className="h-auto gap-0 p-0 md:ml-auto md:flex">
              {categories.map((c) => (
                <TabsTrigger
                  key={c}
                  value={c}
                  className="h-11 flex-none rounded-none border-0 px-2 text-[0.9375rem] font-normal text-paper/70 first:-ml-2 not-last:mr-2 hover:text-paper data-active:text-paper group-data-horizontal/tabs:after:bottom-0 after:bg-paper"
                >
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
        {categories.map((c) => (
          <TabsContent key={c} value={c} className="mt-10 md:mt-16">
            <Masonry images={images} onOpen={setOpen} />
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={current !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent
          showCloseButton={false}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') step(1)
            if (e.key === 'ArrowLeft') step(-1)
          }}
          className="surface-ink bg-background text-foreground top-0 left-0 grid h-svh w-screen max-w-none translate-x-0 translate-y-0 grid-rows-[auto_1fr_auto] gap-0 rounded-none p-0 ring-0 sm:max-w-none"
        >
          {current && open !== null && (
            <>
              <div className="flex h-16 items-center justify-between px-4 md:px-8">
                <p className="tabular-nums text-paper/80" aria-live="polite">
                  {open + 1} / {images.length}
                </p>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="-mr-3 text-paper hover:bg-paper/10 hover:text-paper" aria-label="Close">
                    <X className="size-6" strokeWidth={1.5} />
                  </Button>
                </DialogClose>
              </div>
              <div className="relative min-h-0 px-4 md:px-24">
                <img
                  key={current.url}
                  src={sized(current.url, 1600)}
                  srcSet={srcSet(current.url)}
                  sizes="100vw"
                  alt={current.alt}
                  className="size-full object-contain"
                />
                <Button variant="ghost" size="icon" onClick={() => step(-1)} aria-label="Previous photo" className="absolute top-1/2 left-4 hidden -translate-y-1/2 text-paper hover:bg-paper/10 hover:text-paper md:inline-flex">
                  <ArrowLeft className="size-6" strokeWidth={1.25} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => step(1)} aria-label="Next photo" className="absolute top-1/2 right-4 hidden -translate-y-1/2 text-paper hover:bg-paper/10 hover:text-paper md:inline-flex">
                  <ArrowRight className="size-6" strokeWidth={1.25} />
                </Button>
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-6">
                <div>
                  <DialogTitle className="font-sans text-base font-normal text-paper">{current.alt}</DialogTitle>
                  <DialogDescription className="text-paper/70">{current.category}</DialogDescription>
                </div>
                <div className="flex shrink-0 md:hidden">
                  <Button variant="ghost" size="icon" onClick={() => step(-1)} aria-label="Previous photo" className="text-paper hover:bg-paper/10 hover:text-paper">
                    <ArrowLeft className="size-6" strokeWidth={1.25} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => step(1)} aria-label="Next photo" className="-mr-3 text-paper hover:bg-paper/10 hover:text-paper">
                    <ArrowRight className="size-6" strokeWidth={1.25} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
