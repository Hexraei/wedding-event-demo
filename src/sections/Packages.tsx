import { config } from '@/config'
import { formatINR } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function Packages({ onBook }: { onBook: (note: string) => void }) {
  return (
    <section id="packages" className="surface-paper section-y">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <h2 className="col-span-full text-h2 md:col-span-7">{config.copy.packages}</h2>
          <p className="col-span-full max-w-[40ch] text-lg text-muted-foreground md:col-span-4 md:col-start-9">
            {config.copy.packagesNote}
          </p>
        </div>

        <ul className="mt-12 grid border-y border-border md:mt-20 md:grid-cols-3">
          {config.packages.map((p) => (
            <li
              key={p.name}
              className={cn(
                'flex flex-col border-b border-border px-0 py-10 last:border-b-0 md:border-b-0 md:border-l md:px-8 md:py-12 md:first:border-l-0 lg:px-10',
                p.featured && 'surface-deep -mx-4 border-b-0 px-4 md:mx-0',
              )}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-h3">{p.name}</h3>
                {p.featured && <p className="text-[0.9375rem] text-muted-foreground">Most booked</p>}
              </div>
              <p className="mt-10 text-[0.9375rem] text-muted-foreground">from</p>
              <p className="font-display text-[clamp(2.5rem,3.6vw,3.5rem)] leading-none tracking-[-0.03em] tabular-nums">
                {formatINR(p.fromPrice)}
              </p>
              <ul className="mt-10 mb-10 border-t border-border">
                {p.inclusions.map((item) => (
                  <li key={item} className="border-b border-border py-3.5">
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                variant={p.featured ? 'default' : 'outline'}
                className={cn('mt-auto w-full', !p.featured && 'border-foreground bg-transparent hover:bg-foreground hover:text-background')}
                onClick={() => onBook(`Interested in the ${p.name} package.`)}
              >
                Ask about {p.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
