import { lazy, Suspense } from 'react'
import { config } from '@/config'
import { waLink } from '@/lib/site'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

// The form (react-hook-form, calendar, select) loads after first paint.
const BookingForm = lazy(() => import('./BookingForm'))

const placeholder = <div className="min-h-[38rem] sm:min-h-[30rem]" aria-busy="true" />

export function Booking() {
  return (
    <section id="book" className="surface-deep section-y">
      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-full md:col-span-5">
          <h2 className="text-h2">{config.copy.booking}</h2>
          <p className="mt-6 max-w-[36ch] text-lg text-muted-foreground">{config.copy.bookingNote}</p>
          <dl className="mt-12 grid gap-6 border-t border-border pt-8 md:mt-16">
            <div>
              <dt className="text-[0.9375rem] text-muted-foreground">Call</dt>
              <dd>
                <a href={`tel:${config.phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center font-display text-3xl tabular-nums hover:underline hover:underline-offset-4">
                  {config.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.9375rem] text-muted-foreground">Or message directly</dt>
              <dd>
                <a href={waLink(config.whatsappNumber, config.whatsappMessage)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-display text-3xl hover:underline hover:underline-offset-4">
                  WhatsApp
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="col-span-full md:col-span-7 lg:col-span-6 lg:col-start-7">
          <Suspense fallback={placeholder}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export function BookingDialog({ open, note, onOpenChange }: { open: boolean; note: string; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="surface-paper max-h-[calc(100svh-2rem)] gap-0 overflow-y-auto rounded-none p-6 ring-0 sm:max-w-2xl md:p-10">
        <DialogTitle className="pr-10 text-h3 font-display font-normal">{config.copy.booking}</DialogTitle>
        <DialogDescription className="mt-2 mb-8 text-base text-muted-foreground">{config.copy.bookingNote}</DialogDescription>
        <Suspense fallback={placeholder}>
          {/* key resets the form when opened from a different package */}
          <BookingForm key={note} defaultNote={note} />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
