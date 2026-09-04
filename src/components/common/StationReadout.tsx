import * as m from 'motion/react-m'
import type { Weather } from '@/lib/weather'
import { cn } from '@/lib/cn'
import { WeatherBadge } from './WeatherGlyph'

export interface StationReadoutProps {
  /** Place name, e.g. `Noida, India`. */
  location: string
  /** Decimal coordinates, rendered as a signed-hemisphere pair. */
  coordinates: { latitude: number; longitude: number }
  /** Pre-formatted local time, e.g. `23:38`. */
  time: string
  /** Short zone label shown under the clock. */
  zoneLabel: string
  /** Omitted from the panel entirely when the forecast cannot be reached. */
  weather: Weather | null
  className?: string
}

/** `28.5355° N` — decimal degrees with a hemisphere letter rather than a sign. */
function formatDegrees(value: number, positive: string, negative: string): string {
  return `${Math.abs(value).toFixed(4)}° ${value >= 0 ? positive : negative}`
}

/**
 * The footer's "where and when": one instrument panel rather than three
 * unrelated rows of icon-and-text.
 *
 * Grouping them is the point — location, clock and conditions are all readings
 * from the same place at the same moment, so they belong in one framed block
 * with a shared header, in the way a station would actually report them. The
 * clock is the largest element because it is the only one that changes while
 * you are looking at it.
 */
export function StationReadout({
  location,
  coordinates,
  time,
  zoneLabel,
  weather,
  className,
}: StationReadoutProps) {
  return (
    <section
      aria-label="Station"
      className={cn(
        'group/station relative overflow-hidden rounded-card border border-border bg-surface/40',
        'transition-colors duration-500 hover:border-accent-border',
        className,
      )}
    >
      <div className="px-3.5 pt-3 pb-2.5">
        <p className="truncate text-[0.625rem] tracking-[0.2em] text-heading uppercase">
          {location}
        </p>

        <p className="mt-1.5 font-mono text-[0.5625rem] text-muted tabular-nums">
          {formatDegrees(coordinates.latitude, 'N', 'S')}
          <span aria-hidden="true"> / </span>
          {formatDegrees(coordinates.longitude, 'E', 'W')}
        </p>
      </div>

      <div aria-hidden="true" className="h-px bg-border" />

      <dl className="flex items-end justify-between gap-4 px-3.5 pt-2.5 pb-3">
        <div className="min-w-0">
          <dt className="sr-only">Local time</dt>
          <dd className="font-display text-2xl leading-none font-bold text-heading tabular-nums">
            {time}
          </dd>
          <dd className="mt-1.5 text-[0.5625rem] tracking-[0.18em] text-muted uppercase">
            {zoneLabel}
          </dd>
        </div>

        {weather && (
          <m.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 text-right"
          >
            <dt className="sr-only">Weather</dt>
            <dd className="flex items-center justify-end gap-1.5">
              <WeatherBadge
                condition={weather.condition}
                isDay={weather.isDay}
                className="text-accent"
              />
              <span className="font-display text-2xl leading-none font-bold text-heading tabular-nums">
                {weather.temperature}°
              </span>
            </dd>
            <dd className="mt-1.5 truncate text-[0.5625rem] tracking-[0.18em] text-muted uppercase">
              {weather.label}
            </dd>
          </m.div>
        )}
      </dl>
    </section>
  )
}
