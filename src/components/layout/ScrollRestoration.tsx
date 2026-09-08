import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useLenis } from 'lenis/react'

/**
 * Handles `#hash` target navigation and scroll restoration across route changes,
 * integrated with Lenis inertial smooth scrolling.
 */
export function ScrollRestoration() {
  const { pathname, hash, key } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1)
      const scrollToTarget = () => {
        const element = document.getElementById(targetId)
        if (!element) return false

        const headerPx =
          Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--spacing-header'),
          ) * 16 || 72

        if (lenis) {
          lenis.scrollTo(element, {
            offset: -headerPx - 16,
            duration: 1.2,
          })
        } else {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        return true
      }

      if (scrollToTarget()) return

      // In case target element is mounting or animating in, retry on the next frame
      const frameId = requestAnimationFrame(() => {
        scrollToTarget()
      })
      return () => cancelAnimationFrame(frameId)
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash, key, lenis])

  return null
}

