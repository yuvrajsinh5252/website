import type { CSSProperties } from 'react'
import type { Project } from '@/types'

/** The fields every project surface needs to draw itself. */
export type ProjectArt = Pick<Project, 'title' | 'cover' | 'logo' | 'icon' | 'iconColor'>

/**
 * Custom properties a project's surfaces are drawn from.
 *
 * Kept out of the component modules so they can stay fast-refreshable, and in
 * one place so the list row, the mark and the case-study plate cannot drift
 * apart on how a project's colour is derived.
 */
export function brandVars(project: ProjectArt): CSSProperties {
  const brand = project.iconColor ?? 'var(--theme-accent)'

  return {
    '--brand': brand,
    /* Lifted towards white so low-contrast brand colours stay readable as type. */
    '--brand-ink': `color-mix(in oklab, ${brand} 72%, white)`,
  } as CSSProperties
}
