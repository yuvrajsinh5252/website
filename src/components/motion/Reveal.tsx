import { useMemo, type ReactNode } from 'react'
import * as m from 'motion/react-m'
import { createRevealVariants, inViewport, type RevealDirection } from '@/lib/motion'

export interface RevealProps {
  children: ReactNode
  className?: string
  /** Direction the element travels from. */
  direction?: RevealDirection
  /** Seconds to wait after entering the viewport. */
  delay?: number
  /** Multiplier on the shared travel distance. */
  distanceScale?: number
  /** Replay the animation every time it re-enters the viewport. */
  repeat?: boolean
}

/**
 * Fades and slides its children in when they scroll into view.
 * Automatically disabled when the user prefers reduced motion
 * (handled globally by `MotionConfig` in MotionProvider).
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  distanceScale = 1,
  repeat = false,
}: RevealProps) {
  const variants = useMemo(
    () => createRevealVariants(direction, distanceScale),
    [direction, distanceScale],
  )

  return (
    <m.div
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={repeat ? { ...inViewport, once: false } : inViewport}
    >
      {children}
    </m.div>
  )
}
