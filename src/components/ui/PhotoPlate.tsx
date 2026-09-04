import type { PhotoFrame } from '@/types'
import { cn } from '@/lib/cn'
import { Icon } from './icons'

export interface PhotoPlateProps extends Omit<PhotoFrame, 'id'> {
  className?: string
  /** Lazy-load below-the-fold plates. */
  loading?: 'eager' | 'lazy'
  /** Sequence number stencilled into the holder margin. 1-based. */
  index?: number
  /** When given, the plate becomes a button that opens the full-size view. */
  onExpand?: () => void
}

const ratios = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
} as const

/**
 * A photograph presented as a glass plate in a metal holder.
 *
 * Not a card and not a polaroid. Astronomy shot on glass plates for a century,
 * and that is the object this borrows: a milled holder, an engraved margin
 * rail, and glass that catches the light.
 *
 * The catch-light is a fixed diagonal, and it *clears* on hover — the glass
 * getting out of the way of the photograph you just reached for. It does not
 * follow the pointer: a highlight chasing the cursor reads as a gimmick laid
 * over the image rather than as a property of the glass.
 *
 * The tilt arrives as a custom property rather than an inline `rotate`, so the
 * hover rule can level the plate without an inline style outranking it.
 */
export function PhotoPlate({
  src,
  alt,
  caption,
  subject,
  detail,
  tilt = 0,
  objectPosition = 'center',
  ratio = 'portrait',
  loading = 'lazy',
  index,
  onExpand,
  className,
}: PhotoPlateProps) {
  return (
    <div
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
      className={cn('group/plate relative', className)}
    >
      <figure
        className={cn(
          'plate-holder pointer-events-none relative rounded-[0.4rem] p-[0.4rem] pb-0',
          'rotate-(--tilt) transition-[rotate,translate,box-shadow] duration-500 ease-out-expo',
          'group-hover/plate:-translate-y-2 group-hover/plate:rotate-0',
        )}
      >
        <div
          className={cn('relative overflow-hidden rounded-[0.15rem] bg-black', ratios[ratio])}
        >
          <img
            src={src}
            alt={alt}
            loading={loading}
            decoding="async"
            draggable={false}
            style={{ objectPosition }}
            className="size-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover/plate:scale-[1.05]"
          />

          {/* Emulsion falls off at the edge of a plate; this is that, not a scrim. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(88%_78%_at_50%_42%,transparent_52%,rgb(0_0_0/38%)_100%)]"
          />

          {/* The catch-light on the glass, which clears as you reach for it. */}
          <span
            aria-hidden="true"
            className="plate-glass pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-500 ease-out-expo group-hover/plate:opacity-0"
          />

          {/* Annotated on the emulsion, as a plate would be — and out of the
           * margin rail, where it would crowd the caption at these widths. */}
          {subject && (
            <span className="pointer-events-none absolute top-2 right-2.5 text-[0.5rem] tracking-[0.2em] text-white/75 uppercase [text-shadow:0_1px_4px_rgb(0_0_0/90%)]">
              {subject}
            </span>
          )}

          {onExpand && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-2 bottom-2 grid size-7 translate-y-1 place-items-center rounded-pill border border-white/25 bg-black/45 text-white/85 opacity-0 backdrop-blur-[2px] transition-[opacity,translate] duration-300 ease-out-expo group-hover/plate:translate-y-0 group-hover/plate:opacity-100"
            >
              <Icon name="expand" size={13} />
            </span>
          )}
        </div>

        <figcaption className="flex items-center gap-2 px-1 pt-2 pb-1.5">
          {index !== undefined && (
            <>
              <span className="font-mono text-[0.5625rem] leading-none text-accent tabular-nums">
                {String(index).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="h-2.5 w-px bg-border-strong" />
            </>
          )}

          <span className="truncate text-[0.625rem] tracking-[0.16em] text-heading uppercase">
            {caption}
          </span>
        </figcaption>

        {detail && (
          <p className="truncate px-1 pb-2 font-mono text-[0.5625rem] text-muted tabular-nums">
            {detail}
          </p>
        )}
      </figure>

      {/*
       * The only thing on the plate that takes the pointer.
       *
       * The plate rotates, so its painted corners stick out past this box. If
       * those corners were hoverable the plate would level itself, drop out
       * from under the cursor, un-hover and rotate straight back — jittering
       * for as long as you held the pointer near an edge. Everything above is
       * `pointer-events-none`, so hover is decided by this one square, which
       * never moves.
       */}
      {onExpand ? (
        <button
          type="button"
          onClick={onExpand}
          aria-label={`Expand: ${caption}`}
          className="focus-ring absolute inset-0 z-10 cursor-zoom-in rounded-[0.4rem]"
        />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 z-10" />
      )}
    </div>
  )
}
