import * as m from 'motion/react-m'
import type { WeatherCondition } from '@/lib/weather'
import { cn } from '@/lib/cn'

/**
 * A small animated glyph for the current conditions.
 *
 * Every condition gets its own motion — the sun turns, clouds drift, rain
 * falls, lightning flickers, snow tumbles, fog slides — so the footer reads as
 * alive rather than as a static icon with a number beside it.
 *
 * All animation is declared through Motion, which is wrapped in
 * `MotionConfig reducedMotion="user"`, so it stops for anyone who asks it to.
 */

export interface WeatherGlyphProps {
  condition: WeatherCondition
  /** Draws a moon instead of a sun for the clear and partly-cloudy states. */
  isDay?: boolean
  size?: number
  className?: string
}

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
} as const

/** Slowly turning sun. */
function Sun() {
  return (
    <>
      <m.g
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        style={{ transformOrigin: '12px 12px', transformBox: 'view-box' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
      >
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2" />
        <path d="M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
      </m.g>

      <m.circle
        cx="12"
        cy="12"
        r="4.2"
        fill="currentColor"
        style={{ transformOrigin: '12px 12px', transformBox: 'view-box' }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      />
    </>
  )
}

/** Crescent moon with a star that twinkles beside it. */
function Moon() {
  return (
    <>
      <path
        d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z"
        fill="currentColor"
      />
      <m.circle
        cx="18.5"
        cy="5.5"
        r="1.1"
        fill="currentColor"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
      />
    </>
  )
}

/** A cloud that drifts sideways, optionally with a body behind it. */
function Cloud({ drift = true, y = 0 }: { drift?: boolean; y?: number }) {
  return (
    <m.path
      d="M7 18h9.5a3.6 3.6 0 0 0 .4-7.2 5.3 5.3 0 0 0-10.2-1A3.6 3.6 0 0 0 7 18Z"
      fill="currentColor"
      transform={y ? `translate(0 ${y})` : undefined}
      animate={drift ? { x: [0, 1.4, 0, -1.4, 0] } : undefined}
      transition={
        drift ? { duration: 9, ease: 'easeInOut', repeat: Infinity } : undefined
      }
    />
  )
}

/** Falling streaks, used for rain and drizzle. */
function Drops({ count = 3, heavy = false }: { count?: number; heavy?: boolean }) {
  return (
    <g stroke="currentColor" strokeWidth={heavy ? 1.6 : 1.3} strokeLinecap="round">
      {Array.from({ length: count }, (_, index) => (
        <m.path
          key={index}
          d={`M${7.5 + index * 4} 19.4v${heavy ? 3.2 : 2.4}`}
          animate={{ y: [0, 3.4], opacity: [0, 1, 0] }}
          transition={{
            duration: heavy ? 0.75 : 1.1,
            ease: 'easeIn',
            repeat: Infinity,
            delay: index * (heavy ? 0.18 : 0.28),
          }}
        />
      ))}
    </g>
  )
}

export function WeatherGlyph({
  condition,
  isDay = true,
  size = 18,
  className,
}: WeatherGlyphProps) {
  const dimensions = { width: size, height: size }

  switch (condition) {
    case 'clear':
      return (
        <svg {...base} {...dimensions} aria-hidden="true" className={className}>
          {isDay ? <Sun /> : <Moon />}
        </svg>
      )

    case 'partly-cloudy':
      return (
        <svg {...base} {...dimensions} aria-hidden="true" className={className}>
          <g opacity="0.85">
            <m.circle
              cx="9"
              cy="8.5"
              r="3.4"
              fill="currentColor"
              animate={{ opacity: isDay ? [0.8, 1, 0.8] : [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
            />
          </g>
          <g transform="translate(0 2) scale(0.92)">
            <Cloud />
          </g>
        </svg>
      )

    case 'cloudy':
      return (
        <svg {...base} {...dimensions} aria-hidden="true" className={className}>
          <g opacity="0.45" transform="translate(-2 -2.5) scale(0.8)">
            <Cloud drift />
          </g>
          <Cloud drift />
        </svg>
      )

    case 'fog':
      return (
        <svg {...base} {...dimensions} aria-hidden="true" className={className}>
          <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {[7, 11, 15, 19].map((y, index) => (
              <m.path
                key={y}
                d={`M4 ${y}h16`}
                animate={{ x: [0, index % 2 ? -2.5 : 2.5, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={{
                  duration: 5 + index,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: index * 0.25,
                }}
              />
            ))}
          </g>
        </svg>
      )

    case 'drizzle':
      return (
        <svg {...base} {...dimensions} aria-hidden="true" className={className}>
          <g transform="translate(0 -2) scale(0.92)">
            <Cloud drift={false} />
          </g>
          <Drops count={3} />
        </svg>
      )

    case 'rain':
      return (
        <svg {...base} {...dimensions} aria-hidden="true" className={className}>
          <g transform="translate(0 -2) scale(0.92)">
            <Cloud drift={false} />
          </g>
          <Drops count={4} heavy />
        </svg>
      )

    case 'snow':
      return (
        <svg {...base} {...dimensions} aria-hidden="true" className={className}>
          <g transform="translate(0 -2) scale(0.92)">
            <Cloud drift={false} />
          </g>
          <g fill="currentColor">
            {[0, 1, 2].map((index) => (
              <m.circle
                key={index}
                cx={7.8 + index * 4.2}
                cy="20"
                r="1.1"
                animate={{ y: [0, 3], x: [0, index % 2 ? 1 : -1, 0], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
            ))}
          </g>
        </svg>
      )

    case 'thunderstorm':
      return (
        <svg {...base} {...dimensions} aria-hidden="true" className={className}>
          <g transform="translate(0 -2.5) scale(0.92)">
            <Cloud drift={false} />
          </g>
          <m.path
            d="M12.8 16.5 9.6 21h2.6l-1 3.2 3.6-5h-2.6l1-2.7Z"
            fill="currentColor"
            animate={{ opacity: [0.25, 1, 0.35, 1, 0.25] }}
            transition={{
              duration: 2.2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 1.4,
            }}
          />
        </svg>
      )

    default:
      return null
  }
}

/** Convenience wrapper that also sizes and colours the glyph consistently. */
export function WeatherBadge({
  condition,
  isDay,
  className,
}: Omit<WeatherGlyphProps, 'size'>) {
  return (
    <span className={cn('grid size-4 shrink-0 place-items-center', className)}>
      <WeatherGlyph condition={condition} isDay={isDay} size={17} />
    </span>
  )
}
