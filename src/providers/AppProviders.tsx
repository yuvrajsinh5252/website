import type { ReactNode } from 'react'
import { MotionProvider } from './MotionProvider'
import { ThemeProvider } from './ThemeProvider'

/** Single place to compose every app-wide provider. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>{children}</MotionProvider>
    </ThemeProvider>
  )
}
