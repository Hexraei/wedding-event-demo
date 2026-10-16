import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { config } from '@/config'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const total = config.testimonials.length
  const control = 'border-current bg-transparent text-current hover:bg-on-bright hover:text-bright'

  return (
    <section aria-labelledby="testimonials-title" className="surface-bright section-y">
      <div className="wrap grid-12 gap-y-10">
        <h2 id="testimonials-title" className="col-span-full text-h3 md:col-span-3 md:row-start-1">{config.copy.testimonials}</h2>

        <Carousel setApi={setApi} opts={{ loop: true }} className="col-span-full -ml-4 md:col-span-9 md:col-start-4 md:row-span-2 md:row-start-1 md:-ml-6" aria-label="Testimonials">
          <CarouselContent>
            {config.testimonials.map((t) => (
              <CarouselItem key={t.name}>
                {/* Inset so italic swashes are not clipped by the carousel viewport. */}
                <figure className="pl-4 md:pl-6">
                  <blockquote className="font-display text-[clamp(2rem,4.8vw,4.5rem)] leading-[1.06] font-light tracking-[-0.025em] text-balance italic">
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption className="mt-10 font-display text-2xl leading-tight">
                    {t.name}
                    <span className="block italic">{t.eventType}</span>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="col-span-full flex items-center gap-4 md:col-span-3 md:row-start-2 md:self-end">
          <p className="mr-auto font-display text-2xl whitespace-nowrap tabular-nums md:mr-0" aria-live="polite">
            {index + 1} / {total}
          </p>
          <Button variant="outline" size="icon" className={control} onClick={() => api?.scrollPrev()} aria-label="Previous testimonial">
            <ArrowLeft className="size-5" strokeWidth={1.5} />
          </Button>
          <Button variant="outline" size="icon" className={control} onClick={() => api?.scrollNext()} aria-label="Next testimonial">
            <ArrowRight className="size-5" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </section>
  )
}
