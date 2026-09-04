import { createContext } from 'react'
import type { Accent, ResolvedTheme, ThemeMode } from '@/config/theme.config'

export interface ThemeContextValue {
  /** User preference, may be `system`. */
  mode: ThemeMode
  /** What is actually applied to <html> right now. */
  resolvedTheme: ResolvedTheme
  accent: Accent
  setMode: (mode: ThemeMode) => void
  /** Cycles light → dark → system. */
  cycleMode: () => void
  setAccent: (accent: Accent) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
