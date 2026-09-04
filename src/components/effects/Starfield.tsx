import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface Star {
  x: number
  y: number
  radius: number
  baseAlpha: number
  /** Downward drift in px per second. */
  speed: number
  /** Phase offset so stars do not twinkle in unison. */
  phase: number
  twinkleSpeed: number
}

interface Range {
  min: number
  max: number
}

export interface StarfieldProps {
  /** Stars per million device-independent pixels. */
  density?: number
  /** Drift speed range, px per second. */
  speed?: Range
  /** Radius range, px. */
  size?: Range
  /** Base opacity range. */
  alpha?: Range
  className?: string
}

function pick(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

/**
 * A slowly drifting, twinkling starfield drawn on a canvas.
 *
 * Replaces the old CSS `box-shadow` starfield: one canvas repaints far more
 * cheaply than three layers of a hundred shadows each, the density adapts to
 * the viewport instead of being fixed to a 2000px tile, and stacking two
 * instances with different speeds gives real parallax depth.
 */
export function Starfield({
  density = 90,
  speed = { min: 2, max: 7 },
  size = { min: 0.35, max: 1.05 },
  alpha = { min: 0.25, max: 0.75 },
  className,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  /* Flattened to primitives so the effect's dependencies stay stable. */
  const { min: speedMin, max: speedMax } = speed
  const { min: sizeMin, max: sizeMax } = size
  const { min: alphaMin, max: alphaMax } = alpha

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    let width = 0
    let height = 0
    let stars: Star[] = []
    let frame = 0
    let lastTime = performance.now()

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const seed = () => {
      const count = Math.round((width * height * density) / 1_000_000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: pick(sizeMin, sizeMax),
        baseAlpha: pick(alphaMin, alphaMax),
        speed: pick(speedMin, speedMax),
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.9 + 0.3,
      }))
    }

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      if (width === 0 || height === 0) return

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.fillStyle = '#ffffff'
      seed()
    }

    const paint = (elapsed: number, time: number) => {
      context.clearRect(0, 0, width, height)

      for (const star of stars) {
        if (!reducedMotion) {
          star.y += star.speed * elapsed
          if (star.y > height + 2) {
            star.y = -2
            star.x = Math.random() * width
          }
        }

        const twinkle = reducedMotion
          ? 1
          : 0.6 + 0.4 * Math.sin(time * 0.001 * star.twinkleSpeed + star.phase)

        context.globalAlpha = star.baseAlpha * twinkle
        context.beginPath()
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        context.fill()
      }

      context.globalAlpha = 1
    }

    const tick = (time: number) => {
      const elapsed = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      paint(elapsed, time)
      frame = requestAnimationFrame(tick)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    if (reducedMotion) {
      paint(0, 0)
    } else {
      frame = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [
    density,
    reducedMotion,
    speedMin,
    speedMax,
    sizeMin,
    sizeMax,
    alphaMin,
    alphaMax,
  ])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
