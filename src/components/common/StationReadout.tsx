import * as m from 'motion/react-m'
import type { Weather } from '@/lib/weather'
import { cn } from '@/lib/cn'
import { WeatherBadge } from './WeatherGlyph'

export interface StationReadoutProps {
  /** Place name, e.g. `Noida, India`. */
  location: string
  /** Decimal coordinates, rendered as a signed-hemisphere pair. */
  coordinates?: { latitude: number; longitude: number }
  /** Pre-formatted local time, e.g. `23:38`. */
  time: string
  /** Short zone label shown under the clock. */
  zoneLabel: string
  /** Omitted from the panel entirely when the forecast cannot be reached. */
  weather: Weather | null
  className?: string
}

/** Decimal degrees with a hemisphere letter rather than a sign, e.g. `12.3456° N`. */
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
    <div
      aria-label="Station readout"
      className={cn('mt-6 border-t border-border/60 pt-5', className)}
    >
      <div className="flex items-center gap-2">
        <p className="text-[0.625rem] font-medium tracking-[0.2em] text-muted uppercase">
          {location}
        </p>

        {coordinates && (
          <span className="font-mono text-[0.5625rem] text-muted/70 tabular-nums">
            ({formatDegrees(coordinates.latitude, 'N', 'S')},{' '}
            {formatDegrees(coordinates.longitude, 'E', 'W')})
          </span>
        )}
      </div>

      <div className="mt-2.5 flex items-baseline gap-3">
        <span className="font-display text-2xl font-bold tracking-tight text-heading tabular-nums">
          {time}
        </span>
        <span className="font-mono text-xs text-muted tabular-nums">
          {zoneLabel}
        </span>
      </div>

      {weather && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-2 flex items-center gap-2 text-xs text-muted"
        >
          <WeatherBadge
            condition={weather.condition}
            isDay={weather.isDay}
            className="text-accent"
          />
          <span className="font-semibold text-heading tabular-nums">
            {weather.temperature}°
          </span>
          <span aria-hidden="true" className="text-border-strong">·</span>
          <span className="text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
            {weather.label}
          </span>
        </m.div>
      )}
    </div>
  )
}
