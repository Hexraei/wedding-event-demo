// Pure helpers shared by the page and vite.config.ts. No DOM, no aliases,
// so `node --test` can import this file directly.

export function waLink(number: string, text: string): string {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}

export type BookingFields = {
  name: string
  phone: string
  eventType: string
  eventDate: string
  venue: string
  guests: string
  note: string
}

const labels: Record<keyof BookingFields, string> = {
  name: 'Name',
  phone: 'Phone',
  eventType: 'Event',
  eventDate: 'Date',
  venue: 'City / venue',
  guests: 'Guests',
  note: 'Note',
}

/** Greeting followed by one labelled line per form field, blanks included. */
export function bookingMessage(greeting: string, fields: BookingFields): string {
  const lines = (Object.keys(labels) as (keyof BookingFields)[]).map(
    (key) => `${labels[key]}: ${fields[key].trim() || (key === 'note' ? 'None' : 'Not decided yet')}`,
  )
  return [greeting, '', ...lines].join('\n')
}

/** 10-digit Indian mobile, optionally prefixed with +91 / 91 / 0. */
export function isIndianMobile(value: string): boolean {
  const digits = value.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '')
  return /^[6-9]\d{9}$/.test(digits)
}

export function formatINR(amount: number): string {
  return 'INR ' + new Intl.NumberFormat('en-IN').format(amount)
}

/** Same Unsplash image at a given width (quality 60). Other URLs pass through. */
export function sized(url: string, width: number): string {
  try {
    const u = new URL(url)
    if (!u.hostname.endsWith('unsplash.com')) return url
    u.searchParams.set('w', String(width))
    u.searchParams.set('q', '60')
    return u.toString()
  } catch {
    return url
  }
}

export function srcSet(url: string, widths = [320, 480, 640, 800, 1080, 1440, 1920]): string {
  return widths.map((w) => `${sized(url, w)} ${w}w`).join(', ')
}
