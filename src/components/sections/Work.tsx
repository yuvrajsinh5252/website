import { Link } from 'react-router'
import { routes } from '@/config/site.config'
import { currentPosition, projects } from '@/data'
import { Container, Icon } from '@/components/ui'
import { ProjectMark } from '@/components/common'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion'

const recent = projects.filter((project) => project.slug !== 'portfolio').slice(0, 4)

/**
 * A status strip rather than a titled section: where I am now, and the last
 * few things I shipped.
 *
 * There is no section heading — the two column labels already say what each
 * side is, and stacking a title above them just repeated the point.
 */
export function Work() {
  const { company, role } = currentPosition

  return (
    <section
      id="work"
      aria-label="Current work"
      className="relative scroll-mt-header py-16 sm:py-20"
    >
      <Container width="editorial">
        <div className="grid gap-12 border-t border-border pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
          <Reveal>
            <p className="eyebrow mb-6">Currently</p>

            {company && role && (
              <div>
                <div className="flex items-center gap-4">
                  {company.logo && (
                    <img
                      src={company.logo}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-12 shrink-0 rounded-card bg-white/95 object-contain p-1.5"
                    />
                  )}

                  <p className="font-display text-2xl leading-tight font-bold tracking-tight text-heading sm:text-3xl">
                    {company.company}
                  </p>
                </div>

                <p className="mt-5 text-lg text-foreground">{role.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {company.location} · {role.dates}
                </p>
              </div>
            )}

            <Link
              to={routes.experience}
              className="focus-ring group mt-8 inline-flex items-center gap-2 text-[0.8125rem] tracking-[0.14em] text-accent uppercase transition-colors duration-200 hocus:text-heading"
            >
              Full experience
              <Icon
                name="arrowRight"
                size={14}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          <Reveal direction="left">
            <p className="mb-6 text-[0.625rem] tracking-[0.22em] text-muted uppercase">
              Recent work
            </p>

            <StaggerGroup as="ul" stagger={0.05} className="flex flex-col">
              {recent.map((project) => (
                <StaggerItem as="li" key={project.slug}>
                  <Link
                    to={routes.project(project.slug)}
                    className="focus-ring group flex items-center gap-3.5 border-b border-border py-3 transition-colors duration-300 hocus:border-accent-border"
                  >
                    <ProjectMark
                      project={project}
                      size="sm"
                      className="group-hover:-translate-y-0.5 group-hover:shadow-card"
                    />

                    <span className="font-display text-lg font-bold text-heading transition-colors duration-200 group-hover:text-accent sm:text-xl">
                      {project.title}
                    </span>

                    {/* Leaders, as in an index. */}
                    <span
                      aria-hidden="true"
                      className="h-px min-w-4 flex-1 bg-border transition-colors duration-300 group-hover:bg-accent-border"
                    />

                    <span className="shrink-0 text-sm text-muted tabular-nums">
                      {project.year}
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Link
              to={routes.projects}
              className="focus-ring group mt-8 inline-flex items-center gap-2 text-[0.8125rem] tracking-[0.14em] text-accent uppercase transition-colors duration-200 hocus:text-heading"
            >
              All projects
              <Icon
                name="arrowRight"
                size={14}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
