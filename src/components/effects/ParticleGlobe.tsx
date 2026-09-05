import { useEffect, useRef } from 'react'
import {
  createGlobeParticles,
  drawGlobeParticles,
  globeScrollTransform,
  heroGlobeGeometry,
} from '@/lib/globe'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTheme } from '@/hooks/useTheme'

export interface ParticleGlobeProps {
  /** Particle count on a desktop viewport; scaled down on smaller screens. */
  particles?: number
  className?: string
}

/**
 * The hero's horizon: a dome of particles that assembles on load, rotates
 * slowly, and unwinds upward as the hero scrolls out of view.
 *
 * Runs entirely on one canvas, pauses when scrolled out of view, and falls
 * back to a single static frame when the visitor prefers reduced motion.
 */
export function ParticleGlobe({ particles = 2600, className }: ParticleGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  /* Probe whose resolved colour gives the accent as concrete rgb channels. */
  const accentProbeRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { resolvedTheme, accent } = useTheme()

  /*
   * Painted colour is read from the canvas' own computed style. A dirty flag
   * defers the read to the next animation frame, which is the first moment
   * the provider's class change has actually been flushed to styles.
   */
  const colorRef = useRef('#ffffff')
  const opacityRef = useRef(1)
  const colorDirty = useRef(true)
  const repaintRef = useRef<(() => void) | null>(null)

  /* Accent channels for the atmospheric glow, as an "r,g,b" string. */
  const glowRgb = useRef('168,208,255')
  /* Seconds since mount, used to give the glow a slow breath. */
  const elapsedRef = useRef(0)

  useEffect(() => {
    colorDirty.current = true
    opacityRef.current = resolvedTheme === 'light' ? 1.7 : 1

    /* Repaint once for the static, reduced-motion case. */
    const handle = requestAnimationFrame(() => repaintRef.current?.())
    return () => cancelAnimationFrame(handle)
  }, [resolvedTheme, accent])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    let width = 0
    let height = 0
    let frame = 0
    let rotation = 0
    let intro = reducedMotion ? 1 : 0
    /* Smoothed scroll progress, chasing `targetScroll` each frame. */
    let scroll = 0
    let targetScroll = 0
    let visible = true
    let lastTime = performance.now()

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const isMobile = window.innerWidth < 640
    const isTablet = window.innerWidth < 768

    /*
     * Narrow viewports scale down particle count so the dome remains starry
     * and airy without dense clutter or overlapping dots over the scroll cue.
     */
    const particleCount = isMobile
      ? Math.round(particles * 0.2)
      : isTablet
        ? Math.round(particles * 0.45)
        : particles

    const minY = isMobile ? 0.65 : 0.62

    const cloud = createGlobeParticles(particleCount, minY)

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      if (width === 0 || height === 0) return

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const paint = () => {
      if (colorDirty.current) {
        colorRef.current = getComputedStyle(canvas).color || '#ffffff'

        /*
         * Read the accent from a probe rather than the custom property:
         * `light-dark()` is not resolved inside a custom property's computed
         * value, but it is resolved on a real `color`.
         */
        const probe = accentProbeRef.current
        if (probe) {
          const channels = getComputedStyle(probe).color.match(/[\d.]+/g)
          if (channels && channels.length >= 3) {
            glowRgb.current = channels.slice(0, 3).join(',')
          }
        }

        colorDirty.current = false
      }

      context.clearRect(0, 0, width, height)

      const { originX, originY, displayRadius } = heroGlobeGeometry(width, height)

      /*
       * A diffused glow filling the planet's body.
       *
       * Centred on the sphere's centre and clipped to its radius, so it reads
       * as light inside a perfectly round body rather than a haze floating
       * above the horizon. Drawn on the same canvas and from the same
       * transform as the particles, so it lifts, breathes and fades exactly
       * in step with them.
       */
      const unwind = globeScrollTransform(scroll, displayRadius)
      const glowFade = unwind.fade * (1 - (1 - intro) ** 3)

      if (glowFade > 0.01) {
        /* A slow breath, so the glow is never completely static. */
        const breath = 1 + Math.sin(elapsedRef.current * 0.55) * 0.05
        const bodyRadius = displayRadius * unwind.swell
        const centreY = originY - unwind.lift

        const glow = context.createRadialGradient(
          originX,
          centreY,
          0,
          originX,
          centreY,
          bodyRadius,
        )
        /* Brightest at the core, gone by the limb. */
        glow.addColorStop(0, `rgba(${glowRgb.current},${0.4 * glowFade * breath})`)
        glow.addColorStop(0.35, `rgba(${glowRgb.current},${0.24 * glowFade * breath})`)
        glow.addColorStop(0.68, `rgba(${glowRgb.current},${0.1 * glowFade})`)
        glow.addColorStop(0.9, `rgba(${glowRgb.current},${0.03 * glowFade})`)
        glow.addColorStop(1, `rgba(${glowRgb.current},0)`)

        context.save()
        /* Clip to the sphere so the glow can never bleed past the limb. */
        context.beginPath()
        context.arc(originX, centreY, bodyRadius, 0, Math.PI * 2)
        context.clip()
        context.fillStyle = glow
        context.fillRect(
          originX - bodyRadius,
          centreY - bodyRadius,
          bodyRadius * 2,
          bodyRadius * 2,
        )
        context.restore()
      }

      drawGlobeParticles({
        context,
        particles: cloud,
        originX,
        originY,
        displayRadius,
        rotation,
        intro,
        scroll,
        color: colorRef.current,
        opacityScale: opacityRef.current,
      })
    }

    const readScroll = () => {
      const heroHeight = canvas.clientHeight || window.innerHeight
      targetScroll = Math.min(1, Math.max(0, window.scrollY / heroHeight))
    }

    const tick = (time: number) => {
      const elapsed = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      if (intro < 1) intro = Math.min(1, intro + elapsed / 1.6)
      rotation += elapsed * 0.045
      elapsedRef.current += elapsed

      /*
       * Ease towards the scroll target rather than tracking it exactly. This
       * is framerate-independent and takes the jitter out of trackpad and
       * momentum scrolling.
       */
      scroll += (targetScroll - scroll) * (1 - Math.exp(-elapsed * 9))

      paint()
      frame = visible ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (frame !== 0 || reducedMotion) return
      lastTime = performance.now()
      frame = requestAnimationFrame(tick)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const observer = new ResizeObserver(() => {
      resize()
      paint()
    })
    observer.observe(canvas)

    /* Pause the loop once the hero has scrolled away. */
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false
        if (visible) start()
        else stop()
      },
      { threshold: 0 },
    )
    visibility.observe(canvas)

    resize()
    readScroll()
    scroll = targetScroll
    repaintRef.current = paint

    if (reducedMotion) {
      paint()
    } else {
      window.addEventListener('scroll', readScroll, { passive: true })
      start()
    }

    return () => {
      stop()
      repaintRef.current = null
      observer.disconnect()
      visibility.disconnect()
      window.removeEventListener('scroll', readScroll)
    }
  }, [particles, reducedMotion])

  return (
    <>
      <span
        ref={accentProbeRef}
        aria-hidden="true"
        className="pointer-events-none absolute size-0 text-accent"
      />
      <canvas ref={canvasRef} aria-hidden="true" className={className} />
    </>
  )
}
