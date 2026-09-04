import type { Profile } from '@/types'

/**
 * Personal details. Edit freely — no component contains hard-coded content.
 */
export const profile: Profile = {
  name: 'Yuvrajsinh Gohil',
  shortName: 'Yuvrajsinh',
  monogram: 'YG',
  role: 'Software Engineer',
  tagline: 'Software engineer. Full-stack work, and agents that handle the repetitive parts.',
  location: 'Noida, India',
  dateline: 'Ahmedabad · Noida · Remote',
  email: 'yuvrajsinh476@gmail.com',
  summary:
    'Software engineer building full-stack applications, agentic systems for automation, and the data pipelines underneath them.',
  bio: [
    'I work across the stack — React and TypeScript on the front, Rust, Python or Node behind it, and whatever database suits the problem. Most of it ends up in production, which is usually where the more interesting problems turn up.',
    'A lot of my work lately has been agents. I use them day to day and I build them, and the model is rarely the hard part — most of the effort goes into the scaffolding around it: feedback loops, validation, and the tooling that makes an answer worth trusting. When it works, it takes a chunk of repetitive work off the team.',
    'I studied Computer Science at Nirma University, though most of what I know came from building things badly first and then working out why.',
    'When the sky is clear I take a telescope up to the roof. The photographs here are mine.',
  ],
  availability: {
    status: 'limited',
    label: 'Building at MAQ Software',
  },
  /*
   * `color` is each service's own brand colour, used where the icons are shown
   * in colour. GitHub and X are near-black in their brand guidelines, which is
   * invisible on this background, so both take the light mark instead.
   */
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/yuvrajsinh5252',
      icon: 'github',
      color: '#E6EDF3',
      username: '@yuvrajsinh5252',
      primary: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/yuvrajsinh099',
      icon: 'linkedin',
      color: '#0A66C2',
      username: 'yuvrajsinh099',
      primary: true,
    },
    {
      id: 'x',
      label: 'X',
      href: 'https://x.com/Yuvrajsinh_099',
      icon: 'x',
      color: '#E7E9EA',
      username: '@Yuvrajsinh_099',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      /* TODO: replace with your real channel URL. */
      href: 'https://www.youtube.com/@yuvrajsinh',
      icon: 'youtube',
      color: '#FF0033',
      username: '@yuvrajsinh',
    },
    {
      id: 'discord',
      label: 'Discord',
      href: 'https://discord.com/users/1035138685689139311',
      icon: 'discord',
      color: '#5865F2',
      username: 'yuvrajsinh',
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:yuvrajsinh476@gmail.com',
      icon: 'mail',
      color: '#EA9E4B',
      username: 'yuvrajsinh476@gmail.com',
      primary: true,
    },
  ],
}
