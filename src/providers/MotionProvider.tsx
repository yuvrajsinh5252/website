import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import type { ReactNode } from 'react'
import { motionConfig } from '@/config/theme.config'

/**
 * `LazyMotion` + the lightweight `m` components keep the animation bundle small
 * (the full `motion` component pulls in every feature).
 *
 * Import animated elements from `motion/react-m` — see src/components/motion.
 *
 * `reducedMotion="user"` makes every animation respect the OS
 * "reduce motion" setting without per-component checks.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: motionConfig.duration.base, ease: motionConfig.ease }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
