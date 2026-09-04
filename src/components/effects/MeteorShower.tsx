import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface Meteor {
  x: number
  y: number
  /** Length of the tail in px. */
  length: number
  /** Travel speed in px per second. */
  speed: number
  angle: number
  thickness: number
  /** 0 → 1 → 0 over the meteor's life. */
  life: number
  lifespan: number
}

export interface MeteorShowerProps {
  /** Meteors visible at once, at most. */
  maxConcurrent?: number
  /** Milliseconds between spawn attempts. */
  interval?: { min: number; max: number }
  className?: string
}

const TAU = Math.PI * 2

/**
 * Occasional meteors streaking across the field.
 *
 * Meteors fade in and out rather than being clipped at the viewport edge, and
 * spawn on a randomised timer so the sky never looks periodic.
 */
export function MeteorShower({
  maxConcurrent = 2,
  interval = { min: 5000, max: 11000 },
  className,
}: MeteorShowerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (reducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    let width = 0
    let height = 0
    let frame = 0
    let lastTime = performance.now()
    let nextSpawn = performance.now() + interval.min
    const meteors: Meteor[] = []

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      if (width === 0 || height === 0) return

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = () => {
      /* Fall from the upper-left quadrant towards the lower right. */
      const angle = Math.PI * 0.18 + Math.random() * Math.PI * 0.1

      meteors.push({
        x: Math.random() * width * 0.9 - width * 0.1,
        y: Math.random() * height * 0.45 - height * 0.1,
        length: 90 + Math.random() * 90,
        speed: 320 + Math.random() * 340,
        angle,
        thickness: 0.9 + Math.random() * 1.1,
        life: 0,
        lifespan: 1.1 + Math.random() * 0.7,
      })
    }

    const tick = (time: number) => {
      const elapsed = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      if (time >= nextSpawn && meteors.length < maxConcurrent) {
        spawn()
        nextSpawn = time + interval.min + Math.random() * (interval.max - interval.min)
      }

      context.clearRect(0, 0, width, height)

      for (let index = meteors.length - 1; index >= 0; index -= 1) {
        const meteor = meteors[index]!
        meteor.life += elapsed
        if (meteor.life >= meteor.lifespan) {
          meteors.splice(index, 1)
          continue
        }

        const progress = meteor.life / meteor.lifespan
        /* Ease in, hold, ease out — no hard pop at either end. */
        const alpha = Math.sin(progress * Math.PI) ** 0.7

        meteor.x += Math.cos(meteor.angle) * meteor.speed * elapsed
        meteor.y += Math.sin(meteor.angle) * meteor.speed * elapsed

        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length

        const gradient = context.createLinearGradient(meteor.x, meteor.y, tailX, tailY)
        gradient.addColorStop(0, `rgba(255,255,255,${alpha})`)
        gradient.addColorStop(0.35, `rgba(255,255,255,${alpha * 0.35})`)
        gradient.addColorStop(1, 'rgba(255,255,255,0)')

        context.strokeStyle = gradient
        context.lineWidth = meteor.thickness
        context.lineCap = 'round'
        context.beginPath()
        context.moveTo(meteor.x, meteor.y)
        context.lineTo(tailX, tailY)
        context.stroke()

        /* Bright head. */
        context.globalAlpha = alpha
        context.fillStyle = '#ffffff'
        context.beginPath()
        context.arc(meteor.x, meteor.y, meteor.thickness * 0.9, 0, TAU)
        context.fill()
        context.globalAlpha = 1
      }

      frame = requestAnimationFrame(tick)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [maxConcurrent, interval.min, interval.max, reducedMotion])

  if (reducedMotion) return null

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
