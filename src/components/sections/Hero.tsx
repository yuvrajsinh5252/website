import { useCallback, useRef } from 'react'
import { effectsConfig } from '@/config/theme.config'
import { profile, skills } from '@/data'
import { OrbitingSkills, ParticleGlobe } from '@/components/effects'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui'

/** Inline style helper for the staggered entrance delays. */
const delay = (seconds: number) => ({ animationDelay: `${seconds}s` })

/**
 * Full-height opening.
 *
 * The name is centred and set at display scale, with the greeting pinned to
 * its top-left and the tagline to its bottom-right — a fixed relationship that
 * holds at every breakpoint because all three share one relative wrapper.
 *
 * The name arrives from a 9× scale and pulls into focus (`animate-name-zoom`)
 * while the particle horizon assembles behind it and its satellites come round.
 */
export function Hero() {
  const copyRef = useRef<HTMLDivElement>(null)

  /* The copy fills small screens, leaving no sky for satellites to cross. */
  const roomForOrbits = useMediaQuery(
    `(min-width: ${effectsConfig.minWidthForHeavyEffects}px)`,
  )

  /* Once the visitor has started scrolling, the cue has done its job. */
  const scrolled = useScrolled(80)

  /*
   * Scrolls to the About section directly rather than through an `#about`
   * href. A hash link triggers both the browser's own anchor jump and the
   * router's scroll restoration, and the two fight each other — which is why
   * the cue used to land halfway down the page.
   *
   * The offset is computed here rather than left to `scrollIntoView`, because
   * that stacks the section's `scroll-margin` on top of the document's
   * `scroll-padding` and stops short by the sum of the two.
   */
  const scrollToAbout = useCallback(() => {
    const about = document.getElementById('about')
    if (!about) return

    const header =
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--spacing-header'),
      ) * 16 || 72

    const top = about.getBoundingClientRect().top + window.scrollY - header

    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  return (
    <section
      aria-label="Introduction"
      className="relative h-dvh min-h-svh overflow-hidden"
    >
      {/*
       * The effect layers are masked at the bottom edge. The section clips its
       * overflow, so without this the dispersing particles would terminate on
       * a hard horizontal line where the hero meets the next section.
       */}
      {effectsConfig.globe && (
        <ParticleGlobe className="hero-effect-mask pointer-events-none absolute inset-0 z-10 size-full text-heading" />
      )}

      {effectsConfig.orbits && roomForOrbits && (
        <OrbitingSkills
          avoidRef={copyRef}
          className="hero-orbit-mask pointer-events-none absolute inset-0 z-10 size-full"
        />
      )}

      {/*
       * The copy sits lower on phones. The dome takes the bottom third there
       * (see `heroGlobeGeometry`), and starting the block at a fifth of a tall
       * narrow viewport left an obvious void between the tagline and the
       * horizon.
       */}
      <div className="absolute inset-x-0 top-[27%] z-20 flex justify-center px-5 sm:top-[22%] sm:px-6 md:top-[23%]">
        <div ref={copyRef} className="relative">
          <p
            className="eyebrow absolute -top-7 left-0 animate-fade-up text-sm sm:-top-9 sm:text-base md:-top-10"
            style={delay(1.35)}
          >
            Hey, I&rsquo;m
          </p>

          <h1 className="font-display motion-safe:animate-name-zoom text-[2.75rem] leading-[0.9] font-extrabold tracking-tight whitespace-nowrap text-heading sm:text-[5.5rem] md:text-[8rem] lg:text-[10.5rem]">
            Yuvrajsinh
            <span className="sr-only"> Gohil</span>
          </h1>

          <p
            className="absolute top-full right-0 mt-3 max-w-[13rem] animate-fade-up text-right text-xs leading-relaxed font-light text-foreground/85 sm:mt-4 sm:max-w-[16rem] sm:text-sm md:max-w-[18rem] md:text-base"
            style={delay(1.5)}
          >
            {profile.tagline}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToAbout}
        aria-label="Scroll to the about section"
        className={cn(
          'focus-ring absolute inset-x-0 bottom-8 z-20 mx-auto flex w-fit flex-col items-center gap-2',
          'text-muted transition-[opacity,translate,color] duration-500 ease-out-expo hocus:text-accent',
          scrolled
            ? 'pointer-events-none translate-y-3 opacity-0'
            : 'translate-y-0 animate-fade-up opacity-100',
        )}
        style={scrolled ? undefined : delay(1.9)}
      >
        <span className="text-[0.625rem] tracking-[0.22em] uppercase">Scroll</span>
        <Icon name="arrowDown" size={16} className="motion-safe:animate-scroll-cue" />
      </button>

      {/* The globe visualises these; keep them readable without it. */}
      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={skill.name}>{skill.name}</li>
        ))}
      </ul>
    </section>
  )
}
