import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { config } from '@/config'
import { waLink } from '@/lib/site'
import { cn } from '@/lib/utils'

const year = new Date().getFullYear()

export function Footer() {
  const contacts = [
    { label: 'Studio', value: `${config.area}, ${config.city}` },
    { label: 'Phone', value: config.phone, href: `tel:${config.phone.replace(/\s/g, '')}` },
    config.email && { label: 'Email', value: config.email, href: `mailto:${config.email}` },
    config.instagramUrl && { label: 'Instagram', value: 'Follow our work', href: config.instagramUrl },
  ].filter((c) => !!c)

  return (
    <footer className="surface-ink pt-20 pb-28 md:pt-32 lg:pb-12">
      <div className="wrap grid-12 gap-y-10">
        <p className="col-span-full font-display text-h2">{config.businessName}</p>
        <dl className="col-span-full grid gap-6 border-t border-border pt-8 sm:grid-cols-2 md:col-span-12 md:grid-cols-4">
          {contacts.map((c) => (
            <div key={c.label}>
              <dt className="text-[0.9375rem] text-muted-foreground">{c.label}</dt>
              <dd className="text-lg">
                {c.href ? (
                  <a href={c.href} className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:underline" {...(c.href.startsWith('http') && { target: '_blank', rel: 'noopener' })}>
                    {c.value}
                  </a>
                ) : (
                  c.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="col-span-full text-[0.9375rem] text-muted-foreground">
          © {year} {config.businessName}
        </p>
      </div>
    </footer>
  )
}

/** Mobile-only floating WhatsApp shortcut. Hidden over the hero, which has its own. */
export function WhatsAppFab() {
  const [overHero, setOverHero] = useState(true)
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setOverHero(e.intersectionRatio > 0.35), { threshold: [0, 0.35, 1] })
    io.observe(hero)
    return () => io.disconnect()
  }, [])
  return (
    <a
      href={waLink(config.whatsappNumber, config.whatsappMessage)}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      aria-hidden={overHero}
      tabIndex={overHero ? -1 : undefined}
      className={cn(
        'fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-[4px] bg-whatsapp text-ink transition-opacity duration-300 lg:hidden',
        overHero && 'pointer-events-none opacity-0',
      )}
    >
      <MessageCircle className="size-7" strokeWidth={1.75} />
    </a>
  )
}
