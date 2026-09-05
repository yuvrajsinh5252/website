import type { Transition, Variants } from 'motion/react'
import { motionConfig } from '@/config/theme.config'

/**
 * Motion presets built from `motionConfig`, so timing stays consistent
 * across every animated component.
 */

export const transitions = {
  fast: {
    duration: motionConfig.duration.fast,
    ease: motionConfig.ease,
  },
  base: {
    duration: motionConfig.duration.base,
    ease: motionConfig.ease,
  },
  slow: {
    duration: motionConfig.duration.slow,
    ease: motionConfig.ease,
  },
  spring: {
    type: 'spring',
    stiffness: 260,
    damping: 26,
    mass: 0.9,
  },
} satisfies Record<string, Transition>

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

const offsets: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: motionConfig.distance },
  down: { x: 0, y: -motionConfig.distance },
  left: { x: motionConfig.distance, y: 0 },
  right: { x: -motionConfig.distance, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Fade + slide in from `direction`, with a slight defocus that resolves as the
 * element settles. Pass a delay through motion's `custom` prop.
 */
export function createRevealVariants(
  direction: RevealDirection = 'up',
  distanceScale = 1,
): Variants {
  const { x, y } = offsets[direction]

  return {
    hidden: {
      opacity: 0,
      x: x * distanceScale,
      y: y * distanceScale,
      filter: 'blur(6px)',
    },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: { ...transitions.base, delay },
    }),
  }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
}

export const fadeUp: Variants = createRevealVariants('up')

/** Parent variant that reveals children one after another. */
export function createStaggerVariants(stagger = motionConfig.stagger, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }
}

export const staggerContainer: Variants = createStaggerVariants()

/** Shared `whileInView` viewport settings. */
export const inViewport = motionConfig.viewport
