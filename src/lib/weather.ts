/**
 * Weather lookup, backed by Open-Meteo.
 *
 * Open-Meteo is free, needs no API key and sends permissive CORS headers,
 * which makes it the only sensible option for a site with no backend — an
 * API key would have to ship in the bundle, where it is not a secret at all.
 */

export type WeatherCondition =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunderstorm'

export interface Weather {
  condition: WeatherCondition
  /** Degrees celsius, already rounded. */
  temperature: number
  /** False between sunset and sunrise, so the glyph can show a moon. */
  isDay: boolean
  /** Human-readable summary, used for the tooltip and assistive text. */
  label: string
}

/**
 * WMO weather interpretation codes, collapsed into the handful of conditions
 * worth drawing. Full table: https://open-meteo.com/en/docs
 */
const WMO: Record<number, { condition: WeatherCondition; label: string }> = {
  0: { condition: 'clear', label: 'Clear sky' },
  1: { condition: 'clear', label: 'Mainly clear' },
  2: { condition: 'partly-cloudy', label: 'Partly cloudy' },
  3: { condition: 'cloudy', label: 'Overcast' },
  45: { condition: 'fog', label: 'Fog' },
  48: { condition: 'fog', label: 'Freezing fog' },
  51: { condition: 'drizzle', label: 'Light drizzle' },
  53: { condition: 'drizzle', label: 'Drizzle' },
  55: { condition: 'drizzle', label: 'Heavy drizzle' },
  56: { condition: 'drizzle', label: 'Freezing drizzle' },
  57: { condition: 'drizzle', label: 'Freezing drizzle' },
  61: { condition: 'rain', label: 'Light rain' },
  63: { condition: 'rain', label: 'Rain' },
  65: { condition: 'rain', label: 'Heavy rain' },
  66: { condition: 'rain', label: 'Freezing rain' },
  67: { condition: 'rain', label: 'Freezing rain' },
  71: { condition: 'snow', label: 'Light snow' },
  73: { condition: 'snow', label: 'Snow' },
  75: { condition: 'snow', label: 'Heavy snow' },
  77: { condition: 'snow', label: 'Snow grains' },
  80: { condition: 'rain', label: 'Rain showers' },
  81: { condition: 'rain', label: 'Rain showers' },
  82: { condition: 'rain', label: 'Violent rain showers' },
  85: { condition: 'snow', label: 'Snow showers' },
  86: { condition: 'snow', label: 'Snow showers' },
  95: { condition: 'thunderstorm', label: 'Thunderstorm' },
  96: { condition: 'thunderstorm', label: 'Thunderstorm with hail' },
  99: { condition: 'thunderstorm', label: 'Thunderstorm with hail' },
}

interface OpenMeteoResponse {
  current?: {
    temperature_2m?: number
    weather_code?: number
    is_day?: number
  }
}

/** Fetches the current conditions for a coordinate pair. */
export async function fetchWeather(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<Weather | null> {
  const url =
    'https://api.open-meteo.com/v1/forecast' +
    `?latitude=${latitude}&longitude=${longitude}` +
    '&current=temperature_2m,weather_code,is_day'

  const response = await fetch(url, { signal })
  if (!response.ok) return null

  const data = (await response.json()) as OpenMeteoResponse
  const current = data.current
  if (!current || current.temperature_2m === undefined) return null

  const mapped = WMO[current.weather_code ?? 0] ?? WMO[0]!

  return {
    condition: mapped.condition,
    label: mapped.label,
    temperature: Math.round(current.temperature_2m),
    isDay: current.is_day !== 0,
  }
}
