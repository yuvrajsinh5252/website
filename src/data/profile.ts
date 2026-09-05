import type { Profile } from '@/types'

/**
 * Personal details. Edit freely — no component contains hard-coded content.
 */
export const profile: Profile = {
  name: 'Yuvrajsinh Gohil',
  shortName: 'Yuvrajsinh',
  monogram: 'YG',
  role: 'Software Engineer',
  tagline: 'Software engineer. Working on full-stack applications and building agentic systems.',
  location: 'Noida, India',
  email: 'hello@yuvrajsinh.dev',
  summary:
    'Software engineer building full-stack applications, agentic systems for automation, and the data pipelines underneath them.',
  aboutHeading: 'Engineering software',
  bio: [
    'I’ve spent my time building software end-to-end; handling everything from interactive interfaces to backend architectures, data pipelines, and building AI agents.',
    'Advances in AI mean almost any of us can touch any technology now. But generating code is the easy part. What still sets an engineer apart is first-principles thinking: understanding a system deeply enough to know when something is fragile, and caring about the quiet details that models ignore.',
    'Whenever the night is clear, I like looking up at the sky. That vast, empty space above us never fails to slow things down and make me think deeper.',
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
      href: 'https://www.youtube.com/@yuvrajsinh099',
      icon: 'youtube',
      color: '#FF0033',
      username: '@yuvrajsinh099',
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
      href: 'mailto:hello@yuvrajsinh.dev',
      icon: 'mail',
      color: '#EA9E4B',
      username: 'hello@yuvrajsinh.dev',
      primary: true,
    },
  ],
}
