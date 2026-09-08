import type { ReactNode } from 'react'
import { MotionProvider } from './MotionProvider'
import { SmoothScrollProvider } from './SmoothScrollProvider'
import { ThemeProvider } from './ThemeProvider'

/** Single place to compose every app-wide provider. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </MotionProvider>
    </ThemeProvider>
  )
}
