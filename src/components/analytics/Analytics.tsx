import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { GA_MEASUREMENT_ID } from '@/config/env'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetIdOrAction: string | Date,
      params?: Record<string, unknown>,
    ) => void
  }
}

function appendScript(attrs: Record<string, string>, inline?: string): HTMLScriptElement {
  const script = document.createElement('script')
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value))
  if (inline) script.textContent = inline
  document.head.appendChild(script)
  return script
}

/**
 * Injected after hydration in production so analytics never blocks first paint
 * or pollutes local development data.
 *
 * Automatically tracks pageviews across SPA route changes with updated document titles.
 */
export function Analytics() {
  const { pathname, search } = useLocation()
  const lastPath = useRef('')

  // 1. In production, asynchronously inject the analytics scripts
  useEffect(() => {
    if (import.meta.env.DEV) return

    const added: HTMLScriptElement[] = []
    const umamiId = import.meta.env.VITE_UMAMI_WEBSITE_ID

    if (umamiId) {
      added.push(
        appendScript({
          src: 'https://cloud.umami.is/script.js',
          'data-website-id': umamiId,
          defer: '',
        }),
      )
    }

    if (GA_MEASUREMENT_ID) {
      added.push(
        appendScript({
          src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
          async: '',
          fetchpriority: 'low',
        }),
        appendScript(
          {},
          `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`,
        ),
      )
    }

    return () => {
      added.forEach((script) => script.remove())
    }
  }, [])

  // 2. Track route changes in single-page navigation
  useEffect(() => {
    if (import.meta.env.DEV || !GA_MEASUREMENT_ID) return

    const currentPath = `${pathname}${search}`
    if (lastPath.current === currentPath) return
    lastPath.current = currentPath

    // Wait for the next tick so page components can set document.title via useDocumentMeta
    const timer = setTimeout(() => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: currentPath,
        })
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [pathname, search])

  return null
}

