import { useState } from 'react'
import * as m from 'motion/react-m'
import { AnimatePresence } from 'motion/react'
import { ACCENTS, accentPresets, themeConfig } from '@/config/theme.config'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui'

/**
 * Palette preview switcher.
 *
 * A floating panel for testing cosmic palettes live during development.
 */
export function PalettePreview() {
  const { accent, setAccent } = useTheme()
  const [open, setOpen] = useState(true)

  if (!themeConfig.showPalettePreview) return null

  return (
    <div className="fixed bottom-4 left-4 z-100 print:hidden">
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <m.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-64 rounded-card border border-border bg-surface/95 p-3 shadow-card-hover backdrop-blur-md"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-[0.625rem] tracking-[0.18em] text-muted uppercase">
                Palette preview
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Hide palette preview"
                className="focus-ring grid size-6 place-items-center rounded-pill text-muted transition-colors hocus:text-heading"
              >
                <Icon name="close" size={13} />
              </button>
            </div>

            <ul className="flex flex-col gap-1">
              {ACCENTS.map((value) => {
                const preset = accentPresets[value]
                const selected = accent === value

                return (
                  <li key={value}>
                    <button
                      type="button"
                      onClick={() => setAccent(value)}
                      aria-pressed={selected}
                      className={cn(
                        'focus-ring flex w-full items-center gap-3 rounded-card px-2 py-2 text-left transition-colors duration-200',
                        selected ? 'bg-accent-muted' : 'hocus:bg-surface-muted',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="grid size-7 shrink-0 place-items-center rounded-pill border border-border"
                        style={{ backgroundColor: preset.space }}
                      >
                        <span
                          className="block size-3 rounded-pill"
                          style={{ backgroundColor: preset.swatch }}
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'block text-sm font-medium',
                            selected ? 'text-accent' : 'text-heading',
                          )}
                        >
                          {preset.label}
                        </span>
                        <span className="block truncate text-[0.6875rem] text-muted">
                          {preset.description}
                        </span>
                      </span>

                      {selected && (
                        <Icon name="check" size={14} className="shrink-0 text-accent" />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>

            <p className="mt-3 border-t border-border pt-2 text-[0.625rem] leading-relaxed text-muted">
              Palette switcher for local testing. Visible in development mode.
            </p>
          </m.div>
        ) : (
          <m.button
            key="fab"
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpen(true)}
            aria-label="Show palette preview"
            className="focus-ring grid size-10 place-items-center rounded-pill border border-border bg-surface text-accent shadow-card"
          >
            <Icon name="sparkles" size={16} />
          </m.button>
        )}
      </AnimatePresence>
    </div>
  )
}
