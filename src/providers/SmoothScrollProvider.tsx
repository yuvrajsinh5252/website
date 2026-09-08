import { type ReactNode, useEffect } from 'react'
import { ReactLenis } from 'lenis/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface SmoothScrollProviderProps {
  children: ReactNode
}

/**
 * Global smooth scroll provider powered by Lenis.
 *
 * Configured for:
 * - Fluid, responsive linear interpolation (`lerp: 0.1`) without artificial duration
 *   to eliminate slow-scroll stuttering and subpixel crawl.
 * - Native touch physics preserved on touch devices (`syncTouch: false`).
 * - Automatic bypass if user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (prefersReducedMotion) return
    document.documentElement.classList.add('lenis')
    return () => {
      document.documentElement.classList.remove('lenis')
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
