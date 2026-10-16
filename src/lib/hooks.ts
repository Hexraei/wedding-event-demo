import { useSyncExternalStore } from 'react'

/** Hydration-safe: the prerendered HTML and first client render both see `false`. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

const noop = () => () => {}
/** False in the prerendered HTML and during hydration, true afterwards. */
export const useHydrated = () => useSyncExternalStore(noop, () => true, () => false)
