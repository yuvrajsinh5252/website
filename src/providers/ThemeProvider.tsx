import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ACCENTS,
  THEME_MODES,
  themeConfig,
  type Accent,
  type ResolvedTheme,
  type ThemeMode,
} from '@/config/theme.config'
import { ThemeContext, type ThemeContextValue } from './theme-context'

const DARK_QUERY = '(prefers-color-scheme: dark)'

function readStored<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = window.localStorage.getItem(key)
    return allowed.includes(stored as T) ? (stored as T) : fallback
  } catch {
    return fallback
  }
}

function persist(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* private mode / storage disabled — preference just won't survive a reload */
  }
}

function systemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

/**
 * Owns the theme state and mirrors it onto <html>:
 *   - `class="dark"`      → drives the Tailwind `dark:` variant
 *   - `style.color-scheme` → drives the `light-dark()` tokens in index.css
 *   - `data-accent`        → selects the accent palette
 *
 * The matching pre-paint script lives in index.html.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() =>
    readStored(themeConfig.storageKeys.mode, THEME_MODES, themeConfig.defaultMode),
  )
  const [accent, setAccentState] = useState<Accent>(() =>
    readStored(themeConfig.storageKeys.accent, ACCENTS, themeConfig.defaultAccent),
  )
  const [systemPreference, setSystemPreference] = useState<ResolvedTheme>(() => systemTheme())

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const onChange = (event: MediaQueryListEvent) => {
      setSystemPreference(event.matches ? 'dark' : 'light')
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const resolvedTheme: ResolvedTheme = mode === 'system' ? systemPreference : mode

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
    root.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  useEffect(() => {
    document.documentElement.dataset.accent = accent
  }, [accent])

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
    persist(themeConfig.storageKeys.mode, next)
  }, [])

  const setAccent = useCallback((next: Accent) => {
    setAccentState(next)
    persist(themeConfig.storageKeys.accent, next)
  }, [])

  const cycleMode = useCallback(() => {
    setModeState((current) => {
      const next = THEME_MODES[(THEME_MODES.indexOf(current) + 1) % THEME_MODES.length]
      persist(themeConfig.storageKeys.mode, next)
      return next
    })
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, resolvedTheme, accent, setMode, setAccent, cycleMode }),
    [mode, resolvedTheme, accent, setMode, setAccent, cycleMode],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
