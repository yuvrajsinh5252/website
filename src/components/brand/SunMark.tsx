import { useId, type SVGProps } from 'react'
import { cn } from '@/lib/cn'

export type SunMarkProps = SVGProps<SVGSVGElement>

/**
 * The site's mark: a radiant sun, bolder and thicker to stand out as a favicon,
 * with a cosmic solar animation and warm ambient glow shining out.
 */
export function SunMark({ className, ...props }: SunMarkProps) {
  const glowId = useId()

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('sun-mark', className)}
      {...props}
    >
      <defs>
        {/* Soft radial solar glow that shines out from the center */}
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--theme-accent, #ea9e4b)" stopOpacity="0.75" />
          <stop offset="35%" stopColor="var(--theme-accent, #ea9e4b)" stopOpacity="0.35" />
          <stop offset="70%" stopColor="var(--theme-accent, #ea9e4b)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--theme-accent, #ea9e4b)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Atmospheric background glow shining outward */}
      <circle
        cx="16"
        cy="16"
        r="16"
        fill={`url(#${glowId})`}
        className="sun-mark-glow pointer-events-none"
      />

      {/* Corona halo, blooming and breathing as the sun flares */}
      <circle
        cx="16"
        cy="16"
        r="11"
        stroke="currentColor"
        strokeWidth="1.8"
        className="sun-mark-corona"
      />

      {/* The flare: revolving celestial rays and orbs */}
      <g className="sun-mark-flare">
        {[0, 90, 180, 270].map((angle, index) => (
          <g
            key={`ray-${angle}`}
            style={{
              transformOrigin: '16px 16px',
              transform: `rotate(${angle}deg)`,
            }}
          >
            <line
              x1="16"
              y1="2.85"
              x2="16"
              y2="4.75"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinecap="round"
              className="sun-mark-ray"
              style={{ transitionDelay: `${index * 40}ms` }}
            />
          </g>
        ))}

        {[45, 135, 225, 315].map((angle, index) => (
          <g
            key={`orb-${angle}`}
            style={{
              transformOrigin: '16px 16px',
              transform: `rotate(${angle}deg)`,
            }}
          >
            <circle
              cx="16"
              cy="4.0"
              r="2.3"
              fill="currentColor"
              className="sun-mark-orb"
              style={{ transitionDelay: `${index * 40 + 20}ms` }}
            />
          </g>
        ))}
      </g>

      {/* The disc: solid, bold, and the central heart of the mark */}
      <circle
        cx="16"
        cy="16"
        r="8.1"
        fill="currentColor"
        className="sun-mark-disc"
      />
    </svg>
  )
}
