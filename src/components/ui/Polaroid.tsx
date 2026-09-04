import type { PhotoFrame } from '@/types'
import { cn } from '@/lib/cn'

export interface PolaroidProps extends Omit<PhotoFrame, 'id'> {
  className?: string
  /** Lazy-load below-the-fold frames. */
  loading?: 'eager' | 'lazy'
  /** Square is the classic print; `portrait` suits vertical photographs. */
  ratio?: 'square' | 'portrait' | 'landscape'
  /**
   * `duotone` prints the photo in the accent hue so a group of frames reads as
   * one set; `color` keeps the original.
   */
  tone?: 'duotone' | 'color'
}

const ratios = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
} as const

/**
 * A photograph in a printed polaroid frame.
 *
 * The frame keeps its paper colour in both themes, and the caption sits inside
 * the border so it can never be clipped by a neighbouring frame.
 */
export function Polaroid({
  src,
  alt,
  caption,
  tilt = 0,
  objectPosition = 'center',
  ratio = 'square',
  tone = 'duotone',
  loading = 'lazy',
  className,
}: PolaroidProps) {
  const duotone = tone === 'duotone'

  return (
    <figure
      className={cn(
        'bg-paper p-[0.5rem] pb-7 shadow-print',
        'transition-[translate,rotate,box-shadow] duration-300 ease-out-expo',
        'hover:-translate-y-1.5 hover:rotate-0',
        className,
      )}
      style={{ rotate: `${tilt}deg` }}
    >
      <div
        className={cn(
          'overflow-hidden',
          ratios[ratio],
          /* The sepia shows through the multiplied greyscale print. */
          duotone ? 'bg-print' : 'bg-surface-muted',
        )}
      >
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          draggable={false}
          className={cn(
            'size-full object-cover transition-transform duration-500 ease-out-expo',
            duotone && 'scale-105 mix-blend-multiply grayscale contrast-125 brightness-105',
          )}
          style={{ objectPosition }}
        />
      </div>

      {caption && (
        <figcaption className="text-paper-ink mt-2.5 truncate px-1 text-center text-[10px] tracking-[0.16em] uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
