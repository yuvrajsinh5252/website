import type { Certification, Education, Experience } from '@/types'

/** Newest first — the timeline renders in array order. */
export const experiences: Experience[] = [
  {
    id: 'maq-software',
    company: 'MAQ Software',
    companyUrl: 'https://maqsoftware.com',
    logo: '/images/maq-software.png',
    location: 'Noida, India',
    type: 'full-time',
    roles: [
      { title: 'Software Engineer 1', dates: 'July 2026 — Present', current: true },
      { title: 'Associate Software Engineer', dates: 'Jan 2026 — June 2026' },
    ],
    summary:
      'Data engineering for the Revenue Analytics team — the PySpark notebooks that turn raw revenue data into Delta tables, the SQL behind them, and the tabular models the reports read from. A good part of the year went into moving our Synapse workloads across to Fabric.',
    stack: ['PySpark', 'Microsoft Fabric', 'Azure Synapse', 'SQL', 'SSMS', 'Tabular models'],
  },
  {
    id: 'factly',
    company: 'Factly Media & Research',
    companyUrl: 'https://factlymedia.com',
    logo: '/images/factlyIcon.png',
    location: 'Remote',
    type: 'full-time',
    roles: [{ title: 'Full-Stack Developer', dates: 'Feb 2025 — Dec 2025' }],
    summary:
      'Worked on GoPie, a multi-agent system for querying public datasets in plain language. Most of my time went on the unglamorous half — resolving column values without loading whole datasets, and tuning prompts until the answers held up.',
    stack: ['TypeScript', 'Next.js', 'Python', 'LangChain', 'LangGraph', 'DSPy', 'PostgreSQL'],
  },
]

export const education: Education[] = [
  {
    id: 'nirma',
    institution: 'Nirma University',
    institutionUrl: 'https://nirmauni.ac.in/',
    logo: '/images/Nirma_University_Logo.png',
    degree: 'B.Tech, Computer Science & Engineering',
    dates: 'Sep 2022 — Sep 2026',
    location: 'Ahmedabad, Gujarat',
  },
  {
    id: 'gyanmanjari',
    institution: 'Gyanmanjari Vidhyapith',
    institutionUrl: 'https://gyanmanjarividyapith.edu.in/',
    logo: '/images/gyanManjari.jpg',
    degree: 'Higher Secondary',
    dates: '2020 — 2022',
    location: 'Bhavnagar, Gujarat',
  },
]

/** Shown as a short rail at the foot of the experience page. */
export const certifications: Certification[] = [
  {
    id: 'dp-700',
    name: 'Fabric Data Engineer Associate',
    code: 'DP-700',
    issuer: 'Microsoft',
  },
  {
    id: 'dp-600',
    name: 'Fabric Analytics Engineer Associate',
    code: 'DP-600',
    issuer: 'Microsoft',
  },
]

/** The role currently held, used by the hero and the "Now" panel. */
export const currentPosition = {
  company: experiences[0],
  role: experiences[0]?.roles.find((entry) => entry.current) ?? experiences[0]?.roles[0],
}
