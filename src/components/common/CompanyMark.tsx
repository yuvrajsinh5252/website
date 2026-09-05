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

/**
 * A company rendered as a single squircle logo tile.
 *
 * The mark is the whole subject — no photograph behind it and no counters
 * around it. It rests at a slight tilt and levels as you reach for it, which
 * is the only movement in the block.
 *
 * The tile stays white in both themes because logos are drawn for light
 * backgrounds; tinting it would misrepresent the marks it carries.
 */
export function CompanyMark({ logo, name, tilt = -4, className }: CompanyMarkProps) {
  return (
    <div
      className={cn(
        'group/mark relative mx-auto w-full max-w-[15rem] sm:max-w-[19rem]',
        className,
      )}
    >
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
          'relative grid aspect-square place-items-center overflow-hidden rounded-[30%] p-[20%]',
          'border border-border-strong bg-white shadow-card',
          'rotate-(--tilt) transition-[rotate,translate,box-shadow] duration-500 ease-out-expo',
          'hover:-translate-y-1.5 hover:rotate-0 hover:shadow-card-hover',
        )}
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
  )
}
