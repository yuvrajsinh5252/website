/* -------------------------------------------------------------------------- */
/*  Profile                                                                    */
/* -------------------------------------------------------------------------- */

export interface SocialLink {
  /** Stable id, also used as the React key. */
  id: string
  label: string
  href: string
  /** Key of an icon exported from `src/components/ui/icons.tsx`. */
  icon: string
  /** Brand colour, used where the icons are shown in colour. */
  color?: string
  /** Handle shown alongside the link where there is room. */
  username?: string
  /** Shown in the compact hero/contact strip when true. */
  primary?: boolean
}

export interface Profile {
  name: string
  /** First name, used where the full name is too long. */
  shortName: string
  /** Two-letter mark used by the logo. */
  monogram: string
  role: string
  /** One line under the hero name. */
  tagline: string
  location: string
  /** Places, shown as an editorial dateline. */
  dateline?: string
  email: string
  resumeUrl?: string
  /** Elevator pitch, used in meta and the footer. */
  summary: string
  /** Heading for the about section. */
  aboutHeading?:
    | string
    | {
        line1: string
        line2?: string
      }
  /** About-section paragraphs. */
  bio: string[]
  availability: {
    status: 'open' | 'limited' | 'closed'
    label: string
  }
  socials: SocialLink[]
}

/* -------------------------------------------------------------------------- */
/*  Photo frames                                                               */
/* -------------------------------------------------------------------------- */

/** A photo rendered inside a polaroid frame. */
export interface PhotoFrame {
  id: string
  src: string
  alt: string
  caption: string
  /**
   * Short subject tag stencilled into the plate margin, e.g. `LUNAR`.
   * Keep it to a word or two — it is set in small caps at ~10px.
   */
  subject?: string
  /**
   * Optional capture data for the margin rail, e.g. `1/250s · f/10 · 1200mm`.
   * Rendered only when present, so it can stay empty until the real numbers
   * are to hand.
   */
  detail?: string
  /** Rotation in degrees. */
  tilt?: number
  /** CSS `object-position` for cropping. */
  objectPosition?: string
  /** Aspect ratio the frame should print at. */
  ratio?: 'square' | 'portrait' | 'landscape'
}

/* -------------------------------------------------------------------------- */
/*  Projects                                                                   */
/* -------------------------------------------------------------------------- */

export type ProjectStatus = 'live' | 'in-progress' | 'archived' | 'concept'

export interface ProjectLink {
  label: string
  href: string
  kind: 'demo' | 'repo' | 'article' | 'design' | 'other'
}

export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectSection {
  heading?: string
  body: string[]
}

export interface Project {
  /** URL segment: /projects/:slug */
  slug: string
  title: string
  /** One-liner shown on the card and list row. */
  summary: string
  /** Longer intro rendered on the detail page. */
  description: string
  year: string
  /** ISO date, used only for sorting. */
  createdAt: string
  status: ProjectStatus
  /** Technologies, rendered as a middot-separated list or badges. */
  stack: string[]
  /**
   * The project's own logo, shown as its mark wherever the project is linked.
   * Takes precedence over `icon`.
   */
  logo?: string
  /**
   * Generated cover artwork in `public/images/projects/`, used as the mark
   * tile in listings and as the plate on the case-study page.
   */
  cover?: string
  /** Icon-registry key used as the mark when there is no `logo`. */
  icon?: string
  /** Brand colour the mark is drawn in. Defaults to the site accent. */
  iconColor?: string
  /** Pinned to the landing page when true. */
  featured?: boolean
  highlights?: string[]
  metrics?: ProjectMetric[]
  /** Long-form case-study content for the detail page. */
  sections?: ProjectSection[]
  links?: ProjectLink[]
}

/* -------------------------------------------------------------------------- */
/*  Experience & education                                                     */
/* -------------------------------------------------------------------------- */

/** One title held at a company; a company may have several over time. */
export interface WorkRole {
  title: string
  /** Free-form so both "2023" and "Mar 2023" work. */
  dates: string
  /** Marks the role currently held. */
  current?: boolean
}

export interface Experience {
  id: string
  company: string
  companyUrl?: string
  projectUrl?: string
  projectLabel?: string
  /** Logo shown next to the company name. */
  logo?: string
  location: string
  type: 'full-time' | 'contract' | 'internship' | 'freelance'
  /** Newest role first. */
  roles: WorkRole[]
  summary: string
  highlights?: string[]
  stack?: string[]
  /** Photo shown beside the entry on the experience timeline. */
  frame?: PhotoFrame
}

export interface Education {
  id: string
  institution: string
  institutionUrl?: string
  logo?: string
  degree: string
  dates: string
  location?: string
  status?: string
}

/** A professional certification, shown as a compact rail. */
export interface Certification {
  id: string
  name: string
  /** Exam or credential code, e.g. `DP-700`. */
  code?: string
  issuer: string
  url?: string
}

/* -------------------------------------------------------------------------- */
/*  Skills                                                                     */
/* -------------------------------------------------------------------------- */

export interface Skill {
  name: string
  url: string
  /** Key of an icon exported from `src/components/ui/icons.tsx`. */
  icon: string
  /** Brand colour, used where the icon is shown in colour. */
  color?: string
}

export interface SkillGroup {
  id: string
  title: string
  items: Skill[]
}

/* -------------------------------------------------------------------------- */
/*  Posts                                                                      */
/* -------------------------------------------------------------------------- */

/** A block of long-form content inside a post. */
export type PostBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  /** A prominent outbound link, e.g. to the repository being discussed. */
  | { type: 'link'; href: string; label: string; description?: string }

export interface PostLink {
  label: string
  href: string
  kind: 'repo' | 'demo' | 'article' | 'linkedin' | 'other'
}

export interface Post {
  /** URL segment: /posts/:slug */
  slug: string
  title: string
  /** ISO date, used for sorting and the dateline. */
  date: string
  /** Standfirst shown in the list and in meta tags. */
  description: string
  tags: string[]
  readingTime: string
  coverImage?: string
  coverAlt?: string
  /** Pinned to the top of the list when true. */
  featured?: boolean
  /** Related links shown under the header. */
  links?: PostLink[]
  body: PostBlock[]
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  id: string
  label: string
  href: string
}
