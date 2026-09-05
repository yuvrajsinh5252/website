import { THEME_MODES, themeConfig, type ThemeMode } from '@/config/theme.config'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'
import { Icon, type IconName } from './icons'

const modeMeta: Record<ThemeMode, { icon: IconName; label: string }> = {
  light: { icon: 'sun', label: 'Light' },
  dark: { icon: 'moon', label: 'Dark' },
  system: { icon: 'system', label: 'System' },
}

/**
 * Segmented light / dark / system switch.
 * Collapses to a single cycling button on small screens.
 *
 * Hidden unless `themeConfig.showThemeToggle` is on: the site is designed as
 * one dark cosmic look, but the machinery behind it still works.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { mode, setMode, cycleMode } = useTheme()

  if (!themeConfig.showThemeToggle) return null

  return (
    <>
      <div
        role="radiogroup"
        aria-label="Colour theme"
        className={cn(
          'hidden items-center gap-0.5 rounded-pill border border-border bg-surface p-0.5 sm:inline-flex',
          className,
        )}
      >
        {THEME_MODES.map((value) => {
          const { icon, label } = modeMeta[value]
          const selected = mode === value

          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${label} theme`}
              title={`${label} theme`}
              onClick={() => setMode(value)}
              className={cn(
                'focus-ring grid size-8 place-items-center rounded-pill transition-colors duration-200',
                selected
                  ? 'bg-accent-muted text-accent'
                  : 'text-muted hocus:text-heading hocus:bg-surface-muted',
              )}
            >
              <Icon name={icon} size={16} />
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={cycleMode}
        aria-label={`Theme: ${modeMeta[mode].label}. Switch theme`}
        title={`Theme: ${modeMeta[mode].label}`}
        className={cn(
          'focus-ring grid size-10 place-items-center rounded-pill border border-border bg-surface text-heading transition-colors duration-200 sm:hidden',
          className,
        )}
      >
        <Icon name={modeMeta[mode].icon} size={18} />
      </button>
    </>
  )
}
