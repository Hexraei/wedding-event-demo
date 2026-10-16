import { Menu } from 'lucide-react'
import { config } from '@/config'
import { waLink } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#packages', label: 'Packages' },
  { href: '#faq', label: 'FAQ' },
]

export function Nav({ onBook }: { onBook: () => void }) {
  return (
    <header className="surface-paper sticky top-0 z-40 border-b border-border">
      <div className="wrap flex h-16 items-center justify-between lg:pr-0">
        <a href="#top" className="flex h-11 items-center font-display text-2xl tracking-tight">
          {config.businessName}
        </a>

        <nav aria-label="Sections" className="hidden h-full items-center lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="flex h-full items-center px-5 text-[0.9375rem] hover:underline hover:underline-offset-4">
              {l.label}
            </a>
          ))}
          <a href={`tel:${config.phone.replace(/\s/g, '')}`} className="flex h-full items-center border-l border-border px-6 text-[0.9375rem] tabular-nums">
            {config.phone}
          </a>
          <a
            href="#book"
            onClick={(e) => { e.preventDefault(); onBook() }}
            className="surface-deep flex h-full items-center px-10 text-[0.9375rem] font-medium transition-colors hover:bg-ink"
          >
            Book a date
          </a>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-mr-3 lg:hidden" aria-label="Open menu">
              <Menu className="size-6" strokeWidth={1.5} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="surface-paper bg-background text-foreground w-full gap-0 border-l p-0 sm:max-w-sm">
            <SheetTitle className="flex h-16 items-center border-b border-border px-4 font-display text-2xl font-normal">
              {config.businessName}
            </SheetTitle>
            <nav aria-label="Sections" className="flex flex-col">
              {links.map((l) => (
                <SheetClose asChild key={l.href}>
                  <a href={l.href} className="border-b border-border px-4 py-5 font-display text-3xl">
                    {l.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto grid gap-3 p-4">
              <SheetClose asChild>
                <Button size="lg" onClick={onBook}>Check availability</Button>
              </SheetClose>
              <Button size="lg" variant="outline" asChild>
                <a href={waLink(config.whatsappNumber, config.whatsappMessage)} target="_blank" rel="noopener">
                  WhatsApp us
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
