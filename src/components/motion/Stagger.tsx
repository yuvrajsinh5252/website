import { useMemo, type ElementType, type ReactNode } from 'react'
import * as m from 'motion/react-m'
import {
  createRevealVariants,
  createStaggerVariants,
  inViewport,
  type RevealDirection,
} from '@/lib/motion'

/** Motion components for the handful of elements these wrappers need. */
const motionTags = {
  div: m.div,
  ol: m.ol,
  ul: m.ul,
  li: m.li,
  section: m.section,
} as const

type MotionTag = keyof typeof motionTags

export interface StaggerProps {
  children: ReactNode
  className?: string
  /** Rendered element — use `ol`/`ul` so list children stay valid HTML. */
  as?: MotionTag
  /** Seconds between each child. */
  stagger?: number
  /** Seconds before the first child animates. */
  delay?: number
}

/**
 * Reveals its `<StaggerItem>` children one after another.
 * Children inherit the `visible` state, so they need no viewport logic.
 *
 * Items must be *direct* children: the visible state propagates down the
 * motion tree, and a plain wrapper element in between will leave them stuck
 * at `hidden`. Nest a second `StaggerGroup` instead of reaching for a `div`.
 */
export function StaggerGroup({
  children,
  className,
  as = 'div',
  stagger,
  delay,
}: StaggerProps) {
  const variants = useMemo(() => createStaggerVariants(stagger, delay), [stagger, delay])
  const Component = motionTags[as] as ElementType

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={inViewport}
    >
      {children}
    </Component>
  )
}

export interface StaggerItemProps {
  children: ReactNode
  className?: string
  as?: MotionTag
  direction?: RevealDirection
}

export function StaggerItem({
  children,
  className,
  as = 'div',
  direction = 'up',
}: StaggerItemProps) {
  const variants = useMemo(() => createRevealVariants(direction), [direction])
  const Component = motionTags[as] as ElementType

  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  )
}
