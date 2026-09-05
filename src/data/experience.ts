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
      { title: 'Software Engineer 1', dates: 'July 2026 - Present', current: true },
      { title: 'Associate Software Engineer', dates: 'Jan 2026 - June 2026' },
    ],
    summary:
      'Data engineering for the Revenue Analytics team across enterprise financial datasets. Built PySpark pipelines in Microsoft Fabric to transform revenue streams into Delta tables, supported migrating core Synapse workloads to Fabric, and maintained enterprise Analysis Services Tabular models in SSMS.',
    stack: ['PySpark', 'Microsoft Fabric', 'Azure Synapse', 'SQL', 'SSMS', 'Analysis Services', 'Tabular models'],
  },
  {
    id: 'factly',
    company: 'Factly Media & Research',
    companyUrl: 'https://factlymedia.com',
    projectUrl: 'https://gopie.ai/',
    projectLabel: 'gopie.ai',
    logo: '/images/factlyIcon.png',
    location: 'Remote',
    type: 'full-time',
    roles: [{ title: 'Full-Stack Developer', dates: 'Feb 2025 - Dec 2025' }],
    summary:
      'Built [GoPie](https://gopie.ai/), owning the agentic system end-to-end for SQL exploration across 1,000+ public datasets alongside parts of the frontend. Developed streaming endpoints, high-throughput column resolution without full table scans, sandboxed execution, and benchmark testing with DSPy.',
    stack: ['Python', 'FastAPI', 'TypeScript', 'Next.js', 'LangChain', 'LangGraph', 'DSPy', 'Docker'],
  },
]

export const education: Education[] = [
  {
    id: 'nirma',
    institution: 'Nirma University',
    institutionUrl: 'https://nirmauni.ac.in/',
    logo: '/images/Nirma_University_Logo.png',
    degree: 'B.Tech, Computer Science & Engineering',
    dates: 'Sep 2022 - Sep 2026',
    location: 'Ahmedabad, Gujarat',
  },
  {
    id: 'gyanmanjari',
    institution: 'Gyanmanjari Vidhyapith',
    institutionUrl: 'https://gyanmanjarividyapith.edu.in/',
    logo: '/images/gyanManjari.jpg',
    degree: 'Higher Secondary',
    dates: '2020 - 2022',
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
    url: 'https://learn.microsoft.com/api/credentials/share/en-us/yuvrajsinhgohil-2083/41DD31FF11B1463?sharingId=BD694930D39D5821',
  },
  {
    id: 'dp-600',
    name: 'Fabric Analytics Engineer Associate',
    code: 'DP-600',
    issuer: 'Microsoft',
    url: 'https://learn.microsoft.com/api/credentials/share/en-us/yuvrajsinhgohil-2083/F4FD1ED1E393A883?sharingId=BD694930D39D5821',
  },
  {
    id: 'dp-800',
    name: 'SQL AI Developer Associate',
    code: 'DP-800',
    issuer: 'Microsoft',
    url: 'https://learn.microsoft.com/api/credentials/share/en-us/yuvrajsinhgohil-2083/A0035E7A3B3BBEAD?sharingId=BD694930D39D5821',
  },
]

/** The role currently held, used by the hero and the "Now" panel. */
export const currentPosition = {
  company: experiences[0],
  role: experiences[0]?.roles.find((entry) => entry.current) ?? experiences[0]?.roles[0],
}
