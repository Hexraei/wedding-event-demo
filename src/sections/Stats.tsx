import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useReducedMotion } from '@/lib/hooks'
import { config } from '@/config'

const DURATION = 1600

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    // Ease-out count from 0 over DURATION ms.
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, value])

  return (
    <span ref={ref} aria-hidden>
      {reduced ? value : shown}
    </span>
  )
}

export function Stats() {
  return (
    <section aria-label="In numbers" className="surface-deep">
      <ul className="wrap grid grid-cols-2 gap-x-4 py-12 md:grid-cols-12 md:gap-x-6 md:py-20">
        {config.stats.map((s) => (
          <li key={s.label} className="group border-t border-border pt-6 pb-2 first:col-span-2 first:border-t-0 first:pt-0 first:pb-8 md:col-span-4 md:border-t-0 md:border-l md:py-0 md:pl-6 md:first:col-span-4 md:first:border-l-0 md:first:py-0 md:first:pl-0">
            <p className="font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.85] tracking-[-0.05em] tabular-nums group-first:text-[clamp(5.5rem,9vw,8.5rem)]">
              <span className="sr-only">{s.value}{s.suffix}</span>
              <CountUp value={s.value} />
              <span aria-hidden>{s.suffix}</span>
            </p>
            <p className="mt-3 text-base text-muted-foreground md:mt-4 md:text-lg">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
