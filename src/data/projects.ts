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
    logo: '/images/projects/resolve.svg',
    icon: 'rust',
    iconColor: '#305A53',
    cover: '/images/projects/resolve.png',
    summary:
      'A self-hosted personal finance app, that tracks more than just net worth and provide a complete picture of your finances in one place.',
    description:
      'A modular, self-hosted personal finance platform built for Indian households. It tracks portfolios over multiple financial domains and facilitates a comprehensive view of your financial health, so the whole picture sits in one place rather than across multiple apps.',
    year: '2026',
    createdAt: '2026-09-20',
    status: 'in-progress',
    featured: true,
    stack: ['Rust', 'Axum', 'SeaORM', 'PostgreSQL', 'React', 'TypeScript', 'GCP', 'Docker'],
    metrics: [
      { label: 'Built for', value: 'Indian Households' },
      { label: 'Tracking', value: 'Most of your financial headache' },
      { label: 'Hosting', value: 'GCP (or Self-Hosted)' },
      { label: 'Privacy', value: '100% Sovereign' },
    ],
    sections: [
      {
        heading: 'The headache of fragmented finances',
        body: [
          'Managing personal and household finances usually ends up scattered across half a dozen tools: one app for daily bank spending, another for tracking portfolios, spreadsheets for loan EMIs or bills, and no simple way to coordinate shared expenses across family members.',
          'Spreadsheets quickly fall behind because maintaining them manually is tedious. Meanwhile, commercial platforms often require linking bank credentials and monetize user data.',
        ],
      },
      {
        heading: 'Why Resolve?',
        body: [
          'I built Resolve specifically tailored for Indian households to take on most of that financial headache under one roof:',
          '- **A Unified Picture**: Connects scattered accounts, liabilities, and recurring commitments so you can see your true financial standing at a glance instead of guessing from a vanity net-worth number.',
          '- **Household Collaboration**: Lets family members coordinate budgets, organize shared household responsibilities, and track where money actually goes.',
          '- **Built for Reliability**: Engineered with Rust, Axum, and SeaORM on PostgreSQL, containerized and hosted on GCP.',
          '- **Lightweight Self-Hosting**: Made lightweight enough that very low-spec hardware can self-host it for personal use even a **Raspberry Pi 4** (with 2 GB RAM) can run the entire containerized stack without breaking a sweat.',
        ],
      },
      {
        heading: 'Current status & what’s next',
        body: [
          'Resolve is actively in its progress phase. Because it is still evolving, certain features or options might be missing, and some parts might not work as expected yet.',
          'Upcoming milestones currently in the pipeline:',
          '- **Autonomous Financial Advisor Agents**: Intelligent agents designed to act like a personal financial advisor in high-impact, practical situations.',
          '- **End-to-End Encryption (E2EE)**: Client-side encryption ensuring sensitive financial data and transaction notes remain private, even across cloud hosting.',
          '- **Automated Statement Ingestion**: Parsing bank and broker statements directly to eliminate tedious manual reconciliation.',
          '- **Proactive Cashflow Warnings**: Anticipating upcoming cash crunches before large recurring liabilities or bills hit.',
          'If you explore the live demo and have any feedback, ideas, or feature suggestions or if you would like to self-host it for your personal use please feel free to [contact me](mailto:hello@yuvrajsinh.dev)!',
        ],
      },
    ],
    links: [
      { label: 'Live', href: 'https://resolve.yuvrajsinh.dev', kind: 'demo' },
      { label: 'Contact to Self-Host', href: 'mailto:hello@yuvrajsinh.dev', kind: 'other' },
    ],
  },
  {
    slug: 'leetcode-cli',
    title: 'LeetCode CLI',
    icon: 'leetcode',
    iconColor: '#FFA116',
    cover: '/images/projects/leetcode-cli.png',
    summary:
      'A command-line client for LeetCode - solve, test and submit without leaving the terminal.',
    description:
      'A command-line client for LeetCode. Browse problems, scaffold a solution file, run the sample tests and submit, all from the terminal where the code already is.',
    year: '2025',
    createdAt: '2025-02-05',
    status: 'live',
    featured: true,
    stack: ['Python', 'Typer', 'Rich', 'GraphQL', 'CLI'],
    metrics: [
      { label: 'PyPI Package', value: '[leetcli](https://pypi.org/project/leetcli/)' },
      { label: 'Downloads', value: '3k+' },
    ],
    sections: [
      {
        heading: 'Solving LeetCode without leaving the terminal',
        body: [
          'I built [leetcli](https://pypi.org/project/leetcli/) because jumping between browser tabs and an editor broke my flow. The CLI brings the entire practice loop directly into the shell—from fetching problems to testing and submitting.',
          'Built with Python and `Typer`, it interfaces with LeetCode’s GraphQL API and uses `Rich` to format problem statements, code blocks, and test output cleanly in the terminal.',
        ],
      },
      {
        heading: 'Core commands & workflow',
        body: [
          '- **`lc daily`**: Fetch today’s challenge and launch it directly in your preferred editor (`vim`, `nvim`, `code`)',
          '- **`lc list` & `lc show`**: Filter problems by difficulty, category, or tag, and read formatted descriptions in terminal Markdown',
          '- **`lc edit`**: Scaffold the problem file in your language of choice and start coding',
          '- **`lc test` & `lc submit`**: Run sample test cases against your file and submit solutions directly to LeetCode',
          '- **`lc solutions`**: Read top community solutions without opening a browser',
        ],
      },
    ],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/yuvrajsinh5252/leetcode-cli',
        kind: 'repo',
      },
      {
        label: 'PyPI (leetcli)',
        href: 'https://pypi.org/project/leetcli/',
        kind: 'other',
      },
    ],
  },
  {
    slug: 'chess-game',
    title: 'Chess Game',
    logo: '/images/projects/chess-logo.png',
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
    stack: ['Next.js', 'TypeScript', 'Pusher', 'Stockfish', 'Zustand', 'Redis', 'PostgreSQL'],
    metrics: [
      { label: 'Origin', value: 'College 1st Year' },
      { label: 'Evolution', value: 'Complete Rebuild' },
      { label: 'Matchmaking', value: 'Redis Queue' },
      { label: 'Analysis', value: 'Stockfish + FEN' },
    ],
    sections: [
      {
        heading: 'My first full-stack app, and why I rebuilt it',
        body: [
          'Back in my first year of college, I decided to build a multiplayer chess platform as my very first full-stack project. It technically worked, but looking back, the biggest pain points were UI design and overwhelming state management complexity—trying to juggle active turns, clocks, move history, and board re-renders without a proper architectural foundation turned the code into a fragile knot of bugs.',
          'Later on, with more engineering experience under my belt, I felt the urge to rebuild it properly from scratch. I wanted to give it clean visual design, tame the state management with a solid client store, and build something I could actually be proud of.',
        ],
      },
      {
        heading: 'Designing the new version from the ground up',
        body: [
          'The new version was built using `Next.js` and `TypeScript`. To conquer the state management headaches of the first iteration, I used `Zustand` to manage the board state and active turns cleanly on the client, with `Pusher` WebSockets broadcasting moves in real time between opponents.',
          'For matchmaking, I used `Redis` to manage the player queue and pairing logic, pairing available players into live match rooms efficiently.',
          'I also integrated the `Stockfish API` using FEN (Forsyth–Edwards Notation) strings for position evaluations and dashboard overviews. The application queries Stockfish with FEN representations of games, and parses the notation back into visual board snapshots on the dashboard so players can see game previews at a glance.',
        ],
      },
      {
        heading: 'Where it stands today',
        body: [
          'It still doesn’t have every single feature I originally dreamed up, but it achieved what I set out to do: taking a messy, overly complex first-year college experiment and replacing it with a clean, responsive, and well-architected application.',
          '- **Clean State Management**: Solved earlier state complexity using Zustand to handle board updates, turns, and timers predictably',
          '- **Redis Matchmaking**: Fast player queueing and room pairing powered by Redis',
          '- **Real-Time Play**: Snappy move broadcasting across players via Pusher WebSockets',
          '- **Stockfish & FEN Snapshots**: Evaluates board states via the Stockfish API using FEN strings, converting notation back into visual board snapshots on the dashboard',
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
    logo: '/images/projects/brilliant-logo.png',
    icon: 'gemini',
    iconColor: '#8E75B2',
    cover: '/images/projects/brilliant-plus-plus.png',
    summary:
      'An AI learning platform that transcribes lecture video and builds quizzes from the transcript.',
    description:
      'An AI-powered education platform built with a team of four at HackNUthon 5.0. It transcribes lecture videos, syncs timestamps with transcripts, and dynamically generates quizzes using the Gemini API.',
    year: '2024',
    createdAt: '2024-07-25',
    status: 'live',
    stack: ['Next.js', 'TypeScript', 'Gemini API', 'PostgreSQL'],
    metrics: [
      { label: 'HackNUthon 2024', value: '2nd Place' },
      { label: 'Participants', value: '800+' },
      { label: 'Team', value: '4 Engineers' },
      { label: 'Sprint', value: '36 Hours' },
    ],
    sections: [
      {
        heading: 'Built with a team of four at HackNUthon 5.0',
        body: [
          'Brilliant++ was built during a 36-hour hackathon by our team (Nirlep, Palash, Darshil, and me). We wanted to make online video lectures interactive rather than passive, automatically transcribing uploaded lectures and generating adaptive quizzes using the Gemini API.',
          'The project won **2nd place overall** among 800+ participants and 2nd in the EdTech track.',
          'I wrote a full post detailing how we built it, the architecture, and how our team navigated the 36-hour sprint. Read the write-up here: [Building Brilliant++ at HackNUthon 5.0](/posts/hacknuthon-5).',
        ],
      },
    ],
    links: [
      { label: 'Read Post', href: '/posts/hacknuthon-5', kind: 'article' },
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
    logo: '/images/projects/whispherdocs-logo.png',
    icon: 'trpc',
    iconColor: '#2596BE',
    cover: '/images/projects/whispherdocs.png',
    summary: 'Upload a PDF and talk to it - answers grounded in the document itself.',
    description:
      'A full-stack RAG application that lets you upload PDFs and chat with them in natural language, streaming responses with page-level citations.',
    year: '2023',
    createdAt: '2023-12-02',
    status: 'live',
    stack: ['Next.js', 'TypeScript', 'Pinecone', 'Cohere', 'Prisma', 'Tailwind CSS'],
    metrics: [
      { label: 'Core Tech', value: 'RAG Pipeline' },
      { label: 'Vector Store', value: 'Pinecone' },
      { label: 'Embeddings', value: 'Cohere' },
      { label: 'Citations', value: 'Page-Level' },
    ],
    sections: [
      {
        heading: 'Chatting with documents using RAG',
        body: [
          'I built WhispherDocs when I was first exploring Retrieval-Augmented Generation (RAG) and vector databases. Instead of skimming through long PDFs or pasting walls of text into ChatGPT, you upload a PDF and ask questions directly in natural language.',
          'Uploaded files are processed, embedded using `Cohere`, and indexed into `Pinecone`. When you submit a question, the app retrieves the most relevant passages and streams back answers with direct, page-level citations so you can quickly cross-check the source.',
        ],
      },
      {
        heading: 'Key features',
        body: [
          '- **`Instant Citations`**: Every generated response links directly to the page number where the information was found',
          '- **`Model Selection`**: Support for streaming responses and toggling between different AI models (Cohere, Gemini, Groq)',
          '- **`Full-Stack Pipeline`**: Built on Next.js, Prisma, and UploadThing for smooth file uploads and persistent chat history',
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
    stack: ['Java', 'JavaFX', 'MySQL', 'JFoenix', 'Maven'],
    metrics: [
      { label: 'Built for', value: 'Learning Java' },
      { label: 'UI', value: 'JavaFX + JFoenix' },
      { label: 'Build Tool', value: 'Maven' },
      { label: 'Database', value: 'MySQL' },
    ],
    sections: [
      {
        heading: 'Learning Java with my first GUI application',
        body: [
          'Back when I was first learning Java, I wanted to build something interactive beyond standard console exercises. This was my first time dealing with desktop GUI programming, handling event listeners, and connecting an interface to a database.',
          'The application is a clean desktop task manager: users sign in, organize their daily to-dos, manage categories, and have their tasks saved persistently to a local MySQL database.',
        ],
      },
      {
        heading: 'Why I migrated the build to Maven',
        body: [
          'Initially, I managed external libraries—like the MySQL JDBC driver and JFoenix Material controls—by manually downloading `.jar` files and adding them to the IDE classpath. That quickly became messy, hard to track, and fragile to set up on any other machine.',
          'Migrating the project to **Maven** solved that immediately. It standardized the project structure, automated dependency resolution directly from Maven Central, and turned a fragile manual build into a clean, reproducible build.',
        ],
      },
      {
        heading: 'Key takeaways',
        body: [
          '- **First Desktop UI**: Learned the fundamentals of event-driven programming and layout design in JavaFX',
          '- **Relational Storage**: Handled user authentication, password hashing, and CRUD operations against MySQL via JDBC',
          '- **Build Automation**: Experienced firsthand why build tools like Maven are essential over manually juggling loose `.jar` files',
        ],
      },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/yuvrajsinh5252/TODO-app', kind: 'repo' },
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
