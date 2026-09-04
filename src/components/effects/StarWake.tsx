import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTheme } from '@/hooks/useTheme'

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  lifespan: number
}

export interface StarWakeProps {
  className?: string
}

/**
 * Leaves a short trail of drifting sparks behind the pointer.
 *
 * Only active on devices with a fine pointer, so it never fires on touch, and
 * disabled entirely under reduced-motion.
 */
export function StarWake({ className }: StarWakeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const finePointer = useMediaQuery('(pointer: fine)')
  const { resolvedTheme, accent } = useTheme()
  const enabled = !reducedMotion && finePointer

  /* Re-read the painted colour on theme change without restarting the loop. */
  const colorRef = useRef('#ffffff')
  const colorDirty = useRef(true)

  useEffect(() => {
    colorDirty.current = true
  }, [resolvedTheme, accent, enabled])

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    let width = 0
    let height = 0
    let frame = 0
    let lastTime = performance.now()
    let lastSpawn = 0
    const sparks: Spark[] = []

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      if (width === 0 || height === 0) return

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now()
      /* Throttle so a fast sweep does not flood the buffer. */
      if (now - lastSpawn < 28 || sparks.length > 90) return
      lastSpawn = now

      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      if (x < 0 || y < 0 || x > width || y > height) return

      sparks.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 18,
        vy: 10 + Math.random() * 22,
        size: Math.random() * 1.1 + 0.5,
        life: 0,
        lifespan: 0.7 + Math.random() * 0.8,
      })
    }

    const tick = (time: number) => {
      const elapsed = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      context.clearRect(0, 0, width, height)

      if (colorDirty.current) {
        colorRef.current = getComputedStyle(canvas).color || '#ffffff'
        colorDirty.current = false
      }

      context.fillStyle = colorRef.current

      for (let index = sparks.length - 1; index >= 0; index -= 1) {
        const spark = sparks[index]!
        spark.life += elapsed

        if (spark.life >= spark.lifespan) {
          sparks.splice(index, 1)
          continue
        }

        spark.x += spark.vx * elapsed
        spark.y += spark.vy * elapsed

        const remaining = 1 - spark.life / spark.lifespan
        context.globalAlpha = remaining * 0.8
        context.beginPath()
        context.arc(spark.x, spark.y, spark.size * remaining, 0, Math.PI * 2)
        context.fill()
      }

      context.globalAlpha = 1
      frame = requestAnimationFrame(tick)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [enabled])

  if (!enabled) return null

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
