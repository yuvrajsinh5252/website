import { useRef, useState } from 'react'
import { markCandidates, type MarkCandidate } from '@/components/brand/candidates'
import { TypeLab } from '@/components/brand/TypeLab'
import { siteConfig } from '@/config/site.config'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { cn } from '@/lib/cn'
import { Container, SectionHeading } from '@/components/ui'

/**
 * Brand mark laboratory and workbench.
 *
 * An interactive testbed for testing brand mark candidates at real favicon sizes,
 * testing hover animations, and previewing marks in the browser tab.
 */

/** Colour baked into exported favicons, since `currentColor` has nothing to inherit. */
const EXPORT_INK = '#dbe4f2'

/**
 * Serialises a rendered mark into a standalone SVG data URI.
 *
 * Tailwind classes are dropped on the way out — they would not resolve in a
 * favicon anyway, which conveniently leaves every mark in its resting state.
 * No backdrop is added: the marks are silhouettes, and a plate behind them
 * only shows up as a square against a rounded tab strip.
 */
function toFaviconDataUri(source: SVGSVGElement): string {
  const clone = source.cloneNode(true) as SVGSVGElement

  clone.removeAttribute('class')
  clone.setAttribute('width', '32')
  clone.setAttribute('height', '32')
  clone.setAttribute('style', `color:${EXPORT_INK}`)
  clone.querySelectorAll('[class]').forEach((node) => node.removeAttribute('class'))

  const markup = new XMLSerializer().serializeToString(clone)
  return `data:image/svg+xml,${encodeURIComponent(markup)}`
}

function CandidateCard({
  candidate,
  isActive,
  onApply,
}: {
  candidate: MarkCandidate
  isActive: boolean
  onApply: (uri: string, id: string) => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const { Mark } = candidate

  return (
    <article className="surface-card flex flex-col gap-6 p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-heading">
            {candidate.name}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed">{candidate.idea}</p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (svgRef.current) onApply(toFaviconDataUri(svgRef.current), candidate.id)
          }}
          className={cn(
            'focus-ring shrink-0 rounded-pill border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-colors duration-200',
            isActive
              ? 'border-accent-border bg-accent-muted text-accent'
              : 'border-border text-muted hocus:border-accent-border hocus:text-accent',
          )}
        >
          {isActive ? 'In the tab' : 'Try in tab'}
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-8">
        {/* Hero size — hover here for the easter egg. */}
        <div className="group grid size-28 shrink-0 place-items-center rounded-card border border-border bg-background text-accent">
          <Mark ref={svgRef} className="size-16" />
        </div>

        {/* The sizes that actually matter. */}
        {[32, 24, 16].map((size) => (
          <div key={size} className="group flex flex-col items-center gap-2">
            <div
              className="grid place-items-center text-accent"
              style={{ width: size, height: size }}
            >
              <Mark style={{ width: size, height: size }} />
            </div>
            <span className="text-[0.625rem] text-muted tabular-nums">{size}px</span>
          </div>
        ))}

        {/* A browser tab, roughly to scale. */}
        <div className="group flex items-center gap-2 rounded-t-lg border border-border bg-surface-muted px-3 py-2">
          <Mark className="size-4 shrink-0 text-accent" />
          <span className="text-xs text-foreground">yuvrajsinh.dev</span>
        </div>
      </div>

      <p className="border-t border-border pt-4 text-sm text-muted">
        <span className="text-accent">Easter egg — </span>
        {candidate.easterEgg}
      </p>
    </article>
  )
}

export default function LogoLabPage() {
  const [activeId, setActiveId] = useState<string | null>(null)

  useDocumentMeta('Logo lab', 'Candidate brand marks for the site.')

  const applyFavicon = (uri: string, id: string) => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.type = 'image/svg+xml'
    link.href = uri
    setActiveId(id)
  }

  /* The specimen carries whichever mark was last pushed into the tab. */
  const specimenMark =
    markCandidates.find((candidate) => candidate.id === activeId) ?? markCandidates[0]

  return (
    <div className="pt-header">
      <Container width="editorial" className="py-20 sm:py-24">
        <SectionHeading
          as="h1"
          eyebrow="Workbench"
          title="Logo lab"
          description={`${markCandidates.length} candidate marks, and the type to set them in. Hover each mark for its easter egg, push any of them into the browser tab, and try a typeface across the whole site.`}
          className="mb-12"
        />

        <TypeLab Mark={specimenMark.Mark} />

        <div className="mt-6 flex flex-col gap-6">
          {markCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isActive={activeId === candidate.id}
              onApply={applyFavicon}
            />
          ))}
        </div>

        {/* How the mark reads in a search result. */}
        <section className="mt-16">
          <h2 className="eyebrow mb-6">In a search result</h2>

          <div className="flex flex-col gap-5">
            {markCandidates.slice(0, 3).map(({ id, name, Mark }) => (
              <div key={id} className="group flex items-start gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border bg-surface text-accent">
                  <Mark className="size-4" />
                </span>

                <div className="min-w-0">
                  <p className="text-sm text-heading">{siteConfig.name}</p>
                  <p className="text-xs text-muted">yuvrajsinh.dev</p>
                  <p className="mt-1 text-lg text-accent">
                    {siteConfig.name} — Software Developer
                    <span className="ml-2 text-xs text-muted">({name})</span>
                  </p>
                  <p className="mt-1 max-w-xl text-sm text-muted">
                    {siteConfig.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  )
}
