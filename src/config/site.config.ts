import type { NavItem } from '@/types'

/**
 * Global site metadata + navigation.
 * Everything here is content, not code — safe to edit without touching components.
 */
export const siteConfig = {
  name: 'Yuvrajsinh Gohil',
  /** Used in <title> as "{page} — {titleSuffix}". */
  titleSuffix: 'Yuvrajsinh Gohil',
  title: 'Yuvrajsinh Gohil — Software Engineer',
  description:
    'Software engineer building full-stack applications, agentic systems for automation, and production data pipelines.',
  url: 'https://www.yuvrajsinh.dev',
  locale: 'en',
  ogImage: '/images/og.png',
  keywords: [
    'software engineer',
    'full-stack developer',
    'agentic ai',
    'automation',
    'react',
    'typescript',
    'rust',
    'data engineering',
    'portfolio',
  ],
}

/** Primary navigation. `id` doubles as the React key. */
export const navItems: NavItem[] = [
  { id: 'experience', label: 'Experience', href: '/experience' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'posts', label: 'Posts', href: '/posts' },
]

/** Single source of truth for internal URLs. */
export const routes = {
  home: '/',
  about: '/#about',
  experience: '/experience',
  projects: '/projects',
  project: (slug: string) => `/projects/${slug}`,
  posts: '/posts',
  post: (slug: string) => `/posts/${slug}`,
}

export const footerConfig = {
  tagline: 'Software engineer',
  /** Shown under the name at the top of the footer. */
  signoff: 'Building software, solving problems, and staying curious.',
  /** Sits opposite the copyright on the bottom rule. */
  origin: 'India',
  /** IANA zone used for the local-time readout. */
  timeZone: 'Asia/Kolkata',
  /** Short label shown under the clock in the station readout. */
  zoneLabel: 'IST · UTC+5:30',
  /** Coordinates the live weather is fetched for. */
  coordinates: { latitude: 28.5355, longitude: 77.391 },
}
