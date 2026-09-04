import { Navigate, useParams } from 'react-router'
import { routes } from '@/config/site.config'
import { getProjectBySlug, projects } from '@/data'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import type { Project, ProjectLink } from '@/types'
import { Button, Container, Icon, type IconName } from '@/components/ui'
import { ProjectList, ProjectPlate } from '@/components/common'
import { Reveal } from '@/components/motion'

const linkIcon: Record<ProjectLink['kind'], IconName> = {
  demo: 'externalLink',
  repo: 'github',
  article: 'arrowUpRight',
  design: 'sparkles',
  other: 'arrowUpRight',
}

const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  'in-progress': 'In progress',
  archived: 'Archived',
  concept: 'Concept',
}

/** One field of the spec strip: a rule, a micro-label and a value. */
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-4">
      <dt className="text-[0.625rem] tracking-[0.2em] text-muted uppercase">{label}</dt>
      <dd className="font-display mt-2 text-lg leading-tight font-bold text-heading">
        {value}
      </dd>
    </div>
  )
}

/**
 * The case study for one project.
 *
 * Built as a masthead rather than a stack of chips: the plate sits beside the
 * title, the facts run underneath as a hairline spec strip, and the prose is
 * set in a single measured column with its section labels in the margin. The
 * only coloured element on the page is the project's own mark, which is what
 * makes one case study look different from the next.
 */
export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  useDocumentMeta(project?.title, project?.summary)

  if (!project) {
    return <Navigate to={routes.projects} replace />
  }

  const related = projects.filter((entry) => entry.slug !== project.slug).slice(0, 3)

  return (
    <div className="pt-header">
      <Container width="editorial" className="pt-10 sm:pt-14">
        <Button
          to={routes.projects}
          variant="ghost"
          size="sm"
          leadingIcon={<Icon name="arrowLeft" />}
          className="-ml-3"
        >
          All projects
        </Button>

        {/* Masthead. */}
        <Reveal className="mt-8 grid items-center gap-9 md:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] md:gap-12 lg:gap-16">
          <div className="md:order-1">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] tracking-[0.18em] text-muted uppercase">
              <span className="tabular-nums">{project.year}</span>
              <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
              <span className={project.status === 'live' ? 'text-accent' : undefined}>
                {statusLabel[project.status]}
              </span>
            </p>

            <h1 className="font-display mt-4 text-4xl leading-[0.95] font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {project.description}
            </p>

            {project.links && project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((link, index) => (
                  <Button
                    key={link.href}
                    href={link.href}
                    variant={index === 0 ? 'primary' : 'secondary'}
                    size="sm"
                    leadingIcon={<Icon name={linkIcon[link.kind]} />}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <ProjectPlate project={project} className="md:order-2" />
        </Reveal>

        {/* Spec strip: the facts, without a single chip. */}
        <Reveal>
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-x-10">
            <Spec label="Year" value={project.year} />
            <Spec label="Status" value={statusLabel[project.status]} />
            {project.metrics
              ?.slice(0, 2)
              .map((metric) => (
                <Spec key={metric.label} label={metric.label} value={metric.value} />
              ))}
          </dl>

          <div className="mt-10 border-t border-border pt-4">
            <p className="text-[0.625rem] tracking-[0.2em] text-muted uppercase">
              Built with
            </p>
            <p className="mt-3 leading-relaxed text-foreground">
              {project.stack.map((tech, index) => (
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
          </div>
        </Reveal>
      </Container>

      {/* Prose, with its section labels set out in the margin. */}
      <Container width="editorial" className="pt-16 pb-20 sm:pt-20 sm:pb-28">
        <div className="flex flex-col gap-14 sm:gap-16">
          {project.highlights && project.highlights.length > 0 && (
            <Reveal className="grid gap-4 sm:grid-cols-[minmax(0,8rem)_minmax(0,1fr)] sm:gap-10">
              <h2 className="text-[0.625rem] tracking-[0.2em] text-muted uppercase sm:pt-2">
                Highlights
              </h2>

              <ul className="flex max-w-2xl flex-col gap-3.5">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3.5 leading-relaxed">
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-accent" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {project.sections?.map((section) => (
            <Reveal
              key={section.heading}
              className="grid gap-4 sm:grid-cols-[minmax(0,8rem)_minmax(0,1fr)] sm:gap-10"
            >
              <h2 className="text-[0.625rem] tracking-[0.2em] text-muted uppercase sm:pt-2">
                {section.heading}
              </h2>

              <div className="flex max-w-2xl flex-col gap-4 leading-relaxed">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {related.length > 0 && (
        <div className="border-t border-border">
          <Container width="editorial" className="py-16 sm:py-20">
            <h2 className="eyebrow mb-10">Keep reading</h2>
            <ProjectList projects={related} />
          </Container>
        </div>
      )}
    </div>
  )
}
