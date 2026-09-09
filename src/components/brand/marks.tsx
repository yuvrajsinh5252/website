import { useId, type SVGProps } from 'react'

/**
 * Brand mark candidates for testing and experimentation in the logo lab.
 *
 * Each is a single-colour SVG on a 32×32 grid, drawn with `currentColor` so it
 * inherits the palette, and legible down to 16px.
 */

export type MarkProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 32 32',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
} as const

/* SVG needs an explicit origin and box to rotate or scale sanely. */
const about = (x: number, y: number) => ({
  transformOrigin: `${x}px ${y}px`,
  transformBox: 'view-box' as const,
})

/* 1. Waxing — the moon you actually photograph */

/**
 * A gibbous moon with craters bitten out of it.
 * Easter egg: hovering runs the phase to full, like a time-lapse.
 */
export function WaxingMark(props: MarkProps) {
  /*
   * Unique per instance, since several copies of this mark share a page.
   * `useId` emits punctuation that is unsafe inside `url(#…)`, so strip it.
   */
  const maskId = `waxing-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <svg {...base} {...props}>
      <mask id={maskId}>
        <circle cx="16" cy="16" r="13" fill="white" />
        <circle
          cx="6"
          cy="14"
          r="12.5"
          fill="black"
          className="transition-transform duration-[900ms] ease-out group-hover:-translate-x-[13px]"
        />
        <circle cx="20" cy="11" r="2.4" fill="black" opacity="0.55" />
        <circle cx="23" cy="19" r="1.5" fill="black" opacity="0.45" />
        <circle cx="16" cy="22" r="1.9" fill="black" opacity="0.4" />
      </mask>

      <circle cx="16" cy="16" r="13" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}

/* 2. Station — your own hero, distilled */

/**
 * A planet's limb with a satellite above it — the hero horizon as a mark.
 * Easter egg: hovering sends the satellite round a full orbit.
 */
export function StationMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <ellipse
        cx="16"
        cy="28"
        rx="19"
        ry="19"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
        strokeDasharray="2 3"
      />

      <path
        d="M2 27.5a15.5 15.5 0 0 1 28 0"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      <g
        className="transition-transform duration-[1400ms] ease-in-out group-hover:rotate-[360deg]"
        style={about(16, 28)}
      >
        <circle cx="16" cy="9" r="3.2" fill="currentColor" />
      </g>
    </svg>
  )
}

/* 3. Constellation — your initial, drawn in stars */

/**
 * A "Y" plotted as an asterism.
 * Easter egg: hovering traces the lines between the stars.
 */
export function ConstellationMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <g
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
        className="[stroke-dasharray:16] [stroke-dashoffset:16] transition-[stroke-dashoffset] duration-700 ease-out group-hover:[stroke-dashoffset:0]"
      >
        <path d="M7 7 16 16" />
        <path d="M25 7 16 16" />
        <path d="M16 16v10" />
      </g>

      <g fill="currentColor">
        <circle cx="7" cy="7" r="2.4" />
        <circle cx="25" cy="7" r="2.4" />
        <circle cx="16" cy="16" r="3.2" />
        <circle cx="16" cy="26" r="2.4" />
      </g>
    </svg>
  )
}

/* 4. Eyepiece — the view down the telescope */

/**
 * A telescope eyepiece with a star drifting off-centre.
 * Easter egg: hovering pulls the star into the crosshairs.
 */
export function EyepieceMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="16" r="12.8" stroke="currentColor" strokeWidth="2.6" />

      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.5">
        <path d="M16 4.5v4" />
        <path d="M16 23.5v4" />
        <path d="M4.5 16h4" />
        <path d="M23.5 16h4" />
      </g>

      <circle
        cx="21.5"
        cy="10.5"
        r="3"
        fill="currentColor"
        className="transition-transform duration-700 ease-out group-hover:translate-x-[-5.5px] group-hover:translate-y-[5.5px]"
      />
    </svg>
  )
}

/* 5. Prompt — a terminal and a telescope */

/**
 * A shell prompt whose cursor is a star.
 * Easter egg: hovering makes the star flare and turn, the way a cursor blinks.
 */
export function PromptMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M5.5 9.5 12 16l-6.5 6.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M22.5 8.5c.8 5 1.9 6.1 6.9 6.9-5 .8-6.1 1.9-6.9 6.9-.8-5-1.9-6.1-6.9-6.9 5-.8 6.1-1.9 6.9-6.9Z"
        fill="currentColor"
        className="transition-transform duration-500 ease-out group-hover:scale-115 group-hover:rotate-90"
        style={about(22.5, 15.4)}
      />
    </svg>
  )
}

/* 7. Telescope — the instrument itself */

/**
 * A telescope on its tripod, tube angled at the sky, with a star above it.
 * Easter egg: hovering raises the tube to catch the star, which then flares.
 */
export function TelescopeMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M25.5 2.5c.5 3.2 1.3 4 4.5 4.5-3.2.5-4 1.3-4.5 4.5-.5-3.2-1.3-4-4.5-4.5 3.2-.5 4-1.3 4.5-4.5Z"
        fill="currentColor"
        className="origin-center transition-transform duration-500 ease-out group-hover:scale-135"
        style={about(25.5, 7)}
      />

      <g
        className="transition-transform duration-700 ease-out group-hover:-rotate-[16deg]"
        style={about(15, 18)}
      >
        <rect
          x="5"
          y="13.4"
          width="19"
          height="8.6"
          rx="4.3"
          transform="rotate(-30 5 13.4)"
          fill="currentColor"
        />
        <path
          d="M12.2 9.6 16.4 6.9"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>

      <path
        d="M15 17.5v5.5m0 0-5.5 6.5M15 23l5.5 6.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}


/* 6. Apoapsis — the monogram, in orbit */

/**
 * The "Y" of your name with a satellite tracking round it.
 * Easter egg: hovering completes one orbit.
 */
export function ApoapsisMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="7.2"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.55"
        transform="rotate(-24 16 16)"
      />

      <path
        d="M8.5 7.5 16 16m7.5-8.5L16 16m0 0v11"
        stroke="currentColor"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g
        className="transition-transform duration-[1300ms] ease-in-out group-hover:rotate-[360deg]"
        style={about(16, 16)}
      >
        <circle cx="28.8" cy="10.3" r="2.9" fill="currentColor" />
      </g>
    </svg>
  )
}

/**
 * Apoapsis YG — Geometric "G" Satellite.
 * Replaces the orbital dot with a clean vector "G" (Gohil),
 * harmonized with the stroke weight and rounded terminals of the "Y".
 * Easter egg: hovering orbits the "G" around the "Y".
 */
export function ApoapsisYGMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="7.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="0 3.6"
        strokeLinecap="round"
        opacity="0.65"
        transform="rotate(-24 16 16)"
      />

      <path
        d="M8.5 7.5 16 16m7.5-8.5L16 16m0 0v11"
        stroke="currentColor"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g
        className="transition-transform duration-[1300ms] ease-in-out group-hover:rotate-[360deg]"
        style={about(16, 16)}
      >
        <path
          d="M 30.5 8.2 A 3.2 3.2 0 1 0 31.0 12.0 H 28.0"
          className="text-accent"
          stroke="var(--color-accent, currentColor)"
          strokeWidth="2.0"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  )
}

/**
 * Apoapsis YG Badge — Orbital Satellite with Knockout "G".
 * Keeps the celestial craft/orb silhouette, with the letter "G"
 * carved out of its center. High contrast across both dark and light modes.
 * Easter egg: hovering completes one orbit.
 */
export function ApoapsisYGBadgeMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="7.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="0 3.6"
        strokeLinecap="round"
        opacity="0.65"
        transform="rotate(-24 16 16)"
      />

      <path
        d="M8.5 7.5 16 16m7.5-8.5L16 16m0 0v11"
        stroke="currentColor"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g
        className="transition-transform duration-[1300ms] ease-in-out group-hover:rotate-[360deg]"
        style={about(16, 16)}
      >
        <circle
          cx="28.5"
          cy="10.4"
          r="3.4"
          className="text-accent"
          fill="var(--color-accent, currentColor)"
        />
        <path
          d="M 29.8 9.3 A 1.8 1.8 0 1 0 30.2 11.0 H 28.5"
          stroke="var(--color-background, #050912)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  )
}

/**
 * Apoapsis YG Bold — Extra Bold Monogram Satellite.
 * Features a thick, prominent "G" glyph at the apoapsis point,
 * matching the visual weight of the central 3.8px "Y".
 * Easter egg: hovering orbits the "G" 360°.
 */
export function ApoapsisYGBoldMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="7.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="0 3.6"
        strokeLinecap="round"
        opacity="0.65"
        transform="rotate(-24 16 16)"
      />

      <path
        d="M8.5 7.5 16 16m7.5-8.5L16 16m0 0v11"
        stroke="currentColor"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g
        className="transition-transform duration-[1300ms] ease-in-out group-hover:rotate-[360deg]"
        style={about(16, 16)}
      >
        <path
          d="M 30.3 8.3 A 2.7 2.7 0 1 0 30.9 11.3 H 28.0"
          className="text-accent"
          stroke="var(--color-accent, currentColor)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  )
}

/* 8. Aperture — the iris you look through */

/**
 * An iris of three blades around a bright centre.
 * Easter egg: hovering stops the aperture down, blades turning as they close.
 */
export function ApertureMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="16" r="12.8" stroke="currentColor" strokeWidth="2.6" />

      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.75"
        className="transition-transform duration-700 ease-out group-hover:rotate-[40deg] group-hover:scale-75"
        style={about(16, 16)}
      >
        <path d="M16 16 8.4 11.6" />
        <path d="M16 16 23.6 11.6" />
        <path d="M16 16v8.8" />
      </g>

      <circle
        cx="16"
        cy="16"
        r="2.8"
        fill="currentColor"
        className="transition-transform duration-700 ease-out group-hover:scale-75"
        style={about(16, 16)}
      />
    </svg>
  )
}

/* 9. Meridian — a world, turning */

/**
 * A globe with its meridian drawn on.
 * Easter egg: hovering swings the meridian round, so the globe turns.
 */
export function MeridianMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="16" r="12.6" stroke="currentColor" strokeWidth="2.4" />

      <path
        d="M3.6 16h24.8"
        stroke="currentColor"
        strokeWidth="1.7"
        opacity="0.55"
        strokeLinecap="round"
      />

      <ellipse
        cx="16"
        cy="16"
        rx="5"
        ry="12.6"
        stroke="currentColor"
        strokeWidth="1.7"
        opacity="0.55"
        className="transition-transform duration-[900ms] ease-in-out group-hover:scale-x-[2.1]"
        style={about(16, 16)}
      />
    </svg>
  )
}

/* 10. Signal — something transmitting */

/**
 * A source with three arcs leaving it.
 * Easter egg: hovering sends the arcs out one after another.
 */
export function SignalMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8.5" cy="23.5" r="3.4" fill="currentColor" />

      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path
          d="M8.5 17a6.5 6.5 0 0 1 6.5 6.5"
          opacity="0.75"
          className="transition-opacity duration-300 ease-out group-hover:opacity-100"
        />
        <path
          d="M8.5 11a12.5 12.5 0 0 1 12.5 12.5"
          opacity="0.45"
          className="transition-opacity delay-100 duration-300 ease-out group-hover:opacity-100"
        />
        <path
          d="M8.5 5a18.5 18.5 0 0 1 18.5 18.5"
          opacity="0.22"
          className="transition-opacity delay-200 duration-300 ease-out group-hover:opacity-100"
        />
      </g>
    </svg>
  )
}

/* 11. Comet — the visitor */

/**
 * A comet head with a tail trailing behind it.
 * Easter egg: hovering sends it on across the frame.
 */
export function CometMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <g
        className="transition-transform duration-700 ease-out group-hover:translate-x-[3px] group-hover:translate-y-[-3px]"
      >
        <path
          d="M17.8 14.2 4.5 27.5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.42"
        />
        <path
          d="M18.8 16 9.5 27.5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          opacity="0.24"
        />
        <circle cx="21.5" cy="10.5" r="5.4" fill="currentColor" />
      </g>
    </svg>
  )
}

/* 12. Sextant — measuring the angle to a star */

/**
 * A graduated limb with an index arm swung across it.
 * Easter egg: hovering swings the arm until it sights the star.
 */
export function SextantMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M26.5 3c.45 2.9 1.15 3.6 4.05 4.05-2.9.45-3.6 1.15-4.05 4.05-.45-2.9-1.15-3.6-4.05-4.05 2.9-.45 3.6-1.15 4.05-4.05Z"
        fill="currentColor"
        className="transition-transform duration-500 ease-out group-hover:scale-125"
        style={about(26.5, 7.05)}
      />

      <path
        d="M6 26.5A12.5 12.5 0 0 1 26 26.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />

      <g
        className="transition-transform duration-700 ease-out group-hover:rotate-[26deg]"
        style={about(16, 9)}
      >
        <path
          d="M16 9 9.5 25.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>

      <circle cx="16" cy="9" r="2.6" fill="currentColor" />
    </svg>
  )
}

/* 14. Sun — the nearest star, and the chosen mark */

/*
 * Lives in its own module rather than here, because it is the mark the site
 * actually uses — it outlives this file. Re-exported so the lab can keep
 * showing it alongside the candidates it beat.
 */
export { SunMark } from './SunMark'

/* 13. Plate — the photograph, on glass */

/**
 * A glass plate with a bright star held in it, after the photographs on the
 * site. Easter egg: hovering makes the faint stars come up around it.
 */
export function PlateMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="25"
        height="25"
        rx="7"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      <circle
        cx="16"
        cy="16"
        r="3.6"
        fill="currentColor"
        className="transition-transform duration-500 ease-out group-hover:scale-115"
        style={about(16, 16)}
      />

      <g
        fill="currentColor"
        opacity="0.35"
        className="transition-opacity duration-500 ease-out group-hover:opacity-100"
      >
        <circle cx="10" cy="10.5" r="1.5" />
        <circle cx="22" cy="21.5" r="1.7" />
        <circle cx="21.5" cy="10" r="1.2" />
      </g>
    </svg>
  )
}

/* ==========================================================================
 * New Personal Monograms & Geometric Sun Suite
 * ========================================================================== */

/* 14. Crown Y — "Yuvraj" Crown Prince Sovereign Monogram */
export function CrownYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Floating apex diamond crest */}
      <polygon
        points="16,2 18.5,5 16,8 13.5,5"
        fill="currentColor"
        className="transition-transform duration-500 ease-out group-hover:-translate-y-1"
        style={about(16, 5)}
      />

      {/* Royal 3-peak coronet forming letter Y */}
      <path
        d="M 5 8.5 L 10.5 17 L 16 9.5 L 21.5 17 L 27 8.5 L 23.5 19.5 L 17.5 21 V 28.5 C 17.5 29.3 16.8 30 16 30 C 15.2 30 14.5 29.3 14.5 28.5 V 21 L 8.5 19.5 Z"
        fill="currentColor"
        className="transition-transform duration-500 ease-out group-hover:scale-105"
        style={about(16, 18)}
      />

      {/* Inner sacred jewel bindu */}
      <circle
        cx="16"
        cy="15"
        r="1.8"
        fill="var(--theme-background, #050912)"
        className="transition-transform duration-500 ease-out group-hover:scale-125"
        style={about(16, 15)}
      />
    </svg>
  )
}

/* 15. Interlocking YG — The YG Monogram Cipher */
export function InterlockingYGMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Outer 'G' circular emblem */}
      <path
        d="M 22 16 H 16 M 25.5 10.5 A 11 11 0 1 0 25.5 21.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-700 ease-out group-hover:rotate-180"
        style={about(16, 16)}
      />

      {/* Central 'Y' monogram interlocking through the G */}
      <path
        d="M 10 7.5 L 16 15.5 L 22 7.5 M 16 15.5 V 25"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500 ease-out group-hover:scale-110"
        style={about(16, 16)}
      />
    </svg>
  )
}

/* 16. Solar Dawn Y — Letter Y cradling a rising sun orb */
export function SolarDawnYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Coronal solar rays rising above the horizon */}
      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-115"
        style={about(16, 11)}
        opacity="0.65"
      >
        <line x1="16" y1="4" x2="16" y2="1.5" />
        <line x1="11.8" y1="5.5" x2="9.6" y2="3.2" />
        <line x1="20.2" y1="5.5" x2="22.4" y2="3.2" />
        <line x1="8.5" y1="8.5" x2="6.2" y2="7.2" />
        <line x1="23.5" y1="8.5" x2="25.8" y2="7.2" />
      </g>

      {/* Radiant rising sun orb */}
      <circle
        cx="16"
        cy="11"
        r="4.2"
        fill="currentColor"
        className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
        style={about(16, 11)}
      />

      {/* Architectural 'Y' cradle vessel */}
      <path
        d="M 4.5 7 L 16 18.5 L 27.5 7 M 16 18.5 V 29.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500 ease-out group-hover:scale-102"
        style={about(16, 20)}
      />
    </svg>
  )
}

/* 17. Sword Y — The Kshatriya Talwar Blade Monogram */
export function SwordYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Crest pommel */}
      <circle
        cx="16"
        cy="4"
        r="2.2"
        fill="currentColor"
        className="transition-transform duration-500 ease-out group-hover:scale-120"
        style={about(16, 4)}
      />

      {/* Curved quillons (crossguard) forming the upper arms of the 'Y' */}
      <path
        d="M 6 8.5 C 10 11 13 14 16 14 C 19 14 22 11 26 8.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        className="transition-transform duration-500 ease-out group-hover:scale-105"
        style={about(16, 14)}
      />

      {/* Double-edged Talwar sword blade forming the stem of the 'Y' */}
      <path
        d="M 14.5 14 L 14.5 25 L 16 29.5 L 17.5 25 L 17.5 14 Z"
        fill="currentColor"
        className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-105"
        style={about(16, 20)}
      />

      {/* Center blade fuller / ridge */}
      <line
        x1="16"
        y1="15"
        x2="16"
        y2="27"
        stroke="var(--theme-background, #050912)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* 18. Code Y — The Branching Developer Monogram */
export function CodeYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Background starlight points matching application starfield */}
      <g
        fill="currentColor"
        className="transition-opacity duration-500 ease-out group-hover:opacity-100"
        opacity="0.45"
      >
        <circle cx="4.5" cy="5.5" r="0.6" opacity="0.4" />
        <circle cx="12" cy="4" r="0.75" opacity="0.8" />
        <circle cx="16" cy="6" r="0.5" opacity="0.5" />
        <circle cx="20" cy="4.5" r="0.7" opacity="0.75" />
        <circle cx="27.5" cy="5.5" r="0.5" opacity="0.4" />
        <circle cx="16" cy="10.5" r="0.85" opacity="0.85" />
        <circle cx="13.5" cy="8.5" r="0.45" opacity="0.4" />
        <circle cx="18.5" cy="8.5" r="0.45" opacity="0.4" />
        <circle cx="4.5" cy="14" r="0.7" opacity="0.6" />
        <circle cx="27.5" cy="14" r="0.7" opacity="0.6" />
        <circle cx="6" cy="20" r="0.85" opacity="0.85" />
        <circle cx="10" cy="23" r="0.5" opacity="0.45" />
        <circle cx="5" cy="27" r="0.6" opacity="0.5" />
        <circle cx="26" cy="20" r="0.85" opacity="0.85" />
        <circle cx="22" cy="23" r="0.5" opacity="0.45" />
        <circle cx="27" cy="27" r="0.6" opacity="0.5" />
      </g>

      {/* Connecting code syntax branches with healthy edge padding */}
      <path
        d="M 7.5 8 L 16 16.5 L 24.5 8 M 16 16.5 V 25.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="transition-transform duration-500 ease-out group-hover:scale-103"
        style={about(16, 16.5)}
      />

      {/* Solid commit nodes (no hollow centers) */}
      <circle
        cx="7.5"
        cy="8"
        r="2.8"
        fill="currentColor"
        className="transition-transform duration-300 ease-out group-hover:scale-120"
        style={about(7.5, 8)}
      />
      <circle
        cx="24.5"
        cy="8"
        r="2.8"
        fill="currentColor"
        className="transition-transform duration-300 ease-out group-hover:scale-120 group-hover:delay-75"
        style={about(24.5, 8)}
      />
      <circle
        cx="16"
        cy="16.5"
        r="2.5"
        fill="currentColor"
        className="transition-transform duration-300 ease-out group-hover:scale-125 group-hover:delay-150"
        style={about(16, 16.5)}
      />
      <circle
        cx="16"
        cy="25.5"
        r="2.8"
        fill="currentColor"
        className="transition-transform duration-300 ease-out group-hover:scale-120 group-hover:delay-200"
        style={about(16, 25.5)}
      />
    </svg>
  )
}

/* 18b. Starry Code Y — Tab Icon Badge with Pure Black Starfield */
export function StarryCodeYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Pure black background with soft rounded corners (no border stroke) */}
      <rect width="32" height="32" rx="6" fill="#000000" />

      {/* Pinpoint circular starlight matching application starfield */}
      <g className="transition-opacity duration-700 ease-out group-hover:opacity-100">
        <circle cx="4.5" cy="5.5" r="0.6" fill="#ffffff" opacity="0.4" />
        <circle cx="12" cy="4" r="0.75" fill="#ffffff" opacity="0.8" />
        <circle cx="16" cy="6" r="0.5" fill="#ffffff" opacity="0.5" />
        <circle cx="20" cy="4.5" r="0.7" fill="#ffffff" opacity="0.75" />
        <circle cx="27.5" cy="5.5" r="0.5" fill="#ffffff" opacity="0.4" />
        <circle cx="16" cy="10.5" r="0.85" fill="#ffffff" opacity="0.85" />
        <circle cx="13.5" cy="8.5" r="0.45" fill="#ffffff" opacity="0.4" />
        <circle cx="18.5" cy="8.5" r="0.45" fill="#ffffff" opacity="0.4" />
        <circle cx="4.5" cy="14" r="0.7" fill="#ffffff" opacity="0.6" />
        <circle cx="27.5" cy="14" r="0.7" fill="#ffffff" opacity="0.6" />
        <circle cx="6" cy="20" r="0.85" fill="#ffffff" opacity="0.85" />
        <circle cx="10" cy="23" r="0.5" fill="#ffffff" opacity="0.45" />
        <circle cx="5" cy="27" r="0.6" fill="#ffffff" opacity="0.5" />
        <circle cx="26" cy="20" r="0.85" fill="#ffffff" opacity="0.85" />
        <circle cx="22" cy="23" r="0.5" fill="#ffffff" opacity="0.45" />
        <circle cx="27" cy="27" r="0.6" fill="#ffffff" opacity="0.5" />
        <circle cx="11" cy="28.5" r="0.4" fill="#ffffff" opacity="0.35" />
        <circle cx="21" cy="28.5" r="0.4" fill="#ffffff" opacity="0.35" />
      </g>

      {/* Bold, perfectly padded branching Y in crisp starlight white */}
      <path
        d="M 7.5 8 L 16 16.5 L 24.5 8 M 16 16.5 V 25.5"
        stroke="#ffffff"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="transition-transform duration-500 ease-out group-hover:scale-103"
        style={about(16, 16.5)}
      />

      {/* Solid commit nodes (no hollow centers) */}
      <circle cx="7.5" cy="8" r="2.8" fill="#ffffff" />
      <circle cx="24.5" cy="8" r="2.8" fill="#ffffff" />
      <circle cx="16" cy="16.5" r="2.5" fill="#ffffff" />
      <circle cx="16" cy="25.5" r="2.8" fill="#ffffff" />
    </svg>
  )
}


/* 19. Zenith Y — 4-Point Solar Navigation Compass Monogram */
export function ZenithYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <g
        className="transition-transform duration-700 ease-out group-hover:rotate-45"
        style={about(16, 16)}
      >
        {/* Cardinal faceted diamond star */}
        <polygon points="16,2 19,13 30,16 19,19 16,30 13,19 2,16 13,13" fill="currentColor" />
        {/* Subtle diagonal inner spark */}
        <polygon
          points="16,9 18,14 23,16 18,18 16,23 14,18 9,16 14,14"
          fill="var(--theme-background, #050912)"
        />
        {/* Center core */}
        <circle cx="16" cy="16" r="2.2" fill="currentColor" />
      </g>
    </svg>
  )
}

/* 20. Circuit Sun — U-Track Loop Sun (Inspired by Uploaded Image 1) */
export function CircuitSunMark(props: MarkProps) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg {...base} {...props}>
      {/* Central circular core */}
      <circle
        cx="16"
        cy="16"
        r="5.2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="transition-transform duration-500 ease-out group-hover:scale-110"
        style={about(16, 16)}
      />

      {/* 8 radiating straight spokes */}
      <g
        className="transition-transform duration-700 ease-out group-hover:scale-105"
        style={about(16, 16)}
      >
        {angles.map((angle) => (
          <line
            key={`spoke-${angle}`}
            x1="16"
            y1="7.5"
            x2="16"
            y2="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{ transformOrigin: '16px 16px', transform: `rotate(${angle}deg)` }}
          />
        ))}
      </g>

      {/* 8 U-track hairpin loops between the spokes */}
      <g
        className="transition-transform duration-700 ease-out group-hover:rotate-45"
        style={about(16, 16)}
      >
        {angles.map((angle) => (
          <path
            key={`u-track-${angle}`}
            d="M 14.2 8.5 V 4.5 C 14.2 3.4 15 2.8 16 2.8 C 17 2.8 17.8 3.4 17.8 4.5 V 8.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            style={{
              transformOrigin: '16px 16px',
              transform: `rotate(${angle + 22.5}deg)`,
            }}
          />
        ))}
      </g>
    </svg>
  )
}

/* 21. Segmented Seal — Radial Aperture Seal (Inspired by Uploaded Image 2) */
export function SegmentedSealMark(props: MarkProps) {
  const sectors = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg {...base} {...props}>
      {/* Central solid disc */}
      <circle cx="16" cy="16" r="3.6" fill="currentColor" />

      {/* Inner concentric ring */}
      <circle cx="16" cy="16" r="6.2" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Outer segmented ring blocks */}
      <g
        className="transition-transform duration-700 ease-out group-hover:rotate-90"
        style={about(16, 16)}
      >
        {sectors.map((angle) => (
          <path
            key={`seg-${angle}`}
            d="M 14.2 1.5 H 17.8 L 18.6 7 H 13.4 Z"
            fill="currentColor"
            style={{
              transformOrigin: '16px 16px',
              transform: `rotate(${angle}deg)`,
            }}
          />
        ))}
      </g>
    </svg>
  )
}

/* 22. Faceted Sun — Diamond Sol (Inspired by Uploaded Image 3) */
export function FacetedSunMark(props: MarkProps) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg {...base} {...props}>
      {/* Center solid core */}
      <circle
        cx="16"
        cy="16"
        r="4.8"
        fill="currentColor"
        className="transition-transform duration-500 ease-out group-hover:scale-115"
        style={about(16, 16)}
      />

      {/* 8 faceted diamond rays */}
      <g
        className="transition-transform duration-700 ease-out group-hover:rotate-45"
        style={about(16, 16)}
      >
        {angles.map((angle) => (
          <polygon
            key={`diamond-${angle}`}
            points="16,1.2 18.2,5.5 16,9.2 13.8,5.5"
            fill="currentColor"
            style={{
              transformOrigin: '16px 16px',
              transform: `rotate(${angle}deg)`,
            }}
          />
        ))}
      </g>
    </svg>
  )
}

/* 23. Lion Y — The Kshatriya Sinh Monogram (Yuvraj-Sinh) */
export function LionYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Crown mane apex */}
      <polygon
        points="16,2.5 13.5,7 18.5,7"
        fill="currentColor"
        className="transition-transform duration-500 ease-out group-hover:-translate-y-1"
        style={about(16, 5)}
      />

      {/* Mane / ears outer geometric facets */}
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="transition-transform duration-500 ease-out group-hover:scale-106"
        style={about(16, 16)}
      >
        <path d="M 8.5 7 L 4.5 11.5 L 9 14.5" />
        <path d="M 23.5 7 L 27.5 11.5 L 23 14.5" />
        <path d="M 4.5 11.5 L 4.5 18 L 9 22" />
        <path d="M 27.5 11.5 L 27.5 18 L 23 22" />
      </g>

      {/* Symmetrical Lion Face forming the letter 'Y' */}
      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="transition-transform duration-500 ease-out group-hover:scale-104"
        style={about(16, 17)}
      >
        {/* Upper Y arms: Brow contour sweeping down to nose bridge */}
        <path d="M 8.5 7 L 16 15 L 23.5 7" />

        {/* Vertical Y stem: Nose bridge descending to chin */}
        <path d="M 16 15 V 27.5" />

        {/* Jawline base */}
        <path d="M 11.5 24.5 L 16 29 L 20.5 24.5" strokeWidth="1.6" />
      </g>

      {/* Fierce almond lion eyes */}
      <circle
        cx="12"
        cy="13.5"
        r="1.4"
        fill="currentColor"
        className="transition-transform duration-300 ease-out group-hover:scale-140"
        style={about(12, 13.5)}
      />
      <circle
        cx="20"
        cy="13.5"
        r="1.4"
        fill="currentColor"
        className="transition-transform duration-300 ease-out group-hover:scale-140"
        style={about(20, 13.5)}
      />
    </svg>
  )
}

/* 24. Winged Y — Ascendant Wings (Garuda / Falcon Sovereignty) */
export function WingedYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Central ascending fuselage / stem */}
      <path
        d="M 14.8 19 V 28.5 C 14.8 29.3 15.3 30 16 30 C 16.7 30 17.2 29.3 17.2 28.5 V 19"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Upper soaring primary wings forming the top fork of the 'Y' */}
      <g
        className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-106"
        style={about(16, 16)}
      >
        {/* Left wing tiers */}
        <path
          d="M 14.8 18.5 C 12 14.5 8 9 3 4.5 C 7 7.5 11 11.5 13.5 16.5"
          fill="currentColor"
        />
        <path
          d="M 13.5 17.5 C 11 14.5 7.5 11 4.5 9 C 7.5 11.5 10.5 14.5 12.5 18"
          fill="currentColor"
          opacity="0.75"
        />
        <path
          d="M 12.5 19 C 10.5 17 8 14.5 6 13.5 C 8.5 15 10.5 17 11.5 19.5"
          fill="currentColor"
          opacity="0.5"
        />

        {/* Right wing tiers */}
        <path
          d="M 17.2 18.5 C 20 14.5 24 9 29 4.5 C 25 7.5 21 11.5 18.5 16.5"
          fill="currentColor"
        />
        <path
          d="M 18.5 17.5 C 21 14.5 24.5 11 27.5 9 C 24.5 11.5 21.5 14.5 19.5 18"
          fill="currentColor"
          opacity="0.75"
        />
        <path
          d="M 19.5 19 C 21.5 17 24 14.5 26 13.5 C 23.5 15 21.5 17 20.5 19.5"
          fill="currentColor"
          opacity="0.5"
        />
      </g>
    </svg>
  )
}

/* 25. Mobius Y — The Isometric Infinite Loop */
export function MobiusYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      <g
        className="transition-transform duration-700 ease-out group-hover:rotate-120"
        style={about(16, 16)}
      >
        {/* Left isometric loop */}
        <path
          d="M 16 16 L 8 7 C 6 4 10.5 2.5 12.5 5.5 L 16 11.5"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Right isometric loop */}
        <path
          d="M 16 16 L 24 7 C 26 4 21.5 2.5 19.5 5.5 L 16 11.5"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Stem loop descending into infinite turnaround */}
        <path
          d="M 14.6 15 V 25 C 14.6 28 17.4 28 17.4 25 V 15"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Center core nexus */}
        <circle cx="16" cy="15.5" r="2" fill="currentColor" />
      </g>
    </svg>
  )
}

/* 26. Rajput Dhal — Kshatriya Shield with Chevron Y */
export function RajputDhalMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Outer shield rim */}
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="transition-transform duration-700 ease-out group-hover:scale-104"
        style={about(16, 16)}
      />

      {/* Inner concentric ring */}
      <circle
        cx="16"
        cy="16"
        r="10.8"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
        fill="none"
        opacity="0.65"
      />

      {/* 4 sacred brass shield bosses */}
      <circle cx="16" cy="5.8" r="1.8" fill="currentColor" />
      <circle cx="16" cy="26.2" r="1.8" fill="currentColor" />
      <circle cx="5.8" cy="16" r="1.8" fill="currentColor" />
      <circle cx="26.2" cy="16" r="1.8" fill="currentColor" />

      {/* Central chevron 'Y' crest */}
      <path
        d="M 11 11 L 16 17 L 21 11 M 16 17 V 23"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500 ease-out group-hover:scale-115"
        style={about(16, 16)}
      />
    </svg>
  )
}

/* 27. Terminal Chevron Y — The CLI Prompt Monogram */
export function TerminalChevronYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Terminal chevron prompt forming upper Y arms */}
      <path
        d="M 6.5 8 L 16 17.5 L 25.5 8"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500 ease-out group-hover:scale-108"
        style={about(16, 12)}
      />

      {/* Terminal block cursor forming the stem */}
      <rect
        x="14"
        y="19.5"
        width="4"
        height="8.5"
        rx="1.5"
        fill="currentColor"
        className="transition-all duration-300 ease-out group-hover:opacity-60 group-hover:scale-y-110"
        style={about(16, 23)}
      />

      {/* Subtle execution dot */}
      <circle
        cx="16"
        cy="4.5"
        r="1.6"
        fill="currentColor"
        className="transition-transform duration-300 ease-out group-hover:scale-140"
        style={about(16, 4.5)}
      />
    </svg>
  )
}

/* 28. Prism Y — Optical Dispersion Monogram */
export function PrismYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Central dispersion prism triangle */}
      <polygon
        points="16,13 10.5,23 21.5,23"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
        className="transition-transform duration-500 ease-out group-hover:scale-110"
        style={about(16, 18)}
      />

      {/* Incident beam entering from bottom into prism (stem of Y) */}
      <line
        x1="16"
        y1="30"
        x2="16"
        y2="23"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Internal focal point */}
      <circle cx="16" cy="18" r="1.6" fill="currentColor" />

      {/* Refracted divergent rays exiting apex (arms of Y) */}
      <line
        x1="16"
        y1="13"
        x2="5"
        y2="4.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="transition-transform duration-500 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
        style={about(16, 13)}
      />
      <line
        x1="16"
        y1="13"
        x2="27"
        y2="4.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={about(16, 13)}
      />

      {/* Dispersion spectral secondary rays */}
      <line
        x1="14"
        y1="15"
        x2="3"
        y2="9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.6"
        className="transition-opacity duration-300 group-hover:opacity-100"
      />
      <line
        x1="18"
        y1="15"
        x2="29"
        y2="9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.6"
        className="transition-opacity duration-300 group-hover:opacity-100"
      />
    </svg>
  )
}

/* 29. Quantum Y — Atomic Orbital Monogram */
export function QuantumYMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* Central nucleus */}
      <circle
        cx="16"
        cy="15"
        r="2.8"
        fill="currentColor"
        className="transition-transform duration-300 ease-out group-hover:scale-130"
        style={about(16, 15)}
      />

      {/* Left orbital ellipse (tilted -35 deg) */}
      <ellipse
        cx="16"
        cy="15"
        rx="13"
        ry="4.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        transform="rotate(-35 16 15)"
        className="transition-transform duration-700 ease-out group-hover:rotate-0"
        style={about(16, 15)}
      />

      {/* Right orbital ellipse (tilted 35 deg) */}
      <ellipse
        cx="16"
        cy="15"
        rx="13"
        ry="4.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        transform="rotate(35 16 15)"
        className="transition-transform duration-700 ease-out group-hover:rotate-0"
        style={about(16, 15)}
      />

      {/* Stem descent beam (anchoring the Y shape down to 29) */}
      <line
        x1="16"
        y1="18"
        x2="16"
        y2="29.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="16" cy="29.5" r="1.5" fill="currentColor" />
    </svg>
  )
}


