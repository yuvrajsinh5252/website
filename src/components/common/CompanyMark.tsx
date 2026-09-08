import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

export interface CompanyMarkProps {
  /** Company logo. Falls back to the initials when missing. */
  logo?: string
  /** Company name, used for the alt text and the fallback initials. */
  name: string
  /** Resting rotation in degrees; the tile levels out on hover. */
  tilt?: number
  className?: string
}

// Symmetrical superellipse squircle matching The Noun Project canonical geometry (n ≈ 3.1)
const SQUIRCLE_PATH_100 =
  'M 50,0 C 90.5,0 100,9.5 100,50 C 100,90.5 90.5,100 50,100 C 9.5,100 0,90.5 0,50 C 0,9.5 9.5,0 50,0 Z'

const SQUIRCLE_PATH_UNIT =
  'M 0.5,0 C 0.905,0 1,0.095 1,0.5 C 1,0.905 0.905,1 0.5,1 C 0.095,1 0,0.905 0,0.5 C 0,0.095 0.095,0 0.5,0 Z'

/**
 * A company rendered as a single squircle logo tile.
 *
 * The mark is the whole subject — no photograph behind it and no counters
 * around it. It sits in a crisp, continuous-curvature superellipse squircle.
 *
 * The tile stays white in both themes because logos are drawn for light
 * backgrounds; tinting it would misrepresent the marks it carries.
 */
export function CompanyMark({ logo, name, tilt = -4, className }: CompanyMarkProps) {
  const clipId = `squircle-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`

  return (
    <div
      className={cn(
        'group/mark relative mx-auto w-full max-w-[15rem] sm:max-w-[19rem]',
        className,
      )}
    >
      {/* Reusable unit squircle clip path for masking content */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={SQUIRCLE_PATH_UNIT} />
          </clipPath>
        </defs>
      </svg>

      {/* Light thrown behind the tile, so it sits in the field rather than on it. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[6%] rounded-[38%] opacity-70 blur-3xl transition-opacity duration-500 group-hover/mark:opacity-100"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--theme-accent) 30%, transparent), transparent 70%)',
        }}
      />

      <div
        style={{ '--tilt': `${tilt}deg` } as CSSProperties}
        className={cn(
          'relative aspect-square transition-all duration-500 ease-out-expo',
          tilt !== 0 && 'rotate-(--tilt)',
          'group-hover/mark:-translate-y-2 group-hover/mark:rotate-0 group-hover/mark:scale-[1.02]',
          'hover:-translate-y-2 hover:rotate-0 hover:scale-[1.02]',
          '[filter:drop-shadow(0_10px_24px_light-dark(rgb(20_16_12_/_18%),rgb(0_0_0_/_70%)))]',
          'group-hover/mark:[filter:drop-shadow(0_20px_36px_light-dark(rgb(20_16_12_/_26%),rgb(0_0_0_/_85%)))]',
          'hover:[filter:drop-shadow(0_20px_36px_light-dark(rgb(20_16_12_/_26%),rgb(0_0_0_/_85%)))]',
        )}
      >
        {/* Crisp vector squircle background and border */}
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          aria-hidden="true"
        >
          <path
            d={SQUIRCLE_PATH_100}
            className="fill-white stroke-border-strong"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Content masked to the squircle shape */}
        <div
          style={{ clipPath: `url(#${clipId})` }}
          className="relative grid size-full place-items-center p-[20%]"
        >
          {logo ? (
            <img
              src={logo}
              alt={name}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="size-full object-contain transition-transform duration-700 ease-out-expo group-hover/mark:scale-[1.04]"
            />
          ) : (
            <span className="font-display text-5xl font-bold text-[#14100c]">
              {name.slice(0, 2)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
