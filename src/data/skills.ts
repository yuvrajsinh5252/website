import type { Skill, SkillGroup } from '@/types'

/**
 * `icon` must match a key exported from `src/components/ui/icons.tsx`.
 * `color` is the brand colour, used by the hero's orbiting satellites.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    items: [
      {
        name: 'TypeScript',
        url: 'https://www.typescriptlang.org/',
        icon: 'typescript',
        color: '#3178C6',
      },
      {
        name: 'JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        icon: 'javascript',
        color: '#F7DF1E',
      },
      {
        name: 'Python',
        url: 'https://www.python.org/',
        icon: 'python',
        color: '#4B8BBE',
      },
      { name: 'Rust', url: 'https://www.rust-lang.org/', icon: 'rust', color: '#F74C00' },
      { name: 'C++', url: 'https://isocpp.org/', icon: 'cpp', color: '#00599C' },
      { name: 'Java', url: 'https://www.java.com/', icon: 'java', color: '#E76F00' },
    ],
  },
  {
    id: 'web',
    title: 'Web',
    items: [
      { name: 'React', url: 'https://react.dev/', icon: 'react', color: '#61DAFB' },
      {
        name: 'Next.js',
        url: 'https://nextjs.org/',
        icon: 'nextjs',
        color: '#FFFFFF',
      },
      {
        name: 'Tailwind CSS',
        url: 'https://tailwindcss.com/',
        icon: 'tailwind',
        color: '#38BDF8',
      },
      {
        name: 'Node.js',
        url: 'https://nodejs.org/',
        icon: 'node',
        color: '#5FA04E',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI & agents',
    items: [
      {
        name: 'LangGraph',
        url: 'https://langchain-ai.github.io/langgraph/',
        icon: 'graph',
        color: '#8B5CF6',
      },
      { name: 'DSPy', url: 'https://dspy.ai/', icon: 'robot', color: '#F97316' },
      {
        name: 'PySpark',
        url: 'https://spark.apache.org/docs/latest/api/python/',
        icon: 'spark',
        color: '#E25A1C',
      },
    ],
  },
  {
    id: 'platform',
    title: 'Data & platform',
    items: [
      {
        name: 'PostgreSQL',
        url: 'https://www.postgresql.org/',
        icon: 'postgres',
        color: '#4169E1',
      },
      {
        name: 'MongoDB',
        url: 'https://www.mongodb.com/',
        icon: 'mongodb',
        color: '#47A248',
      },
      {
        name: 'Docker',
        url: 'https://www.docker.com/',
        icon: 'docker',
        color: '#2496ED',
      },
      {
        name: 'Azure',
        url: 'https://azure.microsoft.com/',
        icon: 'azure',
        color: '#0078D4',
      },
      {
        name: 'Microsoft Fabric',
        url: 'https://www.microsoft.com/en-us/microsoft-fabric',
        icon: 'fabric',
        color: '#0EA5E9',
      },
      { name: 'Git', url: 'https://git-scm.com/', icon: 'git', color: '#F05032' },
      { name: 'Linux', url: 'https://www.linux.org/', icon: 'linux', color: '#FCC624' },
    ],
  },
]

/** Flat list, used by the document outline. */
export const skills: Skill[] = skillGroups.flatMap((group) => group.items)

/**
 * A curated subset used purely as decoration by the hero's orbiting
 * satellites. Kept short so the orbits stay legible rather than crowded, and
 * picked for icons that read clearly at 17px.
 */
export const orbitSkills: Skill[] = ['React', 'TypeScript', 'Rust', 'Python', 'Docker', 'PostgreSQL']
  .map((name) => skills.find((skill) => skill.name === name))
  .filter((skill): skill is Skill => skill !== undefined)
