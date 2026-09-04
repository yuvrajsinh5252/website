import type { SVGProps } from 'react'

export type SunMarkProps = SVGProps<SVGSVGElement>

/* SVG needs an explicit origin and box to rotate or scale sanely. */
const about = (x: number, y: number) => ({
  transformOrigin: `${x}px ${y}px`,
  transformBox: 'view-box' as const,
})

/**
 * The site's mark: a sun, drawn to survive a favicon.
 *
 * Weight is the whole design brief. A tab icon is 16px, so the disc is a solid
 * mass rather than a ring, and the flare alternates two shapes instead of
 * eight identical spokes — four heavy rays on the cardinals and four orbs
 * between them. Eight matched spokes turn to mush at that size and read as a
 * generic asterisk besides; the alternation is what keeps it legible and makes
 * it recognisably this sun rather than any sun.
 *
 * No backdrop. The mark is a silhouette in `currentColor`, so it takes the
 * accent on the site and, as a favicon, a colour chosen per colour-scheme.
 *
 * Easter egg, when a parent carries `group`: the corona swells and clears, the
 * flare turns half a step so the rays land where the orbs were, and each
 * element blooms outward in sequence rather than all at once — so it reads as
 * something leaving the core rather than the whole mark scaling up.
 */
export function SunMark(props: SunMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Corona, thrown off as the sun flares. */}
      <circle
        cx="16"
        cy="16"
        r="10"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0"
        className="transition-[scale,opacity] duration-700 ease-out group-hover:scale-[1.45] group-hover:opacity-25"
        style={about(16, 16)}
      />

      {/* The flare, turning half a step so rays swap places with the orbs. */}
      <g
        className="transition-[rotate] duration-[900ms] ease-out group-hover:rotate-[45deg]"
        style={about(16, 16)}
      >
        {[0, 90, 180, 270].map((angle, index) => (
          <line
            key={`ray-${angle}`}
            x1="16"
            y1="2.6"
            x2="16"
            y2="5.2"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="transition-[translate] duration-500 ease-out group-hover:-translate-y-[1.1px]"
            style={{
              ...about(16, 16),
              rotate: `${angle}deg`,
              transitionDelay: `${index * 60}ms`,
            }}
          />
        ))}

        {[45, 135, 225, 315].map((angle, index) => (
          <circle
            key={`orb-${angle}`}
            cx="16"
            cy="4.4"
            r="1.85"
            fill="currentColor"
            className="transition-[translate] duration-500 ease-out group-hover:-translate-y-[1.1px]"
            style={{
              ...about(16, 16),
              rotate: `${angle}deg`,
              transitionDelay: `${index * 60 + 30}ms`,
            }}
          />
        ))}
      </g>

      {/* The disc: solid, and the largest single mass in the mark. */}
      <circle
        cx="16"
        cy="16"
        r="7.6"
        fill="currentColor"
        className="transition-[scale] duration-500 ease-out group-hover:scale-[1.06]"
        style={about(16, 16)}
      />
    </svg>
  )
}
