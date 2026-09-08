import { useId, type SVGProps } from 'react'
import { cn } from '@/lib/cn'

export type SunMarkProps = SVGProps<SVGSVGElement>

const SWORD_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const
const FLAME_ANGLES = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5] as const

/**
 * Suryavanshi Kshatriya Royal Sun Emblem:
 * Authentic 16-ray solar crown (8 sharp Talwar/sword rays alternating with
 * 8 dynamic Agni/flame rays) encircling a concentric corona and radiant solar core.
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
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--theme-accent, #ea9e4b)" stopOpacity="0.8" />
          <stop offset="30%" stopColor="var(--theme-accent, #ea9e4b)" stopOpacity="0.45" />
          <stop offset="65%" stopColor="var(--theme-accent, #ea9e4b)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--theme-accent, #ea9e4b)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Atmospheric Solar Aura / Ambient Glow */}
      <circle
        cx="16"
        cy="16"
        r="16"
        fill={`url(#${glowId})`}
        className="sun-mark-aura pointer-events-none"
      />

      {/* 8 Curved Solar Flame Rays (Agni / Cosmic Flames) */}
      <g className="sun-mark-flames" style={{ transformOrigin: '16px 16px' }}>
        {FLAME_ANGLES.map((angle) => (
          <path
            key={`flame-${angle}`}
            d="M 15.0 8.6 C 14.8 5.8 16.5 4.2 17.8 3.2 C 17.2 5.0 16.6 6.2 17.8 7.4 C 18.2 7.8 18.0 8.3 17.0 8.6 Z"
            fill="currentColor"
            style={{
              transformOrigin: '16px 16px',
              transform: `rotate(${angle}deg)`,
            }}
          />
        ))}
      </g>

      {/* 8 Sharp Kshatriya Sword Rays (Talwar / Piercing Light) */}
      <g className="sun-mark-swords" style={{ transformOrigin: '16px 16px' }}>
        {SWORD_ANGLES.map((angle) => (
          <path
            key={`sword-${angle}`}
            d="M 16 1.0 L 17.6 8.4 L 14.4 8.4 Z"
            fill="currentColor"
            style={{
              transformOrigin: '16px 16px',
              transform: `rotate(${angle}deg)`,
            }}
          />
        ))}
      </g>

      {/* Concentric Corona Ring */}
      <circle
        cx="16"
        cy="16"
        r="7.4"
        stroke="currentColor"
        strokeWidth="1.1"
        className="sun-mark-corona"
        style={{ transformOrigin: '16px 16px' }}
      />

      {/* Royal Solar Core Disc with Inner Solar Bindu */}
      <g className="sun-mark-core" style={{ transformOrigin: '16px 16px' }}>
        <circle cx="16" cy="16" r="5.2" fill="currentColor" />
        <circle cx="16" cy="16" r="1.6" fill="var(--theme-background, #050912)" />
      </g>
    </svg>
  )
}
