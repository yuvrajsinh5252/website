/**
 * Central theming configuration.
 *
 * Colour *values* live in `src/index.css` (`:root` / `[data-accent]`).
 * This file only declares which options exist and what the defaults are.
 *
 * ⚠️ `storageKeys` and the defaults are duplicated in the no-flash inline
 * script in index.html — keep both in sync.
 */

import { DEV_TOOLS } from './env'

export const THEME_MODES = ['light', 'dark', 'system'] as const
export type ThemeMode = (typeof THEME_MODES)[number]

/** The mode actually applied to the document (`system` is resolved away). */
export type ResolvedTheme = Exclude<ThemeMode, 'system'>

export const ACCENTS = ['moonlight', 'nebula', 'aurora', 'starlight', 'ember'] as const
export type Accent = (typeof ACCENTS)[number]

/**
 * Palette metadata for the pickers.
 * Keep in sync with the `[data-accent]` rules in index.css.
 */
export const accentPresets: Record<
  Accent,
  { label: string; description: string; swatch: string; space: string }
> = {
  moonlight: {
    label: 'Moonlight',
    description: 'Pale ice-blue light on deep navy',
    swatch: '#a8d0ff',
    space: '#050912',
  },
  nebula: {
    label: 'Nebula',
    description: 'Violet periwinkle on indigo-black',
    swatch: '#bcaaff',
    space: '#070615',
  },
  aurora: {
    label: 'Aurora',
    description: 'Mint green over a teal-shifted navy',
    swatch: '#8ce0c0',
    space: '#040f13',
  },
  starlight: {
    label: 'Starlight',
    description: 'Near-monochrome cool white on black',
    swatch: '#dbe4f2',
    space: '#06080d',
  },
  ember: {
    label: 'Ember',
    description: 'The original warm horizon glow',
    swatch: '#ffc4a3',
    space: '#070b14',
  },
}

export interface ThemeConfig {
  defaultMode: ThemeMode
  defaultAccent: Accent
  /**
   * The site is designed as a single dark, cosmic look. The theme machinery
   * stays in place so light mode and other palettes keep working, but the
   * controls are hidden so visitors cannot change them.
   */
  showThemeToggle: boolean
  showAccentPicker: boolean
  /**
   * A floating palette switcher used while choosing the final look. Driven by
   * `VITE_DEV_TOOLS`, so it is available in development and absent from a
   * production build.
   */
  showPalettePreview: boolean
  storageKeys: {
    mode: string
    accent: string
  }
}

export const themeConfig: ThemeConfig = {
  defaultMode: 'dark',
  defaultAccent: 'starlight',
  showThemeToggle: false,
  showAccentPicker: false,
  showPalettePreview: DEV_TOOLS,
  storageKeys: {
    mode: 'portfolio:theme',
    accent: 'portfolio:accent',
  },
}

/**
 * Shared motion timings so every animated component feels part of one system.
 * Consumed by `src/lib/motion.ts`.
 */
export const motionConfig = {
  duration: {
    fast: 0.2,
    base: 0.5,
    slow: 0.8,
  },
  /** Matches `--ease-out-expo` in index.css. */
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  stagger: 0.08,
  /** How far elements travel when revealing, in px. */
  distance: 20,
  /** `whileInView` viewport options. */
  viewport: { once: true, amount: 0.2 },
}

/**
 * Background effect switches. Every effect also disables itself when the
 * visitor prefers reduced motion, so these are coarse on/off controls.
 */
export const effectsConfig = {
  /** Drifting starfield behind the whole site. */
  starfield: true,
  /** Occasional meteors streaking across the field. */
  meteors: true,
  /** Canvas particle globe forming the hero horizon. */
  globe: true,
  /** Decorative satellites tracing orbits around that globe. */
  orbits: true,
  /** Cursor trail of stars on the experience timeline. */
  starWake: true,
  /** Heavy canvas effects are skipped below this viewport width. */
  minWidthForHeavyEffects: 768,
}
