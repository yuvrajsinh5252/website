import type { Experience } from '@/types'
import { certifications, experiences } from '@/data'
import { Container, Icon, SectionHeading } from '@/components/ui'
import { CompanyMark } from '@/components/common'
import { Reveal } from '@/components/motion'

/**
 * The full span of an entry, taken from its oldest and newest role.
 *
 * Roles are stored newest first and their dates are free text, so this reads
 * the start of the last one and the end of the first rather than parsing them.
 */
function span(station: Experience): string {
  const start = (station.roles.at(-1)?.dates ?? '').split('—')[0]
  const end = (station.roles[0]?.dates ?? '').split('—').at(-1)
  return `${start?.trim() ?? ''} — ${end?.trim() ?? ''}`
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
          description="Two places so far, and what I actually did at each."
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
                      {station.summary}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
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

                      {station.companyUrl && (
                        <a
                          href={station.companyUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="focus-ring inline-flex items-center gap-1.5 text-[0.8125rem] text-accent transition-colors duration-200 hocus:text-heading"
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

            <ul className="rule-list mt-5">
              {certifications.map((certification) => (
                <li
                  key={certification.id}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3.5"
                >
                  {certification.code && (
                    <span className="font-mono text-xs text-accent tabular-nums">
                      {certification.code}
                    </span>
                  )}
                  <span className="text-sm text-heading">{certification.name}</span>
                  <span className="text-xs text-muted">{certification.issuer}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
