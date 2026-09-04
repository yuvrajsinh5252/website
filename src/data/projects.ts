import type { Project } from '@/types'

/**
 * Projects. `slug` drives the detail route (/projects/:slug).
 * Mark up to three as `featured` to pin them on the landing page.
 * The exported list is sorted newest first by `createdAt`.
 *
 * `icon` and `iconColor` describe the mark shown wherever the project is
 * linked; `cover` points at the generated artwork in
 * `public/images/projects/`.
 */
const entries: Project[] = [
  {
    slug: 'resolve',
    title: 'Resolve',
    icon: 'rust',
    iconColor: '#F74C00',
    cover: '/images/projects/resolve.png',
    summary:
      'A self-hosted personal finance app — portfolios, assets, income and liabilities tracked in one place.',
    description:
      'A modular, self-hosted personal finance platform. It tracks portfolios over real-time market instruments alongside manual assets, income sources, expenses, liabilities and bank accounts, so the whole picture sits in one place rather than across five apps.',
    year: '2026',
    createdAt: '2026-09-20',
    status: 'in-progress',
    featured: true,
    stack: ['Rust', 'Axum', 'SeaORM', 'PostgreSQL', 'React 19', 'TypeScript', 'Docker'],
    highlights: [
      'Portfolios modelled over real-time market instruments, manual assets, income, expenses and liabilities in one place',
      'Argon2 hashing, JWT sessions and 2FA behind a Caddy proxy exposing a single public endpoint',
      'Encrypted at rest and tuned to run on low-resource hosting',
      'Modular by design, so any one part can be replaced without disturbing the rest',
    ],
    sections: [
      {
        heading: 'Why',
        body: [
          'Most finance apps I tried stopped at a single number. Net worth tells you how the year went, but not which liability to clear first or which holding is quietly dragging.',
          'The other problem was access. Aggregators want read access to every account you own, and self-hosting was the only version of this I was comfortable actually running.',
        ],
      },
      {
        heading: 'How it works',
        body: [
          'A Rust service on Axum and SeaORM owns the domain, so the money rules live in one typed place rather than being re-implemented per screen. PostgreSQL holds the ledger; market instruments are priced live and reconciled against manual entries.',
          'Authentication is Argon2 and JWT with 2FA, and the whole thing sits behind a Caddy proxy that exposes exactly one public endpoint. It is packaged with Docker and tuned to be comfortable on the cheapest box that will run it.',
        ],
      },
    ],
  },
  {
    slug: 'leetcode-cli',
    title: 'LeetCode CLI',
    icon: 'leetcode',
    iconColor: '#FFA116',
    cover: '/images/projects/leetcode-cli.png',
    summary:
      'A command-line client for LeetCode — solve, test and submit without leaving the terminal.',
    description:
      'A command-line client for LeetCode. Browse problems, scaffold a solution file, run the sample tests and submit, all from the terminal where the code already is.',
    year: '2025',
    createdAt: '2025-02-05',
    status: 'live',
    featured: true,
    stack: ['Python', 'Typer', 'CLI', 'LeetCode API'],
    metrics: [
      { label: 'Downloads', value: '3k+' },
      { label: 'Context switches', value: 'Zero' },
    ],
    highlights: [
      'Fetch, solve, test and submit without opening a browser',
      'Local scaffolding, so solutions live in your own repo and your own editor',
      'Readable diffs when a sample test fails',
    ],
    sections: [
      {
        heading: 'Why',
        body: [
          'Practising meant jumping between an editor and a browser tab, which broke my flow more than the problems did. Everything I needed was already in the terminal.',
        ],
      },
      {
        heading: 'How it works',
        body: [
          'A Typer-based CLI wraps the LeetCode endpoints, caches problem metadata locally and writes solution stubs in the language you pick.',
          'Test output is formatted as a diff against the expected result, so a failure is readable at a glance rather than a wall of JSON.',
        ],
      },
    ],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/yuvrajsinh5252/leetcode-cli',
        kind: 'repo',
      },
    ],
  },
  {
    slug: 'chess-game',
    title: 'Chess Game',
    icon: 'chess',
    iconColor: '#81B64C',
    cover: '/images/projects/chess-game.png',
    summary:
      'A multiplayer chess platform with realtime play, matchmaking, chat and ELO ratings.',
    description:
      'A full multiplayer chess platform. Two-player games, a global arena and a Stockfish opponent when nobody is online, with realtime matchmaking, private rooms, in-app chat and an ELO ranking system.',
    year: '2024',
    createdAt: '2024-08-12',
    status: 'live',
    featured: true,
    stack: ['Next.js', 'TypeScript', 'Pusher', 'Stockfish', 'Zustand', 'Redis'],
    metrics: [
      { label: 'Game modes', value: '3' },
      { label: 'Move latency', value: '<100ms' },
    ],
    highlights: [
      'Two-player, global arena and Stockfish engine modes',
      'Realtime matchmaking, private rooms and in-app chat over Pusher WebSockets',
      'Game logic and state in Zustand, with an ELO-based ranking system',
      'Reconnect handling, so refreshing mid-game does not forfeit it',
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Most hobby chess apps handle the happy path and fall apart the moment a player refreshes mid-game or drops off the network.',
        ],
      },
      {
        heading: 'Approach',
        body: [
          'Game state is authoritative on the server and mirrored into a Zustand store, so a reconnecting client replays into the current position instead of losing the game.',
          'Pusher carries move events and Redis holds the live session state; Stockfish runs in a worker so the board stays responsive while the engine thinks.',
        ],
      },
    ],
    links: [
      { label: 'Play', href: 'https://chess.yuvrajsinh.dev', kind: 'demo' },
      { label: 'Source', href: 'https://github.com/yuvrajsinh5252/ChessGame', kind: 'repo' },
    ],
  },
  {
    slug: 'brilliant-plus-plus',
    title: 'Brilliant++',
    icon: 'gemini',
    iconColor: '#8E75B2',
    cover: '/images/projects/brilliant-plus-plus.png',
    summary:
      'An AI learning platform that transcribes lecture video and builds quizzes from the transcript.',
    description:
      'An AI-powered education platform built at HackNUthon 5.0. It transcribes uploaded lecture video, then generates assessments from that transcript, weighted towards whatever the student keeps getting wrong.',
    year: '2024',
    createdAt: '2024-07-25',
    status: 'live',
    stack: ['Next.js', 'TypeScript', 'Gemini', 'PostgreSQL'],
    metrics: [
      { label: 'HackNUthon 2024', value: '2nd' },
      { label: 'Participants', value: '800+' },
    ],
    highlights: [
      'Second place overall among 800+ participants at HackNUthon 2024',
      'Automatic transcripts for uploaded course video, so lectures become searchable',
      'Quiz generation weighted towards the topics a student keeps missing',
    ],
    sections: [
      {
        heading: 'What it does',
        body: [
          'Course material goes in; questions come out, weighted towards the topics a student keeps getting wrong.',
          'Uploaded video is transcribed and aligned, so you can search a lecture instead of scrubbing back through it.',
        ],
      },
    ],
    links: [
      { label: 'Live', href: 'https://brilliant-plus-plus.vercel.app', kind: 'demo' },
      {
        label: 'Source',
        href: 'https://github.com/yuvrajsinh5252/brilliant-plus-plus',
        kind: 'repo',
      },
    ],
  },
  {
    slug: 'whispherdocs',
    title: 'WhispherDocs',
    icon: 'trpc',
    iconColor: '#2596BE',
    cover: '/images/projects/whispherdocs.png',
    summary: 'Upload a PDF and talk to it — answers grounded in the document itself.',
    description:
      'A website that lets you upload a PDF and interact with it through a chat interface, answering questions from the contents of the document rather than from the model’s memory.',
    year: '2023',
    createdAt: '2023-12-02',
    status: 'live',
    stack: ['Next.js', 'TypeScript', 'tRPC', 'Cohere'],
    highlights: [
      'Answers grounded in the uploaded document, with the source retrieved per question',
      'Streaming responses over tRPC, typed end to end',
    ],
    sections: [
      {
        heading: 'How it works',
        body: [
          'Uploaded PDFs are chunked and embedded, then retrieved per question so an answer cites the document rather than inventing one.',
        ],
      },
    ],
    links: [
      { label: 'Live', href: 'https://whispherdocs.yuvrajsinh.dev', kind: 'demo' },
      {
        label: 'Source',
        href: 'https://github.com/yuvrajsinh5252/WhispherDocs',
        kind: 'repo',
      },
    ],
  },
  {
    slug: 'todo-app',
    title: 'TODO App',
    icon: 'java',
    iconColor: '#ED8B00',
    cover: '/images/projects/todo-app.png',
    summary: 'A desktop task manager in JavaFX with authentication and persistent storage.',
    description:
      'A GUI task manager built with JavaFX. Users sign in and their tasks persist to MySQL between sessions.',
    year: '2023',
    createdAt: '2023-10-27',
    status: 'archived',
    stack: ['Java', 'JavaFX', 'MySQL', 'JFoenix'],
    highlights: ['User authentication', 'Tasks persisted to MySQL between sessions'],
    links: [
      { label: 'Source', href: 'https://github.com/yuvrajsinh5252/TODO-app', kind: 'repo' },
    ],
  },
  {
    slug: 'portfolio',
    title: 'This Portfolio',
    icon: 'vite',
    iconColor: '#646CFF',
    cover: '/images/projects/portfolio.png',
    summary: 'A config-driven portfolio with a central theming layer and a canvas horizon.',
    description:
      'Built with React 19, Vite, Tailwind CSS v4 and Motion. All content lives in typed config files, theming is one stylesheet of design tokens, and the hero horizon is drawn on a canvas.',
    year: '2026',
    createdAt: '2026-09-02',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Motion'],
    highlights: [
      'Content and theme entirely data-driven, so a change is an edit to one typed file',
      'Light, dark and system modes with swappable accent palettes',
      'Canvas horizon, meteors and orbiting satellites, all reduced-motion aware',
    ],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/yuvrajsinh5252/website',
        kind: 'repo',
      },
    ],
  },
]

export const projects: Project[] = [...entries].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
)

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
