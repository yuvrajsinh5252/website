import { ACCENTS, accentPresets, themeConfig } from '@/config/theme.config'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'

/**
 * Swatch row that swaps the accent palette by setting `data-accent` on <html>.
 * Every accent-derived token (hover, muted, border) recomputes from CSS.
 */
export function AccentPicker({ className }: { className?: string }) {
  const { accent, setAccent } = useTheme()

  if (!themeConfig.showAccentPicker) return null

  return (
    <div
      role="radiogroup"
      aria-label="Accent colour"
      className={cn(
        'flex items-center gap-1.5 rounded-pill border border-border bg-surface px-2 py-1.5',
        className,
      )}
    >
      {ACCENTS.map((value) => {
        const { label, swatch } = accentPresets[value]
        const selected = accent === value

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${label} accent`}
            title={label}
            onClick={() => setAccent(value)}
            className={cn(
              'focus-ring grid size-4 place-items-center rounded-pill transition-[scale,opacity] duration-200',
              selected ? 'scale-100' : 'scale-90 opacity-55 hocus:scale-100 hocus:opacity-100',
            )}
          >
            <span
              aria-hidden="true"
              style={{ backgroundColor: swatch }}
              className={cn(
                'block rounded-pill transition-all duration-200',
                selected
                  ? 'size-2.5 ring-2 ring-border-strong ring-offset-2 ring-offset-surface'
                  : 'size-3.5',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
