import { useCallback, useMemo, useSyncExternalStore } from 'react'

/** Current minute since the epoch — changes at most once a minute. */
function getMinute(): number {
  return Math.floor(Date.now() / 60_000)
}

/**
 * Live clock for a fixed IANA time zone.
 *
 * Subscribes to a ticker through `useSyncExternalStore` rather than setting
 * state from an effect, so there is no cascading render and the value is
 * consistent from the very first paint.
 */
export function useLocalTime(timeZone: string): string {
  const subscribe = useCallback((onChange: () => void) => {
    /* Poll twice a minute so the displayed minute is never more than ~30s stale. */
    const id = window.setInterval(onChange, 30_000)
    return () => window.clearInterval(id)
  }, [])

  const minute = useSyncExternalStore(subscribe, getMinute, getMinute)

  return useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone,
      }).format(new Date(minute * 60_000)),
    [minute, timeZone],
  )
}
