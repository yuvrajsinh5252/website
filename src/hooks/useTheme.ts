import { useContext } from 'react'
import { ThemeContext } from '@/providers/theme-context'

/** Access and change the theme mode / accent. Must be inside `<ThemeProvider>`. */
export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }

  return context
}
