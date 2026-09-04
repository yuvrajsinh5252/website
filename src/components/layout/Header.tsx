import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { navItems, routes } from '@/config/site.config'
import { profile } from '@/data'
import { cn } from '@/lib/cn'
import { SunMark } from '@/components/brand/SunMark'
import { Icon } from '@/components/ui'

function isActive(pathname: string, href: string): boolean {
  if (href.startsWith('/#')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * A deliberately minimal bar: the sun mark on the left, letterspaced links on
 * the right, no background of its own so the sky shows straight through.
 *
 * The wrapper ignores pointer events so it never blocks the hero beneath it;
 * only the bar's own contents are interactive.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (!menuOpen) return

    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto flex items-center justify-between px-5 pt-5 pb-4 sm:px-8 sm:pt-7 md:px-12">
        <Link
          to={routes.home}
          aria-label={`${profile.name} — home`}
          className="focus-ring group text-heading transition-colors duration-200 hocus:text-accent"
        >
          <SunMark className="size-6 sm:size-7" />
        </Link>

        <nav aria-label="Primary" className="hidden items-baseline gap-6 sm:flex sm:gap-9">
          {navItems.map((link) => {
            const active = isActive(pathname, link.href)

            return (
              <Link
                key={link.id}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'focus-ring relative text-[0.6875rem] font-medium tracking-[0.18em] uppercase transition-colors duration-200 sm:text-xs',
                  'after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-accent after:transition-[width] after:duration-300 after:ease-out-expo',
                  active
                    ? 'text-accent after:w-full'
                    : 'text-muted after:w-0 hocus:text-heading hocus:after:w-full',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="focus-ring -my-2 grid size-9 place-items-center rounded-pill text-heading transition-colors duration-200 hocus:text-accent sm:hidden"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute inset-x-0 top-full mx-5 rounded-card border border-border bg-background/95 p-2 shadow-card-hover backdrop-blur-xl sm:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((link, index) => (
                <m.li
                  key={link.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.25 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="focus-ring block rounded-card px-4 py-3 text-xs font-medium tracking-[0.18em] text-heading uppercase transition-colors duration-200 hocus:bg-surface-muted hocus:text-accent"
                  >
                    {link.label}
                  </Link>
                </m.li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
