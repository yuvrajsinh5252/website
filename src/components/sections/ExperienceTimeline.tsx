import type { Experience } from '@/types'
import { certifications, experiences } from '@/data'
import { Container, Icon, SectionHeading } from '@/components/ui'
import { CompanyMark } from '@/components/common'
import { Reveal } from '@/components/motion'

function parseDateBoundary(dateStr: string, position: 'start' | 'end'): string {
  const parts = dateStr.split(/\s*[-—–]\s*/)
  if (parts.length >= 2) {
    return position === 'start' ? parts[0].trim() : parts[parts.length - 1].trim()
  }
  return dateStr.trim()
}

/**
 * The aggregated full span of an entry, from the start of its oldest role
 * to the end of its newest role.
 */
function span(station: Experience): string {
  const oldest = station.roles.at(-1)?.dates ?? ''
  const newest = station.roles[0]?.dates ?? ''

  const start = parseDateBoundary(oldest, 'start')
  const end = parseDateBoundary(newest, 'end')

  if (start && end && start !== end) {
    return `${start} — ${end}`
  }
  return start || end
}

function formatInlineLinks(text: string): React.ReactNode {
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const [, label, href] = match
    parts.push(
      <a
        key={match.index}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:text-heading hover:decoration-heading"
      >
        {label}
      </a>,
    )
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

/**
 * The work history: one company per entry, its mark opposite its copy.
 *
 * Each company is carried by a single squircle tile — the logo on white, held
 * at a slight tilt with its own light behind it — and the entries alternate
 * sides down the page so the eye crosses the column rather than running
 * straight down one edge.
 *
 * The writing stays short on purpose: a span, the roles held, and a couple of
 * sentences on the work. Anything longer turns into the résumé it was taken
 * from, which is the one thing this page should not read like.
 *
 * Used as the whole Experience page, so its title renders as the `h1`.
 */
export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative scroll-mt-header py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="experience"
          as="h1"
          title="Experience"
          description="Two places so far"
          className="mb-16 sm:mb-24"
        />

        <ol className="flex flex-col gap-20 sm:gap-28">
          {experiences.map((station, index) => {
            const markFirst = index % 2 === 0

            return (
              <li key={station.id}>
                <article className="grid items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-16">
                  <Reveal
                    className={markFirst ? 'md:order-1' : 'md:order-2'}
                    direction={markFirst ? 'right' : 'left'}
                  >
                    <CompanyMark
                      logo={station.logo}
                      name={station.company}
                      tilt={markFirst ? -4 : 4}
                    />
                  </Reveal>

                  <Reveal
                    className={markFirst ? 'md:order-2' : 'md:order-1'}
                    direction={markFirst ? 'left' : 'right'}
                  >
                    {/* Span and place, set as one quiet line above the name. */}
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.625rem] tracking-[0.2em] text-muted uppercase">
                      <span className="font-mono tabular-nums">{span(station)}</span>
                      <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
                      <span>{station.location}</span>
                    </p>

                    <h2 className="font-display mt-4 text-3xl leading-[0.95] font-bold tracking-tight text-heading sm:text-4xl md:text-5xl">
                      {station.company}
                    </h2>

                    <ul className="mt-6 flex flex-col gap-2">
                      {station.roles.map((role) => (
                        <li
                          key={`${role.title}-${role.dates}`}
                          className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5"
                        >
                          <span className="text-base text-heading">{role.title}</span>
                          <span className="text-xs text-muted tabular-nums">
                            {role.dates}
                          </span>
                          {role.current && (
                            <span className="text-[0.5625rem] tracking-[0.16em] text-accent uppercase">
                              Now
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 max-w-lg leading-relaxed text-foreground">
                      {formatInlineLinks(station.summary)}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-border pt-5">
                      {station.stack && station.stack.length > 0 && (
                        <p className="min-w-0 text-[0.8125rem] text-muted">
                          {station.stack.map((tech, techIndex) => (
                            <span key={tech}>
                              {techIndex > 0 && (
                                <span aria-hidden="true" className="text-border-strong">
                                  {' · '}
                                </span>
                              )}
                              {tech}
                            </span>
                          ))}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {station.projectUrl && (
                          <a
                            href={station.projectUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="focus-ring inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-accent transition-colors duration-200 hocus:text-heading"
                          >
                            <span className="link-underline">
                              {station.projectLabel ??
                                station.projectUrl
                                  .replace(/^https?:\/\//, '')
                                  .replace(/\/$/, '')}
                            </span>
                            <Icon name="externalLink" size={11} />
                          </a>
                        )}

                        {station.companyUrl && (
                          <a
                            href={station.companyUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="focus-ring inline-flex items-center gap-1.5 text-[0.8125rem] text-muted transition-colors duration-200 hocus:text-heading"
                          >
                            <span className="link-underline">
                              {station.companyUrl
                                .replace(/^https?:\/\//, '')
                                .replace(/\/$/, '')}
                            </span>
                            <Icon name="externalLink" size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </article>
              </li>
            )
          })}
        </ol>

        {certifications.length > 0 && (
          <Reveal className="mt-20 sm:mt-28">
            <h2 className="text-[0.625rem] tracking-[0.22em] text-muted uppercase">
              Certified
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
              {certifications.map((certification) => {
                const content = (
                  <>
                    <div className="flex items-baseline gap-2.5 min-w-0">
                      {certification.code && (
                        <span className="font-mono text-xs font-semibold text-accent tabular-nums shrink-0">
                          {certification.code}
                        </span>
                      )}
                      <span className="text-sm font-medium text-heading truncate transition-colors duration-200 group-hover:text-accent">
                        {certification.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 text-xs text-muted">
                      <span>{certification.issuer}</span>
                      {certification.url && (
                        <Icon
                          name="arrowUpRight"
                          size={13}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                        />
                      )}
                    </div>
                  </>
                )

                return certification.url ? (
                  <a
                    key={certification.id}
                    href={certification.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="focus-ring group flex items-center justify-between gap-3.5 rounded-card border border-border bg-surface/40 px-4 py-3.5 sm:px-4.5 sm:py-4 transition-[border-color,background-color,translate] duration-300 ease-out-expo hocus:-translate-y-0.5 hocus:border-accent-border hocus:bg-accent-muted/40"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={certification.id}
                    className="flex items-center justify-between gap-3.5 rounded-card border border-border bg-surface/40 px-4 py-3.5 sm:px-4.5 sm:py-4"
                  >
                    {content}
                  </div>
                )
              })}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
