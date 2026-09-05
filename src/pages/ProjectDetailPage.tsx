import { Link, Navigate, useParams } from 'react-router'
import { routes } from '@/config/site.config'
import { getProjectBySlug, projects } from '@/data'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { cn } from '@/lib/cn'
import type { ProjectLink } from '@/types'
import { Button, Container, Icon, type IconName } from '@/components/ui'
import { ProjectList, ProjectPlate } from '@/components/common'
import { Reveal } from '@/components/motion'

function formatInlineText(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  if (parts.length === 1) return text

  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded bg-surface/80 px-1.5 py-0.5 font-mono text-[0.875em] text-accent border border-border/60"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-heading">
          {part.slice(2, -2)}
        </strong>
      )
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
    if (linkMatch) {
      const [, label, href] = linkMatch
      if (href.startsWith('/')) {
        return (
          <Link
            key={i}
            to={href}
            className="text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:text-heading hover:decoration-heading"
          >
            {label}
          </Link>
        )
      }
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:text-heading hover:decoration-heading"
        >
          {label}
        </a>
      )
    }
    return part
  })
}

function renderStoryContent(body: string[]) {
  const elements: React.ReactNode[] = []
  let currentList: string[] = []

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="my-2 list-disc space-y-2.5 pl-6 text-foreground/90 marker:text-muted"
        >
          {currentList.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {formatInlineText(item)}
            </li>
          ))}
        </ul>,
      )
      currentList = []
    }
  }

  body.forEach((line, idx) => {
    const trimmed = line.trim()
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
      const text = trimmed.replace(/^[-*•]\s+/, '')
      currentList.push(text)
    } else {
      flushList()
      elements.push(
        <p key={`p-${idx}`} className="leading-relaxed">
          {formatInlineText(line)}
        </p>,
      )
    }
  })

  flushList()
  return elements
}

const linkIcon: Record<ProjectLink['kind'], IconName> = {
  demo: 'externalLink',
  repo: 'github',
  article: 'arrowUpRight',
  design: 'sparkles',
  other: 'arrowUpRight',
}

/** One field of the spec strip: a rule, a micro-label and a value. */
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-4">
      <dt className="text-[0.625rem] tracking-[0.2em] text-muted uppercase">{label}</dt>
      <dd className="font-display mt-2 text-lg leading-tight font-bold text-heading">
        {formatInlineText(value)}
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
            <h1 className="font-display text-4xl leading-[0.95] font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {formatInlineText(project.description)}
            </p>

            {project.links && project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((link, index) => {
                  const isInternal = link.href.startsWith('/')
                  return isInternal ? (
                    <Button
                      key={link.href}
                      to={link.href}
                      variant={index === 0 ? 'primary' : 'secondary'}
                      size="sm"
                      leadingIcon={<Icon name={linkIcon[link.kind]} />}
                    >
                      {link.label}
                    </Button>
                  ) : (
                    <Button
                      key={link.href}
                      href={link.href}
                      variant={index === 0 ? 'primary' : 'secondary'}
                      size="sm"
                      leadingIcon={<Icon name={linkIcon[link.kind]} />}
                    >
                      {link.label}
                    </Button>
                  )
                })}
              </div>
            )}
          </div>

          <ProjectPlate project={project} className="md:order-2" />
        </Reveal>

        {/* Spec strip: metrics if available */}
        {project.metrics && project.metrics.length > 0 && (
          <Reveal>
            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-x-10">
              {project.metrics.map((metric) => (
                <Spec key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </dl>
          </Reveal>
        )}

        <Reveal>
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

      {/* Free-flow story / README style case study */}
      {project.sections && project.sections.length > 0 && (
        <Container width="editorial" className="pt-14 pb-20 sm:pt-18 sm:pb-28">
          <article className="flex max-w-2xl flex-col gap-10 sm:gap-14">
            {project.sections.map((section, index) => (
              <Reveal key={section.heading ?? index}>
                {section.heading && (
                  <h2 className="font-display text-xl font-bold tracking-tight text-heading sm:text-2xl md:text-[1.65rem]">
                    {section.heading}
                  </h2>
                )}

                <div
                  className={cn(
                    'flex flex-col gap-4 text-base leading-relaxed text-foreground/85 sm:text-[1.05rem]',
                    section.heading && 'mt-5',
                  )}
                >
                  {renderStoryContent(section.body)}
                </div>
              </Reveal>
            ))}
          </article>
        </Container>
      )}

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
