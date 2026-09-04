import { useState, type JSX } from 'react'
import { siteConfig } from '@/config/site.config'
import { cn } from '@/lib/cn'
import { bodyFonts, displayFonts, loadFont, type FontOption } from './fonts'
import type { MarkProps } from './marks'

/**
 * ⚠️ TEMPORARY — the type half of the logo lab.
 *
 * A mark is only half a wordmark, so the lab lets the type be tried too. The
 * chosen faces are written straight onto the `--font-display` / `--font-sans`
 * tokens on `<html>`, which restyles the whole site live — navigate away and
 * the header, hero and footer are all set in the candidate. Nothing is
 * persisted, so a reload puts it back.
 */

function FontRow({
  label,
  options,
  selectedId,
  onSelect,
}: {
  label: string
  options: FontOption[]
  selectedId: string
  onSelect: (option: FontOption) => void
}) {
  const selected = options.find((option) => option.id === selectedId)

  return (
    <div>
      <h3 className="text-[0.625rem] tracking-[0.22em] text-muted uppercase">{label}</h3>

      <ul className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              onClick={() => onSelect(option)}
              style={{ fontFamily: option.stack }}
              className={cn(
                'focus-ring rounded-pill border px-3 py-1.5 text-sm transition-colors duration-200',
                option.id === selectedId
                  ? 'border-accent-border bg-accent-muted text-accent'
                  : 'border-border text-muted hocus:border-accent-border hocus:text-accent',
              )}
            >
              {option.name}
            </button>
          </li>
        ))}
      </ul>

      {selected && <p className="mt-3 text-sm text-muted">{selected.note}</p>}
    </div>
  )
}

export function TypeLab({ Mark }: { Mark: (props: MarkProps) => JSX.Element }) {
  const [displayId, setDisplayId] = useState(displayFonts[0].id)
  const [bodyId, setBodyId] = useState(bodyFonts[0].id)

  const apply = (property: string, option: FontOption) => {
    loadFont(option)
    document.documentElement.style.setProperty(property, option.stack)
  }

  const reset = () => {
    document.documentElement.style.removeProperty('--font-display')
    document.documentElement.style.removeProperty('--font-sans')
    setDisplayId(displayFonts[0].id)
    setBodyId(bodyFonts[0].id)
  }

  return (
    <section className="surface-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-heading">
            Type
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed">
            Applies to the whole site as you pick, so the header and hero change with
            it. Nothing is saved — reload to go back to the current pair.
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          className="focus-ring shrink-0 rounded-pill border border-border px-4 py-2 text-xs tracking-[0.14em] text-muted uppercase transition-colors duration-200 hocus:border-accent-border hocus:text-accent"
        >
          Reset
        </button>
      </div>

      <div className="mt-7 grid gap-7 sm:grid-cols-2">
        <FontRow
          label="Display"
          options={displayFonts}
          selectedId={displayId}
          onSelect={(option) => {
            setDisplayId(option.id)
            apply('--font-display', option)
          }}
        />

        <FontRow
          label="Body"
          options={bodyFonts}
          selectedId={bodyId}
          onSelect={(option) => {
            setBodyId(option.id)
            apply('--font-sans', option)
          }}
        />
      </div>

      {/* The specimen: the pieces of the site that actually carry the type. */}
      <div className="mt-8 rounded-card border border-border bg-background p-6 sm:p-8">
        <div className="group flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-card border border-border text-accent">
            <Mark className="size-6" />
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
            {siteConfig.name}
          </span>
        </div>

        <p className="font-display mt-7 text-3xl leading-[0.95] font-bold tracking-tight text-heading sm:text-4xl">
          Software developer, and a telescope on the roof
        </p>

        <p className="mt-4 max-w-prose leading-relaxed text-muted">
          {siteConfig.description}
        </p>

        <p className="font-display mt-5 text-xl font-bold text-accent tabular-nums">
          01 · 2026 · 28.5355&deg; N
        </p>
      </div>
    </section>
  )
}
