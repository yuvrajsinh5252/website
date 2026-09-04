/**
 * Small, dependency-free helpers shared across the app.
 */

/** "Jan 2024 — Present" style range used by the experience timeline. */
export function formatDateRange(start: string, end?: string): string {
  return `${start} — ${end ?? 'Present'}`
}

/** "22 April 2024" from an ISO date, for post datelines. */
export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

/** Turns "Aurora Design System" into "aurora-design-system". */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** "YG" from "Yuvrajsinh Gohil" — used by the logo mark. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function currentYear(): number {
  return new Date().getFullYear()
}

/** Extracts `about` from `/#about` so nav links can drive scroll-spy. */
export function hashTarget(href: string): string | null {
  const index = href.indexOf('#')
  return index === -1 ? null : href.slice(index + 1)
}
