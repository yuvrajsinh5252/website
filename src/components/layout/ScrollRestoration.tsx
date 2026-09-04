import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * React Router does not handle `#hash` targets or restore scroll on
 * navigation, so do both here.
 */
export function ScrollRestoration() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, key])

  return null
}
