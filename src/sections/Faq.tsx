import { config } from '@/config'
import { GridLines } from '@/components/GridLines'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function Faq() {
  return (
    <section id="faq" className="surface-paper section-y relative">
      <GridLines />
      <div className="wrap grid-12 relative gap-y-10">
        <h2 className="col-span-full text-h2 md:col-span-4">{config.copy.faq}</h2>
        <Accordion type="single" collapsible className="col-span-full border-t border-border md:col-span-7 md:col-start-6">
          {config.faq.map((f) => (
            <AccordionItem key={f.question} value={f.question} className="border-b border-border">
              <AccordionTrigger className="items-center rounded-none py-6 font-display text-[clamp(1.375rem,2vw,1.75rem)] leading-tight font-normal tracking-[-0.015em] hover:no-underline focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-4 **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-foreground">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-[56ch] pb-8 text-base text-muted-foreground md:text-lg">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
