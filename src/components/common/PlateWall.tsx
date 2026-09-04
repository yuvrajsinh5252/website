import { useEffect, useRef, useState } from 'react'
import type { PhotoFrame } from '@/types'
import { Lightbox, PhotoPlate, type LightboxImage } from '@/components/ui'
import { StaggerGroup, StaggerItem } from '@/components/motion'
import { useMediaQuery } from '@/hooks'
import { cn } from '@/lib/cn'

export interface PlateWallProps {
  frames: PhotoFrame[]
  className?: string
}

/**
 * Art direction for each position in the wall: how wide the plate sits in its
 * column, which edge it favours, its angle, and how far it travels under the
 * pointer.
 *
 * Presentation rather than content, so it lives here rather than in
 * `photos.ts`. Positions run in reading order — 0 and 1 are the top row, 2 and
 * 3 the next — and the wall guarantees that the even ones hold tall plates and
 * the odd ones wide plates, so the widths below can be tuned to shape.
 *
 * The plates are laid in two columns so that no plate can ever come to rest on
 * top of another's margin rail — depth comes from the angles, the shadows and
 * the parallax, not from covering things up. `depth` is travel in pixels;
 * plates set nearer the front move furthest. It is deliberately small: any
 * further and a plate slides out from under the cursor that is chasing it.
 */
const slots = [
  { width: 'w-[90%] self-start', tilt: -5.5, depth: 16 },
  { width: 'w-full self-end', tilt: 5, depth: 7 },
  { width: 'w-full self-start', tilt: 4, depth: 13 },
  { width: 'w-[90%] self-end', tilt: -4.5, depth: 9 },
] as const

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/**
 * Orders the plates so tall and wide ones sit on opposing diagonals.
 *
 * Left to itself, a two-column grid puts every other photograph in the same
 * column — and since the set alternates portrait and landscape, that stacks all
 * the tall ones on one side and all the wide ones on the other, which reads as
 * two mismatched columns rather than as one arrangement.
 *
 * Cross-alignment fixes that: each row takes one tall plate and one wide one,
 * and the side they sit on flips every row. The result is a clean diagonal of
 * tall plates crossing a diagonal of wide ones.
 *
 * It works off each photograph's own `ratio` rather than its position in
 * `photos.ts`, so reordering or adding frames cannot quietly break the pattern.
 * Whichever bucket runs out first, the rest simply fill in order.
 */
function crossAlign(frames: PhotoFrame[]): PhotoFrame[] {
  const tall = frames.filter((frame) => frame.ratio !== 'landscape')
  const wide = frames.filter((frame) => frame.ratio === 'landscape')
  const ordered: PhotoFrame[] = []

  /* Takes from the preferred bucket, or the other one once it has run dry. */
  const take = (preferred: PhotoFrame[], fallback: PhotoFrame[]) => {
    const frame = (preferred.length > 0 ? preferred : fallback).shift()
    if (frame) ordered.push(frame)
  }

  for (let row = 0; tall.length > 0 || wide.length > 0; row += 1) {
    /* Even rows lead with the tall plate, odd rows with the wide one. */
    const [first, second] = row % 2 === 0 ? [tall, wide] : [wide, tall]
    take(first, second)
    take(second, first)
  }

  return ordered
}

/**
 * The About collage: astrophotographs laid out as glass plates on a desk.
 *
 * The plates sit at hand angles in two columns, the right one dropped so the
 * two never line up, and the whole arrangement shifts against the pointer with
 * each plate moving at its own depth — so the group reads as a set of physical
 * objects rather than a grid of pictures. Clicking one opens it full size.
 *
 * The pointer handler does one `getBoundingClientRect` per frame and writes a
 * single pair of custom properties to the wall. React is not involved once the
 * wall has mounted, and the easing lives in a CSS transition rather than in JS.
 */
export function PlateWall({ frames, className }: PlateWallProps) {
  const wallRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<LightboxImage | null>(null)
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const finePointer = useMediaQuery('(pointer: fine)')
  const track = finePointer && !reduced

  useEffect(() => {
    const wall = wallRef.current
    if (!wall || !track) return

    /* No point tracking a wall nobody is looking at. */
    let onScreen = true
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
      },
      { rootMargin: '20%' },
    )
    intersectionObserver.observe(wall)

    let frame = 0
    let pointerX = 0
    let pointerY = 0

    const paint = () => {
      frame = 0
      const rect = wall.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      wall.style.setProperty(
        '--wall-x',
        clamp((pointerX - rect.left) / rect.width, 0, 1).toFixed(4),
      )
      wall.style.setProperty(
        '--wall-y',
        clamp((pointerY - rect.top) / rect.height, 0, 1).toFixed(4),
      )
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!onScreen) return
      pointerX = event.clientX
      pointerY = event.clientY
      if (!frame) frame = requestAnimationFrame(paint)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      intersectionObserver.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [track])

  const laid = crossAlign(frames).map((frame, position) => ({
    frame,
    position,
    slot: slots[position % slots.length],
  }))

  return (
    <>
      <div
        ref={wallRef}
        className={cn('relative grid grid-cols-2 items-start gap-x-2 sm:gap-x-4', className)}
      >
        {[0, 1].map((column) => (
          <StaggerGroup
            key={column}
            /* Each column runs its own cascade: variants only reach direct
             * children, so a plain wrapper here would strand the plates. */
            delay={column * 0.1}
            className={cn(
              'flex flex-col gap-7 sm:gap-9',
              /* Dropping the right column stops the two reading as rows. */
              column === 1 && 'mt-[22%]',
            )}
          >
            {laid
              .filter((entry) => entry.position % 2 === column)
              .map(({ frame, position, slot }) => (
                <StaggerItem key={frame.id} className={cn(slot.width, 'hover:z-40')}>
                  <div
                    data-plate
                    className={cn(track && 'plate-drift')}
                    style={{ '--depth': slot.depth } as React.CSSProperties}
                  >
                    <PhotoPlate
                      src={frame.src}
                      alt={frame.alt}
                      caption={frame.caption}
                      subject={frame.subject}
                      detail={frame.detail}
                      ratio={frame.ratio}
                      objectPosition={frame.objectPosition}
                      tilt={frame.tilt ?? slot.tilt}
                      index={position + 1}
                      loading={position < 2 ? 'eager' : 'lazy'}
                      onExpand={() =>
                        setExpanded({
                          src: frame.src,
                          alt: frame.alt,
                          caption: frame.caption,
                        })
                      }
                    />
                  </div>
                </StaggerItem>
              ))}
          </StaggerGroup>
        ))}
      </div>

      <Lightbox image={expanded} onClose={() => setExpanded(null)} />
    </>
  )
}
