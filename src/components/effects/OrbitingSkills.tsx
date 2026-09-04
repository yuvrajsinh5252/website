import { useEffect, useRef, type RefObject } from 'react'
import { orbitSkills } from '@/data'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTheme } from '@/hooks/useTheme'
import { globeScrollTransform, heroGlobeGeometry } from '@/lib/globe'
import { createOrbits, orbitPoint, orbitReach } from '@/lib/orbit'
import { Icon } from '@/components/ui'

/** Radians per second at semi-major axis 1; everything else derives from this. */
const BASE_SPEED = 0.25

/** Samples used to trace one orbit trail. */
const TRAIL_SEGMENTS = 140

/** Peak opacity of a trail, at the height where it is brightest. */
const TRAIL_ALPHA = 0.15

/** Breathing room kept around the hero copy, in px. */
const KEEP_OUT_PADDING = 28

/** Band at the top of the hero over which a satellite fades out, in px. */
const EDGE_FADE = 96

/** How far a satellite dims while crossing behind the copy. */
const KEEP_OUT_OPACITY = 0.1

/** Pulls the three channels out of a computed `rgb(...)` colour. */
function parseRgb(value: string): [number, number, number] {
  const parts = value.match(/[\d.]+/g)
  if (!parts || parts.length < 3) return [255, 255, 255]
  return [Number(parts[0]), Number(parts[1]), Number(parts[2])]
}

export interface OrbitingSkillsProps {
  /** Element the satellites should fade behind, usually the hero copy. */
  avoidRef?: RefObject<HTMLElement | null>
  className?: string
}

/**
 * Satellites tracing real orbits around the hero's planet.
 *
 * Purely decorative. Icons are DOM nodes so they stay crisp at any scale,
 * positioned each frame by writing transforms directly — React never
 * re-renders during the animation. The faint elliptical trails are drawn on a
 * canvas underneath, broken wherever the planet's body would hide them.
 *
 * Satellites fade down as they pass behind the hero copy, so the type is never
 * competing with a drifting icon.
 */
export function OrbitingSkills({ avoidRef, className }: OrbitingSkillsProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { resolvedTheme, accent } = useTheme()

  /* Re-read the trail colour on theme change without restarting the loop. */
  const colorRef = useRef<[number, number, number]>([255, 255, 255])
  const colorDirty = useRef(true)

  useEffect(() => {
    colorDirty.current = true
  }, [resolvedTheme, accent])

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    const orbits = createOrbits(orbitSkills.length)
    const reach = orbitReach(orbits)

    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    let elapsed = 0
    let intro = reducedMotion ? 1 : 0
    let scroll = 0
    let targetScroll = 0
    let lastTime = performance.now()

    /* Local-space box the satellites dim inside. Cached; only layout changes it. */
    let keepOut: { left: number; top: number; right: number; bottom: number } | null = null

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const measure = () => {
      width = root.clientWidth
      height = root.clientHeight
      if (width === 0 || height === 0) return

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const avoid = avoidRef?.current
      if (avoid) {
        const rootBox = root.getBoundingClientRect()
        const box = avoid.getBoundingClientRect()
        keepOut = {
          left: box.left - rootBox.left - KEEP_OUT_PADDING,
          top: box.top - rootBox.top - KEEP_OUT_PADDING,
          right: box.right - rootBox.left + KEEP_OUT_PADDING,
          bottom: box.bottom - rootBox.top + KEEP_OUT_PADDING,
        }
      }
    }

    const readScroll = () => {
      targetScroll = Math.min(1, Math.max(0, window.scrollY / (root.clientHeight || 1)))
    }

    const hideAll = () => {
      for (const node of nodesRef.current) {
        if (node) node.style.opacity = '0'
      }
    }

    const paint = () => {
      const { originX, originY, displayRadius } = heroGlobeGeometry(width, height)
      const unwind = globeScrollTransform(scroll, displayRadius)

      /* Satellites ride the planet as it lifts and fades away on scroll. */
      const centreY = originY - unwind.lift
      const fade = unwind.fade * intro
      const planetRadius = displayRadius * unwind.swell

      /*
       * The orbits are sized so the tracks crest just clear of the planet's
       * limb, not at a fixed fraction of the viewport.
       *
       * The limb rises as the viewport widens — the planet's radius follows
       * the width — so a fixed fraction put the crests above the horizon on a
       * laptop and inside the dome on a wide display, where a track would
       * visibly turn back within the particles. Measuring down from the limb
       * keeps the same clearance everywhere.
       */
      const horizonY = originY - displayRadius
      const apexY = horizonY - Math.max(36, height * 0.05)
      const orbitRadius = ((originY - apexY) / reach) * unwind.swell
      const crest = centreY - reach * orbitRadius

      /*
       * The orbit layer clears well before the particles do.
       *
       * As the hero scrolls away the planet swells and lifts, so only a small
       * arc of each ellipse stays in frame — and an arc that large reads as a
       * straight line ruled across the page. Retiring the tracks early avoids
       * that stage entirely; the dome carries the exit on its own.
       */
      const exit = Math.max(0, 1 - scroll / 0.32)
      const orbitFade = fade * exit * exit

      context.clearRect(0, 0, width, height)

      if (orbitFade < 0.02) {
        hideAll()
        return
      }

      /*
       * Trails first, so the satellites sit on top of them. They surface where
       * the tracks crest and run at full strength from there down to the
       * bottom of the hero.
       */
      if (colorDirty.current) {
        colorRef.current = parseRgb(getComputedStyle(canvas).color)
        colorDirty.current = false
      }

      const [r, g, b] = colorRef.current
      const gradient = context.createLinearGradient(
        0,
        crest,
        0,
        crest + (height - crest) * 0.55,
      )
      gradient.addColorStop(0, `rgba(${r},${g},${b},0)`)
      gradient.addColorStop(0.5, `rgba(${r},${g},${b},${TRAIL_ALPHA * 0.45})`)
      gradient.addColorStop(1, `rgba(${r},${g},${b},${TRAIL_ALPHA})`)

      context.strokeStyle = gradient
      context.lineWidth = 1
      context.globalAlpha = orbitFade

      for (const orbit of orbits) {
        /*
         * Drawn whole, with no break where the track crosses the planet. The
         * planet is a cloud of particles rather than a solid body, so you can
         * see straight through it; cutting the line there left every track
         * stopping in mid-air around the horizon, well short of the fold.
         */
        context.beginPath()

        for (let step = 0; step <= TRAIL_SEGMENTS; step += 1) {
          /* Sweep the phase to trace the orbit itself, not its motion. */
          const angle = (step / TRAIL_SEGMENTS) * Math.PI * 2
          const point = orbitPoint({ ...orbit, phase: angle }, 0, orbitRadius, planetRadius)

          const px = originX + point.x
          const py = centreY - point.y

          if (step === 0) context.moveTo(px, py)
          else context.lineTo(px, py)
        }

        context.stroke()
      }

      context.globalAlpha = 1

      /* Then place each satellite. */
      orbits.forEach((orbit, index) => {
        const node = nodesRef.current[index]
        if (!node) return

        const point = orbitPoint(orbit, elapsed * BASE_SPEED, orbitRadius, planetRadius)
        const px = originX + point.x
        const py = centreY - point.y

        const offscreen = px < -80 || px > width + 80 || py < -80 || py > height + 80

        if (point.occluded || offscreen) {
          node.style.opacity = '0'
          return
        }

        /* Depth reads through size and, subtly, through opacity. */
        const depth = (point.z / planetRadius + 1) / 2
        let opacity = (0.45 + depth * 0.55) * orbitFade

        /*
         * Dissolve into the top edge. Apoapsis sits at or above the top of the
         * frame, so without this a satellite lingering up there is sliced in
         * half by the edge of the hero and reads as a rendering fault.
         */
        if (py < EDGE_FADE) {
          opacity *= Math.max(0, py / EDGE_FADE)
        }

        /* Duck behind the copy rather than fighting it for attention. */
        if (
          keepOut &&
          px > keepOut.left &&
          px < keepOut.right &&
          py > keepOut.top &&
          py < keepOut.bottom
        ) {
          opacity *= KEEP_OUT_OPACITY
        }

        node.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -50%) scale(${point.scale.toFixed(3)})`
        node.style.opacity = Math.min(1, opacity).toFixed(3)
      })
    }

    const tick = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      if (!reducedMotion) elapsed += delta
      if (intro < 1) intro = Math.min(1, intro + delta / 2.2)

      scroll += (targetScroll - scroll) * (1 - Math.exp(-delta * 9))

      paint()
      frame = visible ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (frame !== 0) return
      lastTime = performance.now()
      frame = requestAnimationFrame(tick)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const sizeObserver = new ResizeObserver(() => {
      measure()
      paint()
    })
    sizeObserver.observe(root)

    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false
        if (visible) start()
        else stop()
      },
      { threshold: 0 },
    )
    visibility.observe(root)

    measure()
    readScroll()
    scroll = targetScroll

    if (reducedMotion) {
      intro = 1
      paint()
    } else {
      window.addEventListener('scroll', readScroll, { passive: true })
      start()
    }

    return () => {
      stop()
      sizeObserver.disconnect()
      visibility.disconnect()
      window.removeEventListener('scroll', readScroll)
    }
  }, [avoidRef, reducedMotion])
  return (
    <div ref={rootRef} aria-hidden="true" className={className}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full text-accent" />

      {orbitSkills.map((skill, index) => (
        <div
          key={skill.name}
          ref={(node) => {
            nodesRef.current[index] = node
          }}
          className="absolute top-0 left-0 opacity-0 will-change-transform"
          style={{ transition: 'opacity 260ms linear' }}
        >
          <span className="relative grid size-11 place-items-center">
            {/* Halo, as if the chip catches light from the system's star. */}
            <span
              className="pointer-events-none absolute -inset-2.5 rounded-full opacity-70 blur-md"
              style={{
                background:
                  'radial-gradient(circle, color-mix(in oklab, var(--theme-accent) 30%, transparent) 0%, transparent 68%)',
              }}
            />

            {/*
             * The body: a dark disc lit from the upper left, with an inset
             * highlight along that edge and a soft shadow opposite, so it
             * reads as a physical object rather than a flat circle.
             */}
            <span
              className="absolute inset-0 rounded-full border border-white/15"
              style={{
                background:
                  'radial-gradient(125% 125% at 30% 22%, color-mix(in oklab, var(--theme-accent) 22%, var(--theme-surface)) 0%, var(--theme-surface) 52%, color-mix(in oklab, var(--theme-background) 70%, var(--theme-surface)) 100%)',
                boxShadow:
                  'inset 0 1px 0 0 rgb(255 255 255 / 22%), inset 0 -1px 2px 0 rgb(0 0 0 / 45%), 0 4px 14px -4px rgb(0 0 0 / 65%)',
              }}
            />

            {/* Specular sheen across the top third. */}
            <span
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
              aria-hidden="true"
            >
              <span
                className="absolute -top-1/3 left-0 h-2/3 w-full rounded-[50%]"
                style={{
                  background:
                    'linear-gradient(to bottom, rgb(255 255 255 / 16%), transparent)',
                }}
              />
            </span>

            {/* Icons keep their own brand colour. */}
            <Icon
              name={skill.icon}
              size={17}
              className="relative"
              style={{ color: skill.color ?? 'currentColor' }}
            />
          </span>
        </div>
      ))}
    </div>
  )
}
