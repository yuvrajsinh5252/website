import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in view.
 * Used to highlight the active nav link on the landing page.
 */
export function useScrollSpy(sectionIds: string[], rootMargin = '-45% 0px -50% 0px'): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin, threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [sectionIds, rootMargin])

  return activeId
}
