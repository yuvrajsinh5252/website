import { Outlet, useLocation } from 'react-router'
import * as m from 'motion/react-m'
import { DEV_TOOLS } from '@/config/env'
import { SkyBackground } from '@/components/effects'
import { Footer } from './Footer'
import { Header } from './Header'
import { PalettePreview } from './PalettePreview'
import { ScrollRestoration } from './ScrollRestoration'

/** App shell shared by every route. */
export function RootLayout() {
  const { pathname } = useLocation()

  return (
    <>
      <a
        href="#main"
        className="focus-ring sr-only rounded-pill bg-accent px-4 py-2 text-sm font-medium text-accent-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100"
      >
        Skip to content
      </a>

      <ScrollRestoration />
      <SkyBackground />
      <Header />

      {/*
        * The header is fixed and transparent, so pages own their top spacing.
        *
        * A full viewport of minimum height keeps the footer off the first
        * screen on short pages — otherwise a route with one or two entries
        * lands with the sign-off already visible.
        */}
      <main id="main" className="relative min-h-svh">
        {/*
         * Keying on the path remounts the page, so it fades in on every
         * navigation. There is deliberately no exit animation: an outgoing
         * page would sit in normal flow alongside the incoming one and make
         * the document jump.
         */}
        <m.div
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet />
        </m.div>
      </main>

      <Footer />

      {/* Development-only, gated on VITE_DEV_TOOLS. The flag folds to a
       * literal at build time, so this and the component behind it drop out of
       * a production bundle entirely. */}
      {DEV_TOOLS && <PalettePreview />}
    </>
  )
}
