import { useSyncExternalStore } from 'react'

/**
 * Subscribe to a CSS media query.
 * `useMediaQuery('(min-width: 48rem)')`
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (onChange: () => void) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
