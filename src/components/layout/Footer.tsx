import { Link } from 'react-router'
import * as m from 'motion/react-m'
import { footerConfig, navItems, routes, siteConfig } from '@/config/site.config'
import { profile } from '@/data'
import { useLocalTime } from '@/hooks/useLocalTime'
import { useWeather } from '@/hooks/useWeather'
import { currentYear } from '@/lib/utils'
import { Container, Icon } from '@/components/ui'
import { StationReadout } from '@/components/common'

const internalLinks = [{ id: 'home', label: 'Home', href: routes.home }, ...navItems]

/**
 * Closing panel of the site, and the one place to get in touch.
 *
 * Reads as an observatory sign-off: a faint horizon rule, the name at display
 * scale, three short columns, and a status line with the local time.
 *
 * On phones the two lists lay out as wrapped rows rather than stacks — four
 * links down a column and three status lines under them cost most of a
 * viewport for very little, so they run horizontally until there is width for
 * the column layout.
 */
export function Footer() {
  const time = useLocalTime(footerConfig.timeZone)
  const weather = useWeather(
    footerConfig.coordinates.latitude,
    footerConfig.coordinates.longitude,
  )

  return (
    <footer id="contact" className="relative mt-8 scroll-mt-header overflow-hidden">
      {/* Horizon: a hairline that brightens towards the centre. */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--theme-accent-border) 30%, var(--theme-accent) 50%, var(--theme-accent-border) 70%, transparent)',
        }}
      />

      {/* Glow sitting just under the horizon line. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 0%, var(--theme-accent-muted) 0%, transparent 70%)',
        }}
      />

      <Container className="relative pt-12 pb-8 sm:pt-20 sm:pb-10">
        <div className="grid gap-9 sm:gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Link
              to={routes.home}
              className="focus-ring group inline-block"
              aria-label={`${siteConfig.name} — home`}
            >
              <span className="font-display block text-3xl leading-[0.95] font-extrabold tracking-tight text-heading transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                {siteConfig.name}
              </span>
            </Link>

            <p className="mt-4 max-w-sm leading-relaxed text-muted">
              {footerConfig.signoff}
            </p>

            <ul className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8">
              {profile.socials.map((social, index) => {
                const external = social.href.startsWith('http')

                return (
                  <m.li
                    key={social.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <a
                      href={social.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer noopener' : undefined}
                      aria-label={social.label}
                      title={social.username ?? social.label}
                      className="focus-ring group relative grid size-9 place-items-center rounded-pill border border-border text-muted transition-[color,border-color,translate,background-color] duration-300 hocus:-translate-y-1 hocus:border-accent-border hocus:bg-accent-muted sm:size-10"
                    >
                      <Icon name={social.icon} size={16} style={{ color: social.color }} />
                    </a>
                  </m.li>
                )
              })}
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            <nav aria-label="Footer">
              <h2 className="text-[0.625rem] tracking-[0.22em] text-muted uppercase">
                Navigate
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 sm:mt-5 sm:flex-col sm:gap-3">
                {internalLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.href}
                      className="focus-ring group inline-flex items-center gap-2 text-sm text-foreground transition-colors duration-200 hocus:text-accent"
                    >
                      {/* The growing rule would shove its neighbours along the
                       * wrapped row, so it only appears once the list is a
                       * column. */}
                      <span
                        aria-hidden="true"
                        className="hidden h-px w-0 bg-accent transition-[width] duration-300 ease-out-expo group-hover:w-4 sm:block"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-[0.625rem] tracking-[0.22em] text-muted uppercase">
                Say hello
              </h2>

              <a
                href={`mailto:${profile.email}`}
                className="focus-ring link-underline mt-4 inline-block text-sm break-all text-accent sm:mt-5"
              >
                {profile.email}
              </a>

              <StationReadout
                location={profile.location}
                coordinates={footerConfig.coordinates}
                time={time}
                zoneLabel={footerConfig.zoneLabel}
                weather={weather}
                className="mt-5"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:mt-14">
          <p>
            &copy; {currentYear()} {siteConfig.name}
          </p>

          <p>{footerConfig.origin}</p>
        </div>
      </Container>
    </footer>
  )
}
