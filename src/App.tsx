import { useState } from 'react'
import { LazyMotion, MotionConfig } from 'motion/react'
import { Booking, BookingDialog } from '@/sections/Booking'
import { Faq } from '@/sections/Faq'
import { Footer, WhatsAppFab } from '@/sections/Footer'
import { Gallery } from '@/sections/Gallery'
import { Hero } from '@/sections/Hero'
import { Nav } from '@/sections/Nav'
import { Packages } from '@/sections/Packages'
import { Services } from '@/sections/Services'
import { Stats } from '@/sections/Stats'
import { Testimonials } from '@/sections/Testimonials'

// Animation features load after first paint; until then motion elements render static.
const loadMotion = () => import('@/lib/motion-features').then((mod) => mod.default)

export default function App() {
  const [booking, setBooking] = useState({ open: false, note: '' })
  const book = (note = '') => setBooking({ open: true, note })

  return (
    <LazyMotion features={loadMotion} strict>
      <MotionConfig reducedMotion="user">
        <Nav onBook={() => book()} />
        <main>
          <Hero onBook={() => book()} />
          <Stats />
          <Services />
          <Gallery />
          <Packages onBook={book} />
          <Testimonials />
          <Booking />
          <Faq />
        </main>
        <Footer />
        <WhatsAppFab />
        <BookingDialog open={booking.open} note={booking.note} onOpenChange={(open) => setBooking((b) => ({ ...b, open }))} />
      </MotionConfig>
    </LazyMotion>
  )
}
