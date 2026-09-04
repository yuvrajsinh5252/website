import { effectsConfig } from '@/config/theme.config'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MeteorShower } from './MeteorShower'
import { Starfield } from './Starfield'
import { StarWake } from './StarWake'

/**
 * The fixed sky behind the whole site: a nebula wash, a drifting starfield and
 * the occasional meteor. Purely decorative, so it sits behind everything and
 * never takes pointer events.
 *
 * Only rendered in dark mode — the light theme is warm paper, not deep space.
 */
export function SkyBackground() {
  const wideEnough = useMediaQuery(
    `(min-width: ${effectsConfig.minWidthForHeavyEffects}px)`,
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden dark:block"
    >
      {/* Two nebula washes drifting against each other. */}
      <div
        className="absolute -top-1/4 -right-1/4 h-[46rem] w-[46rem] rounded-full blur-3xl motion-safe:animate-nebula-drift"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in oklab, var(--theme-accent) 16%, transparent) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-1/3 -left-1/4 h-[40rem] w-[40rem] rounded-full opacity-70 blur-3xl motion-safe:animate-drift"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in oklab, var(--theme-accent) 10%, transparent) 0%, transparent 70%)',
        }}
      />

      {effectsConfig.starfield && (
        <>
          {/* Far layer: dense, dim, slow. */}
          <Starfield
            density={wideEnough ? 130 : 80}
            speed={{ min: 1.5, max: 4 }}
            size={{ min: 0.3, max: 0.85 }}
            alpha={{ min: 0.18, max: 0.5 }}
            className="absolute inset-0 size-full"
          />
          {/* Near layer: sparse, brighter, faster — gives the field depth. */}
          <Starfield
            density={wideEnough ? 26 : 16}
            speed={{ min: 6, max: 13 }}
            size={{ min: 0.8, max: 1.5 }}
            alpha={{ min: 0.5, max: 0.95 }}
            className="absolute inset-0 size-full"
          />
        </>
      )}

      {effectsConfig.meteors && wideEnough && (
        <MeteorShower className="absolute inset-0 size-full" />
      )}

      {/*
       * The cursor trail lives here so it follows the pointer everywhere,
       * not just on one page. It is fixed like the rest of the sky, so it
       * keeps up with scrolling without any extra bookkeeping.
       */}
      {effectsConfig.starWake && (
        <StarWake className="absolute inset-0 size-full text-accent" />
      )}
    </div>
  )
}
