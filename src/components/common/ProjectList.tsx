import { Link } from 'react-router'
import { routes } from '@/config/site.config'
import type { Project } from '@/types'
import { brandVars } from '@/lib/brand'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui'
import { StaggerGroup, StaggerItem } from '@/components/motion'
import { ProjectMark } from './ProjectMark'

/** Technologies shown per project; the rest are on the case-study page. */
const MAX_STACK = 4

const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  'in-progress': 'In progress',
  archived: 'Archived',
  concept: 'Concept',
}

export interface ProjectRowProps {
  project: Project
  className?: string
}

/**
 * One project in the index.
 *
 * The whole row is a link to the case study, with the cover art standing in
 * the left rail. Everything that responds to the pointer is drawn in the
 * project's *own* colour rather than the site accent — the wash and the title
 * both pick it up — so running down the list feels like passing a series of
 * different things rather than the same card eight times.
 */
export function ProjectRow({ project, className }: ProjectRowProps) {
  const demo = project.links?.find((link) => link.kind === 'demo')
  const repo = project.links?.find((link) => link.kind === 'repo')

  return (
    <article
      style={brandVars(project)}
      className={cn(
        'group relative isolate grid grid-cols-[3.25rem_1fr] gap-x-4 py-7 sm:grid-cols-[4rem_1fr] sm:gap-x-6 sm:py-9',
        className,
      )}
    >
      {/*
       * Wash in the project's colour, bled to the container edges. Kept faint
       * on purpose: at full strength eight of these in a row read as eight lit
       * panels rather than as a list you are moving down.
       */}
      <span
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, color-mix(in oklab, var(--brand) 6%, transparent), transparent 58%)',
        }}
        className="pointer-events-none absolute inset-y-0 -inset-x-4 -z-10 rounded-card opacity-0 transition-opacity duration-500 ease-out-expo group-hover:opacity-100 sm:-inset-x-6"
      />

      <ProjectMark
        project={project}
        className="mt-0.5 group-hover:-translate-y-1 group-hover:shadow-card-hover"
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-display text-2xl font-bold tracking-tight text-heading transition-colors duration-300 group-hover:text-(--brand-ink) sm:text-3xl">
            <Link
              to={routes.project(project.slug)}
              className="focus-ring after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </Link>
          </h2>

          <p className="flex shrink-0 items-center gap-2.5 text-sm text-muted tabular-nums">
            {project.status !== 'live' && (
              <span className="text-[0.625rem] tracking-[0.14em] uppercase">
                {statusLabel[project.status]}
              </span>
            )}
            {project.year}
          </p>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          {/* Set as a line rather than pills: eight rows of chips read as a form. */}
          <p className="min-w-0 text-[0.8125rem] text-muted">
            {project.stack.slice(0, MAX_STACK).map((tech, index) => (
              <span key={tech}>
                {index > 0 && (
                  <span aria-hidden="true" className="text-border-strong">
                    {' · '}
                  </span>
                )}
                {tech}
              </span>
            ))}
          </p>

          {/* Above the stretched link, so these stay clickable. */}
          <div className="relative z-10 flex items-center gap-1.5">
            {demo && (
              <a
                href={demo.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} — open live site`}
                title="Live site"
                className="focus-ring grid size-9 place-items-center rounded-pill border border-border text-muted transition-[color,border-color,background-color] duration-200 hocus:border-accent-border hocus:bg-accent-muted hocus:text-accent"
              >
                <Icon name="externalLink" size={14} />
              </a>
            )}

            {repo && (
              <a
                href={repo.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} — view source`}
                title="Source"
                className="focus-ring grid size-9 place-items-center rounded-pill border border-border text-muted transition-[color,border-color,background-color] duration-200 hocus:border-accent-border hocus:bg-accent-muted hocus:text-accent"
              >
                <Icon name="github" size={14} />
              </a>
            )}

            {/* Affordance for the stretched case-study link. */}
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-pill border border-transparent text-muted transition-[color,translate] duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-(--brand-ink)"
            >
              <Icon name="arrowRight" size={16} />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export interface ProjectListProps {
  projects: Project[]
  className?: string
}

/** Hairline-separated list of project rows. */
export function ProjectList({ projects, className }: ProjectListProps) {
  if (projects.length === 0) {
    return <p className="text-muted">No projects yet. Check back soon.</p>
  }

  return (
    <StaggerGroup as="ol" stagger={0.06} className={cn('rule-list', className)}>
      {projects.map((project) => (
        <StaggerItem as="li" key={project.slug}>
          <ProjectRow project={project} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
