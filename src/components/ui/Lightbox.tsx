import { useCallback, useEffect, useRef } from 'react'
import { Icon } from './icons'
import { cn } from '@/lib/cn'

export interface LightboxImage {
  src: string
  alt: string
  caption?: string
}

export interface LightboxProps {
  /** The image to show, or `null` when closed. */
  image: LightboxImage | null
  onClose: () => void
  className?: string
}

/**
 * Full-size view of a photograph.
 *
 * Built on the native `<dialog>` rather than a div with a high z-index: it
 * renders in the top layer so nothing on the page can ever paint over it, and
 * it brings focus trapping and focus restoration with it instead of those
 * having to be reimplemented and kept correct by hand.
 *
 * Escape is handled explicitly rather than left to the dialog's own close
 * request. The UA behaviour is real but not observable through CDP, so leaving
 * it implicit would mean shipping a path that cannot be tested; doing it here
 * makes closing deterministic in every environment.
 */
export function Lightbox({ image, onClose, className }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  /* Both the button and Escape route through one teardown. */
  const handleClose = useCallback(() => {
    dialogRef.current?.close()
    document.body.style.overflow = ''
    onClose()
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (image) {
      if (!dialog.open) dialog.showModal()
      /* `<dialog>` blocks interaction but not scrolling behind it. */
      document.body.style.overflow = 'hidden'
    } else if (dialog.open) {
      dialog.close()
      document.body.style.overflow = ''
    }
  }, [image])

  useEffect(() => {
    if (!image) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [image, handleClose])

  /*
   * A click on the dialog itself is a click on the backdrop — the image and
   * its chrome are children, so anything landing on the element directly must
   * have missed them.
   */
  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) handleClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault()
        handleClose()
      }}
      onClick={handleClick}
      aria-label={image?.alt}
      className={cn(
        'max-h-none max-w-none bg-transparent p-4 text-foreground backdrop:bg-black/85 sm:p-8',
        'm-auto h-full w-full open:flex open:flex-col open:items-center open:justify-center',
        'backdrop:backdrop-blur-sm',
        className,
      )}
    >
      {image && (
        <>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="focus-ring absolute top-4 right-4 grid size-10 place-items-center rounded-pill border border-white/20 bg-black/40 text-white/80 transition-colors duration-200 hocus:border-white/50 hocus:text-white sm:top-6 sm:right-6"
          >
            <Icon name="close" size={18} />
          </button>

          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[85svh] w-auto max-w-full rounded-[0.25rem] object-contain shadow-card-hover"
          />

          {image.caption && (
            <p className="mt-4 text-center text-[0.6875rem] tracking-[0.16em] text-white/70 uppercase">
              {image.caption}
            </p>
          )}
        </>
      )}
    </dialog>
  )
}
