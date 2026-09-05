/**
 * Build-time flags.
 *
 * Vite exposes `VITE_`-prefixed variables from `.env`. Everything here is
 * embedded in the client bundle in plain text — it is configuration, not secrets.
 *
 * In development, DEV_TOOLS defaults to true (via import.meta.env.DEV).
 * In production builds, it defaults to false and dead-code elimination removes
 * all dev-only scaffolding and unreferenced chunks.
 * Set VITE_DEV_TOOLS in your environment (or Vercel dashboard) to explicitly override.
 */
export const DEV_TOOLS =
  import.meta.env.VITE_DEV_TOOLS !== undefined
    ? import.meta.env.VITE_DEV_TOOLS === 'true'
    : import.meta.env.DEV

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''



