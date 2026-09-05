import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { siteConfig } from '@/config/site.config'

/** Creates the tag on first use, then reuses it for every later navigation. */
function upsertMeta(attribute: 'name' | 'property', key: string, content: string): void {
  const selector = `meta[${attribute}="${key}"]`
  let tag = document.head.querySelector<HTMLMetaElement>(selector)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }

  tag.content = content
}

function upsertCanonical(href: string): void {
  let tag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!tag) {
    tag = document.createElement('link')
    tag.rel = 'canonical'
    document.head.appendChild(tag)
  }

  tag.href = href
}

/**
 * Keeps the title, description, canonical URL and Open Graph tags in step with
 * the current route. Call once per page component.
 *
 * Every field is rewritten on each navigation rather than restored on unmount,
 * so a page can never inherit the previous one's description.
 *
 * Worth knowing: this runs in the browser. Search engines execute JavaScript
 * and will see these values, but the crawlers behind social link previews
 * generally do not — they read the static `index.html`. Per-page share cards
 * would need the routes prerendered at build time.
 */
export function useDocumentMeta(title?: string, description?: string): void {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.titleSuffix}` : siteConfig.title
    const summary = description ?? siteConfig.description
    const url = new URL(pathname, siteConfig.url).href

    document.title = fullTitle

    upsertMeta('name', 'description', summary)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', summary)
    upsertMeta('property', 'og:url', url)
    upsertCanonical(url)
  }, [title, description, pathname])
}
