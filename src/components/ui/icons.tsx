import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Expand,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  Sparkles,
  Sun,
  Telescope,
  X as Close,
} from 'lucide-react'
import {
  SiCplusplus,
  SiDiscord,
  SiDocker,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiJavascript,
  SiLeetcode,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiTailwindcss,
  SiTrpc,
  SiTypescript,
  SiVite,
  SiX,
  SiYoutube,
  SiApachespark,
} from 'react-icons/si'
import {
  FaChessKnight,
  FaJava,
  FaLinkedin,
  FaProjectDiagram,
  FaRobot,
  FaMicrosoft,
} from 'react-icons/fa'
import { VscAzure } from 'react-icons/vsc'
import type { ComponentType, SVGProps } from 'react'

/**
 * Icon registry.
 *
 * Data files (`src/data/*`) reference icons by string key so content stays
 * free of imports. Add a key here to make it available everywhere.
 *
 * lucide covers interface icons; react-icons covers brand and technology
 * marks, which lucide deliberately does not ship.
 */
const registry = {
  /* Social */
  github: SiGithub,
  linkedin: FaLinkedin,
  x: SiX,
  discord: SiDiscord,
  youtube: SiYoutube,
  mail: Mail,

  /* Technologies */
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  node: SiNodedotjs,
  python: SiPython,
  rust: SiRust,
  cpp: SiCplusplus,
  java: FaJava,
  docker: SiDocker,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  git: SiGit,
  linux: SiLinux,
  azure: VscAzure,
  fabric: FaMicrosoft,
  spark: SiApachespark,
  graph: FaProjectDiagram,
  robot: FaRobot,
  vite: SiVite,
  trpc: SiTrpc,
  gemini: SiGooglegemini,
  leetcode: SiLeetcode,
  chess: FaChessKnight,

  /* Interface */
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowDown: ArrowDown,
  arrowUpRight: ArrowUpRight,
  externalLink: ExternalLink,
  expand: Expand,
  download: Download,
  copy: Copy,
  check: Check,
  close: Close,
  menu: Menu,
  sun: Sun,
  moon: Moon,
  system: Monitor,
  sparkles: Sparkles,
  telescope: Telescope,
  location: MapPin,
  education: GraduationCap,
} as const satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>

export type IconName = keyof typeof registry

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /**
   * A registry key. Typed loosely so data files stay decoupled from this
   * module; unknown names fall back to a neutral icon.
   */
  name: IconName | (string & {})
  /** Any CSS length; defaults to `1em` so icons scale with their text. */
  size?: number | string
}

/** Renders a registered icon by name: `<Icon name="github" />`. */
export function Icon({ name, size = '1em', ...props }: IconProps) {
  const Component = registry[name as IconName] ?? registry.sparkles
  return <Component width={size} height={size} aria-hidden="true" {...props} />
}
