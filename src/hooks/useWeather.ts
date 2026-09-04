import { useEffect, useState } from 'react'
import { fetchWeather, type Weather } from '@/lib/weather'

/** Re-check the forecast every fifteen minutes. */
const REFRESH_MS = 15 * 60 * 1000

/**
 * Current conditions for a coordinate pair.
 *
 * Returns `null` until it resolves, and stays `null` if the request fails —
 * the weather is a flourish, so the footer simply omits it rather than showing
 * an error to someone who came here to read about projects.
 */
export function useWeather(latitude: number, longitude: number): Weather | null {
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      try {
        const result = await fetchWeather(latitude, longitude, controller.signal)
        if (!controller.signal.aborted) setWeather(result)
      } catch {
        /* Offline, blocked or rate-limited — leave the slot empty. */
      }
    }

    void load()
    const id = window.setInterval(() => void load(), REFRESH_MS)

    return () => {
      controller.abort()
      window.clearInterval(id)
    }
  }, [latitude, longitude])

  return weather
}
