import { useId, type SVGProps } from 'react'

/**
 * Candidate brand marks.
 *
 * Each is a single-colour SVG on a 32×32 grid, drawn with `currentColor` so it
 * inherits the palette, and legible down to 16px. Every mark carries a hover
 * easter egg, driven by a parent element carrying the `group` class.
 *
 * Once one is chosen, keep it, delete the rest, and export it as the favicon.
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

/* -------------------------------------------------------------------------- */
/*  1. Waxing — the moon you actually photograph                               */
/* -------------------------------------------------------------------------- */

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
        {/* The terminator, sliding away on hover to fill the disc. */}
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

/* -------------------------------------------------------------------------- */
/*  2. Station — your own hero, distilled                                      */
/* -------------------------------------------------------------------------- */

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

      {/* The limb: the crown of a sphere whose centre sits below the frame. */}
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

/* -------------------------------------------------------------------------- */
/*  3. Constellation — your initial, drawn in stars                            */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  4. Eyepiece — the view down the telescope                                  */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  5. Prompt — a terminal and a telescope                                     */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  7. Telescope — the instrument itself                                       */
/* -------------------------------------------------------------------------- */

/**
 * A telescope on its tripod, tube angled at the sky, with a star above it.
 * Easter egg: hovering raises the tube to catch the star, which then flares.
 */
export function TelescopeMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* The target star. */}
      <path
        d="M25.5 2.5c.5 3.2 1.3 4 4.5 4.5-3.2.5-4 1.3-4.5 4.5-.5-3.2-1.3-4-4.5-4.5 3.2-.5 4-1.3 4.5-4.5Z"
        fill="currentColor"
        className="origin-center transition-transform duration-500 ease-out group-hover:scale-135"
        style={about(25.5, 7)}
      />

      {/* Tube and finder, pivoting on the mount to track the star. */}
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

      {/* Tripod. */}
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


/* -------------------------------------------------------------------------- */
/*  6. Apoapsis — the monogram, in orbit                                       */
/* -------------------------------------------------------------------------- */

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
        rx="14.6"
        ry="7"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.45"
        transform="rotate(-24 16 16)"
      />

      <path
        d="M10 9.5 16 16m6-6.5L16 16m0 0v9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g
        className="transition-transform duration-[1300ms] ease-in-out group-hover:rotate-[360deg]"
        style={about(16, 16)}
      >
        <circle cx="29.3" cy="10.1" r="2.4" fill="currentColor" />
      </g>
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*  8. Aperture — the iris you look through                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  9. Meridian — a world, turning                                             */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  10. Signal — something transmitting                                        */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  11. Comet — the visitor                                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  12. Sextant — measuring the angle to a star                                */
/* -------------------------------------------------------------------------- */

/**
 * A graduated limb with an index arm swung across it.
 * Easter egg: hovering swings the arm until it sights the star.
 */
export function SextantMark(props: MarkProps) {
  return (
    <svg {...base} {...props}>
      {/* The star being shot. */}
      <path
        d="M26.5 3c.45 2.9 1.15 3.6 4.05 4.05-2.9.45-3.6 1.15-4.05 4.05-.45-2.9-1.15-3.6-4.05-4.05 2.9-.45 3.6-1.15 4.05-4.05Z"
        fill="currentColor"
        className="transition-transform duration-500 ease-out group-hover:scale-125"
        style={about(26.5, 7.05)}
      />

      {/* The graduated limb. */}
      <path
        d="M6 26.5A12.5 12.5 0 0 1 26 26.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* The index arm, swinging up to the star. */}
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

/* -------------------------------------------------------------------------- */
/*  14. Sun — the nearest star, and the chosen mark                            */
/* -------------------------------------------------------------------------- */

/*
 * Lives in its own module rather than here, because it is the mark the site
 * actually uses — it outlives this file. Re-exported so the lab can keep
 * showing it alongside the candidates it beat.
 */
export { SunMark } from './SunMark'

/* -------------------------------------------------------------------------- */
/*  13. Plate — the photograph, on glass                                       */
/* -------------------------------------------------------------------------- */

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
