import { config } from '@/config'
import { icons } from '@/lib/icons'
import { GridLines } from '@/components/GridLines'
import { Img } from '@/components/Img'

export function Services() {
  const [lead, ...rest] = config.services
  const LeadIcon = icons[lead.icon]
  return (
    <section id="services" className="surface-paper section-y relative">
      <GridLines />
      <div className="wrap grid-12 relative gap-y-12">
        <h2 className="col-span-full text-h2 md:col-span-5 md:col-start-8 md:row-start-1">{config.copy.services}</h2>

        <article className="col-span-full md:col-span-7 md:row-span-2 md:row-start-1">
          {lead.image && (
            <Img src={lead.image} alt="" ratio="4 / 3" color="var(--deep)" sizes="(min-width: 768px) 58vw, 100vw" />
          )}
          <div className="mt-6 flex items-start gap-4 md:mt-8">
            <LeadIcon aria-hidden className="mt-2 size-6 shrink-0" strokeWidth={1.25} />
            <div>
              <h3 className="text-[clamp(2rem,3.4vw,3.25rem)] leading-none tracking-[-0.03em]">{lead.title}</h3>
              <p className="mt-3 max-w-[46ch] text-lg text-muted-foreground">{lead.description}</p>
            </div>
          </div>
        </article>

        <ul className="col-span-full self-end border-t border-border md:col-span-5 md:col-start-8 md:row-start-2">
          {rest.map((s) => {
            const Icon = icons[s.icon]
            return (
              <li key={s.title} className="flex items-start gap-4 border-b border-border py-6 md:py-7">
                <Icon aria-hidden className="mt-1.5 size-5 shrink-0" strokeWidth={1.25} />
                <div>
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
