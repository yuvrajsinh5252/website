import { aboutFrames, education, profile } from '@/data'
import { Container } from '@/components/ui'
import { PlateWall } from '@/components/common'
import { Reveal } from '@/components/motion'

/**
 * Who I am, beside a wall of photographs.
 *
 * The plates are laid out by `PlateWall` as glass plates on a desk —
 * overlapping, at hand angles, drifting against the pointer.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative scroll-mt-header py-20 sm:py-28"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-20">
          <PlateWall frames={aboutFrames} className="order-2 lg:order-1" />

          <Reveal direction="left" className="order-1 lg:order-2">
            <p className="eyebrow mb-4">About</p>

            <h2
              id="about-title"
              className="font-display text-4xl leading-[0.95] font-bold tracking-tight sm:text-5xl md:text-[3.4rem]"
            >
              {typeof profile.aboutHeading === 'string' ? (
                profile.aboutHeading
              ) : profile.aboutHeading ? (
                <>
                  {profile.aboutHeading.line1}
                  {profile.aboutHeading.line2 && (
                    <>
                      <br />
                      {profile.aboutHeading.line2}
                    </>
                  )}
                </>
              ) : (
                'Engineering software'
              )}
            </h2>

            <div className="mt-8 flex max-w-lg flex-col gap-4 text-base leading-relaxed sm:text-[1.05rem]">
              {profile.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {profile.dateline && (
              <p className="mt-8 text-sm tracking-[0.18em] text-muted uppercase">
                {profile.dateline}
              </p>
            )}

            <div className="mt-10 border-t border-border pt-8">
              <h3 className="text-[0.625rem] tracking-[0.22em] text-muted uppercase">
                Studied at
              </h3>

              <ul className="mt-6 flex flex-col gap-6">
                {education.map((entry) => (
                  <li key={entry.id} className="flex items-center gap-5">
                    {entry.logo && (
                      <img
                        src={entry.logo}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="size-14 shrink-0 object-contain sm:size-16"
                      />
                    )}

                    <div className="min-w-0">
                      <p className="text-base font-medium text-heading">{entry.degree}</p>

                      <p className="mt-1 text-sm text-foreground">
                        {entry.institutionUrl ? (
                          <a
                            href={entry.institutionUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="focus-ring link-underline transition-colors duration-200 hocus:text-accent"
                          >
                            {entry.institution}
                          </a>
                        ) : (
                          entry.institution
                        )}
                      </p>

                      <p className="mt-1 text-xs text-muted tabular-nums">
                        {entry.dates}
                        {entry.location ? ` · ${entry.location}` : ''}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
