/**
 * Typeface options tested in the logo lab workbench.
 */

export interface FontOption {
  id: string
  name: string
  /**
   * Google Fonts `family=` value, requested the first time the face is used.
   * Omitted for the two faces the site already loads in `index.html`.
   */
  spec?: string
  /** The stack written into the token. */
  stack: string
  /** Why it might earn the job. */
  note: string
}

const TAIL = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
const SERIF_TAIL = "Georgia, 'Times New Roman', serif"

/** Faces for headings, the site name and anything set at display scale. */
export const displayFonts: FontOption[] = [
  {
    id: 'bricolage',
    name: 'Bricolage Grotesque',
    stack: `'Bricolage Grotesque', ${TAIL}`,
    note: 'In use now — wide, a little eccentric',
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk',
    spec: 'Space+Grotesk:wght@400;500;700',
    stack: `'Space Grotesk', ${TAIL}`,
    note: 'Technical, drawn for instruments',
  },
  {
    id: 'sora',
    name: 'Sora',
    spec: 'Sora:wght@400;600;800',
    stack: `'Sora', ${TAIL}`,
    note: 'Geometric and calm at large sizes',
  },
  {
    id: 'outfit',
    name: 'Outfit',
    spec: 'Outfit:wght@400;600;800',
    stack: `'Outfit', ${TAIL}`,
    note: 'Neutral geometric, very even colour',
  },
  {
    id: 'syne',
    name: 'Syne',
    spec: 'Syne:wght@400;700;800',
    stack: `'Syne', ${TAIL}`,
    note: 'Loud and art-directed — the boldest option',
  },
  {
    id: 'archivo',
    name: 'Archivo',
    spec: 'Archivo:wght@400;600;800',
    stack: `'Archivo', ${TAIL}`,
    note: 'Editorial grotesque, built for headlines',
  },
  {
    id: 'fraunces',
    name: 'Fraunces',
    spec: 'Fraunces:opsz,wght@9..144,400;9..144,700',
    stack: `'Fraunces', ${SERIF_TAIL}`,
    note: 'Serif with a wonky, old-catalogue warmth',
  },
  {
    id: 'instrument-serif',
    name: 'Instrument Serif',
    spec: 'Instrument+Serif:ital@0;1',
    stack: `'Instrument Serif', ${SERIF_TAIL}`,
    note: 'High-contrast serif — quiet, literary',
  },
]

/** Faces for body copy, labels and the interface. */
export const bodyFonts: FontOption[] = [
  {
    id: 'inter',
    name: 'Inter',
    stack: `Inter, ${TAIL}`,
    note: 'In use now — the safe default',
  },
  {
    id: 'manrope',
    name: 'Manrope',
    spec: 'Manrope:wght@400;500;700',
    stack: `'Manrope', ${TAIL}`,
    note: 'Rounder than Inter, friendlier',
  },
  {
    id: 'work-sans',
    name: 'Work Sans',
    spec: 'Work+Sans:wght@400;500;600',
    stack: `'Work Sans', ${TAIL}`,
    note: 'Open apertures, easy at small sizes',
  },
  {
    id: 'ibm-plex-sans',
    name: 'IBM Plex Sans',
    spec: 'IBM+Plex+Sans:wght@400;500;600',
    stack: `'IBM Plex Sans', ${TAIL}`,
    note: 'Engineering-desk neutral',
  },
  {
    id: 'space-grotesk-body',
    name: 'Space Grotesk',
    spec: 'Space+Grotesk:wght@400;500;700',
    stack: `'Space Grotesk', ${TAIL}`,
    note: 'Matches the display face for a single-font site',
  },
  {
    id: 'source-serif',
    name: 'Source Serif 4',
    spec: 'Source+Serif+4:opsz,wght@8..60,400;8..60,600',
    stack: `'Source Serif 4', ${SERIF_TAIL}`,
    note: 'Serif body copy — reads long-form',
  },
]

const requested = new Set<string>()

/** Requests a face from Google Fonts once, the first time it is selected. */
export function loadFont(option: FontOption): void {
  if (!option.spec || requested.has(option.id)) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${option.spec}&display=swap`
  document.head.appendChild(link)

  requested.add(option.id)
}
