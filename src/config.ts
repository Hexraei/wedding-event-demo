// ─────────────────────────────────────────────────────────────────────────────
// The only file to edit per lead. Everything vendor-specific lives here.
// Then: npm run build, deploy the dist/ folder.
// ─────────────────────────────────────────────────────────────────────────────
import type { IconName } from './lib/icons.ts'
import type { PaletteName } from './lib/palettes.ts'

export type VendorType = 'Photography' | 'Decor' | 'Venue' | 'Catering' | 'Planning'

export type GalleryImage = {
  url: string
  alt: string
  category: string
  /** Shape of the tile in the masonry grid. */
  ratio: 'portrait' | 'landscape' | 'square'
  /** Dominant colour shown while the photo loads. */
  color?: string
}

export type SiteConfig = {
  businessName: string
  tagline: string
  vendorType: VendorType
  city: string
  area: string
  phone: string
  /** Digits only, with country code, e.g. 919876543210 */
  whatsappNumber: string
  /** Prefilled text for every WhatsApp link. */
  whatsappMessage: string
  /** Leave empty to hide. */
  instagramUrl?: string
  /** Leave empty to hide. */
  email?: string
  /** First image is preloaded and used for link previews (Open Graph). */
  heroImages: [string, string, string]
  galleryImages: GalleryImage[]
  /** The first service is shown large, with `image`. */
  services: { title: string; description: string; icon: IconName; image?: string }[]
  packages: { name: string; fromPrice: number; inclusions: [string, string, string, string]; featured?: boolean }[]
  stats: [Stat, Stat, Stat]
  testimonials: { name: string; eventType: string; quote: string }[]
  faq: { question: string; answer: string }[]
  /** Options in the booking form's event type select. */
  eventTypes: string[]
  palette: PaletteName
  /** Section headings and the search-engine description. */
  copy: {
    metaDescription: string
    services: string
    gallery: string
    packages: string
    packagesNote: string
    testimonials: string
    booking: string
    bookingNote: string
    faq: string
  }
}

type Stat = { value: number; suffix?: string; label: string }

export const config: SiteConfig = {
  businessName: 'Sample Studio',
  tagline: 'Tamil weddings, photographed as they happen. From the nalangu to the last pandhi.',
  vendorType: 'Photography',
  city: 'Chennai',
  area: 'Mylapore',
  phone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  whatsappMessage: 'Hi, I found you on your website and want to check availability for my event.',
  instagramUrl: 'https://www.instagram.com/samplestudio',
  email: 'hello@example.com',

  heroImages: [
    'https://images.unsplash.com/photo-1754782500863-2491466d575a?w=1600&q=80&auto=format',
    'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=1600&q=80&auto=format',
    'https://images.unsplash.com/photo-1678705902081-5d55ab847046?w=1600&q=80&auto=format',
  ],

  galleryImages: [
    { url: 'https://images.unsplash.com/photo-1587271449604-04bb40332709?w=1600&q=80&auto=format', alt: 'Bride and groom showered with rose petals during the muhurtham', category: 'Ceremony', ratio: 'landscape', color: '#b0997b' },
    { url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1600&q=80&auto=format', alt: 'Bride in a pink and orange silk saree and temple jewellery, standing between two trees', category: 'Portraits', ratio: 'portrait', color: '#674e4e' },
    { url: 'https://images.unsplash.com/photo-1697347816275-83728d258959?w=1600&q=80&auto=format', alt: 'Bride smiling through turmeric as family hands frame her face at the haldi', category: 'Haldi & mehendi', ratio: 'landscape', color: '#c35f17' },
    { url: 'https://images.unsplash.com/photo-1686865604150-43f95d61416c?w=1600&q=80&auto=format', alt: 'Hennaed hands resting on a cream Kanchipuram silk saree with a red zari border', category: 'Details', ratio: 'portrait', color: '#9c6951' },
    { url: 'https://images.unsplash.com/photo-1754782915842-aa4fca6c203a?w=1600&q=80&auto=format', alt: 'Couple showered with flower petals by family during the wedding ceremony', category: 'Ceremony', ratio: 'portrait', color: '#915f5a' },
    { url: 'https://images.unsplash.com/photo-1764286954620-28029fbae9b6?w=1600&q=80&auto=format', alt: 'Bride and groom in rose garlands, foreheads touching, on the reception stage', category: 'Portraits', ratio: 'landscape', color: '#7e5655' },
    { url: 'https://images.unsplash.com/photo-1772127822454-8566c23084df?w=1600&q=80&auto=format', alt: 'Jasmine garland strung with pearls beside brass lamps', category: 'Details', ratio: 'square', color: '#97907d' },
    { url: 'https://images.unsplash.com/photo-1633104502901-10d124036629?w=1600&q=80&auto=format', alt: 'Groom laughing with turmeric on his cheeks at the haldi', category: 'Haldi & mehendi', ratio: 'portrait', color: '#965822' },
    { url: 'https://images.unsplash.com/photo-1647949940712-bfcf82015d9b?w=1600&q=80&auto=format', alt: 'Bride in yellow silk blessing the groom beneath a canopy of jasmine strings', category: 'Ceremony', ratio: 'square', color: '#a68c61' },
    { url: 'https://images.unsplash.com/photo-1681220430066-75a6620c3a11?w=1600&q=80&auto=format', alt: 'Bride in a green silk saree against a warm studio backdrop', category: 'Portraits', ratio: 'portrait', color: '#714e35' },
    { url: 'https://images.unsplash.com/photo-1762708591153-f6d9eac47854?w=1600&q=80&auto=format', alt: 'Hennaed hands with rose and jasmine wrist garlands', category: 'Haldi & mehendi', ratio: 'square', color: '#883b20' },
    { url: 'https://images.unsplash.com/photo-1654157085616-cd80ec5fca2f?w=1600&q=80&auto=format', alt: 'Thamboolam plate of coconuts, bananas and turmeric thread', category: 'Details', ratio: 'landscape', color: '#a87c61' },
  ],

  services: [
    { title: 'Wedding day coverage', description: 'Muhurtham to reception, with two photographers and a cinematographer.', icon: 'Camera', image: 'https://images.unsplash.com/photo-1722078124956-951cf44ebcf1?w=1600&q=80&auto=format' },
    { title: 'Pre-wedding shoots', description: 'An unhurried morning on ECR, at Dakshinachitra, or at your grandmother’s house.', icon: 'Sunrise' },
    { title: 'Haldi and mehendi', description: 'Close, colourful coverage of the days before the wedding.', icon: 'Flower2' },
    { title: 'Wedding films', description: 'A four-minute film and the full ceremony edit, in six weeks.', icon: 'Film' },
    { title: 'Family portraits', description: 'We run the family photo line so the stage queue keeps moving.', icon: 'Users' },
    { title: 'Hand-bound albums', description: 'Printed on archival paper and bound in Chennai.', icon: 'BookOpen' },
  ],

  packages: [
    { name: 'Muhurtham', fromPrice: 85000, inclusions: ['One photographer for the wedding day', '400+ edited photographs', 'Online gallery in three weeks', '30-page album'] },
    { name: 'Kalyanam', fromPrice: 165000, featured: true, inclusions: ['Two photographers and a cinematographer', 'Wedding and reception', 'Four-minute film and full ceremony edit', '40-page hand-bound album'] },
    { name: 'Full celebration', fromPrice: 290000, inclusions: ['Every event, nichayathartham to reception', 'Pre-wedding shoot at a place you choose', 'Drone coverage where permitted', 'Couple’s album and two parents’ albums'] },
  ],

  stats: [
    { value: 640, suffix: '+', label: 'weddings photographed' },
    { value: 12, label: 'years in Mylapore' },
    { value: 18, label: 'cities we have travelled to' },
  ],

  testimonials: [
    { name: 'Divya and Karthik', eventType: 'Wedding in Mylapore', quote: 'They caught my paati crying during the thaali. I didn’t know it happened until I opened the album.' },
    { name: 'Nivetha and Arun', eventType: 'Pre-wedding shoot on ECR', quote: 'It felt like a long morning walk with friends who happened to carry cameras.' },
    { name: 'The Raghavan family', eventType: 'Reception in Anna Nagar', quote: 'Four hundred guests, and every family photo on stage was done inside an hour.' },
  ],

  faq: [
    { question: 'How early should we book?', answer: 'Muhurtham dates from Thai to Panguni fill eight to ten months ahead. For other months, three months is usually enough.' },
    { question: 'Do you travel outside Chennai?', answer: 'Yes. Kanchipuram, Pondicherry and Madurai are regular for us. Outside Chennai, travel and stay are billed at cost.' },
    { question: 'When do we get our photographs?', answer: 'Fifty previews within 72 hours, the full gallery in three weeks, and films and albums in six weeks.' },
    { question: 'How do payments work?', answer: '30% blocks the date, 50% is due a week before the wedding, and the balance on delivery. UPI and bank transfer are accepted.' },
    { question: 'Can we meet before booking?', answer: 'Visit the Mylapore studio on any weekday, or we can do a video call. Message us on WhatsApp to fix a time.' },
  ],

  eventTypes: ['Wedding', 'Reception', 'Engagement / nichayathartham', 'Haldi and mehendi', 'Pre-wedding shoot', 'Something else'],

  palette: 'marigold',

  copy: {
    metaDescription: 'Sample Studio photographs Tamil weddings across Chennai, from Mylapore to ECR. Wedding day coverage, films and hand-bound albums.',
    services: 'What we photograph',
    gallery: 'Recent weddings',
    packages: 'Packages',
    packagesNote: 'Every wedding is quoted after a short call. These are starting points.',
    testimonials: 'From our couples',
    booking: 'Check your date',
    bookingNote: 'Tell us about the day. We reply on WhatsApp, usually within a few hours.',
    faq: 'Before you book',
  },
}
