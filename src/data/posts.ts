import type { Post } from '@/types'

/**
 * Writing. `slug` drives the detail route (/posts/:slug).
 *
 * Posts are structured data rather than MDX so the whole site stays a plain
 * Vite app with no extra toolchain; `body` is a list of typed blocks rendered
 * by `PostBody`. Add a block type in `src/types/portfolio.ts` and handle it
 * there if you need something new.
 */
const entries: Post[] = [
  {
    slug: 'hacknuthon-5',
    title: 'Building Brilliant++ at HackNUthon 5.0',
    date: '2024-04-22',
    description:
      'A 36-hour hackathon build: a learning platform that generates a transcript from a lecture video, then builds quiz questions from that transcript. It placed second overall and second in the EdTech track.',
    tags: ['Hackathon', 'EdTech', 'Next.js', 'TypeScript'],
    readingTime: '4 min read',
    coverImage: '/images/hacknuthon-5.0.jpg',
    coverAlt: 'Our team receiving the prize on stage at HackNUthon 5.0',
    featured: true,
    links: [
      {
        label: 'Source post',
        href: 'https://www.linkedin.com/posts/darshilthakkar_connections-hacknuthon5-edtech-ugcPost-7188162441602625536-niHe?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD9zvlEBoQx1buv8-u-6WqAlpbyhjIrxnq4',
        kind: 'linkedin',
      },
    ],
    body: [
      {
        type: 'paragraph',
        text: 'Our team, Formality, finished second twice at HackNUthon 5.0 — second overall, and second in the EdTech track sponsored by [Crest Data Systems](https://www.crestdata.ai). There were more than 800 participants across roughly 200 teams, which is the part I still think about.',
      },
      {
        type: 'paragraph',
        text: 'The team was Nirlep, Palash, Darshil and me. Four people who work quite differently is usually a problem by hour thirty; here it helped, because none of us got stuck on the same thing at the same time.',
      },
      { type: 'heading', text: 'What we built' },
      {
        type: 'paragraph',
        text: 'Brilliant++ is a platform for online courses. We picked a deliberately unglamorous problem: most course material is video, and video is passive. A student can sit through an hour of it and retain very little, and neither they nor the instructor finds out until an assessment — by which point the lecture is two weeks behind them.',
      },
      {
        type: 'paragraph',
        text: 'So the platform does four things:',
      },
      {
        type: 'list',
        items: [
          'Course creation, so an instructor can assemble a course without fighting the tool',
          'A transcript generated automatically for every video uploaded',
          'Assessments built from those transcripts, adapting to how the student answers',
          'A leaderboard ranked on performance rather than on time spent logged in',
        ],
      },
      {
        type: 'paragraph',
        text: 'The third one was the actual point of the project. The rest existed to give it something to work with.',
      },
      { type: 'heading', text: 'The stack' },
      {
        type: 'paragraph',
        text: 'Nothing exotic. With 36 hours on the clock we stuck to things we already knew, which mattered more than picking the best tool for each job.',
      },
      {
        type: 'list',
        items: [
          'Next.js and TypeScript on the front',
          'tRPC for the API, so the client and server shared types rather than a document nobody would have updated',
          'PostgreSQL with Prisma',
          "Google's Gemini for transcription and for generating questions",
          'Cloudinary for video and image assets',
        ],
      },
      { type: 'heading', text: 'Where it went wrong' },
      {
        type: 'paragraph',
        text: 'The features were fine. Integration was not, which is where hackathon projects usually come apart and ours was no exception. The AI pipeline and Cloudinary cost us the most: uploading a video, getting a transcript back, and handing that transcript to question generation took far longer to join up than any of the three took to write.',
      },
      {
        type: 'paragraph',
        text: 'We got there by working through it one seam at a time rather than trying to fix the whole chain at once. Next time I would budget more of the schedule for wiring things together and less for the features themselves.',
      },
      { type: 'heading', text: 'The demo' },
      {
        type: 'paragraph',
        text: 'For the judges we ran the whole chain live - upload a video, generate its transcript, then generate quiz questions from what the video actually said. Speech to text to comprehension, in one pass. It was the first time the four pieces felt like one thing rather than four.',
      },
      {
        type: 'image',
        src: '/images/hacknuthon-certificate.jpg',
        alt: 'Certificate of appreciation for securing second position in the Crest Data Systems track at HackNUthon 5.0',
      },
      {
        type: 'image',
        src: '/images/hacknuthon-goodies.jpg',
        alt: 'The Crest Data Systems track prize kit: a branded box, notebook, pen, T-shirt, snacks and a water bottle',
      },
      { type: 'heading', text: 'Since then' },
      {
        type: 'paragraph',
        text: 'It is open source. We are still adding to it, and still cleaning up the parts that were written against the clock.',
      },
      {
        type: 'link',
        href: 'https://github.com/yuvrajsinh5252/brilliant-plus-plus',
        label: 'Brilliant++ on GitHub',
        description: 'The full source for the platform we built over the 36 hours.',
      },
      {
        type: 'paragraph',
        text: 'Thanks to [CSI Nirma University](https://csi-nirma.in) and [Crest Data Systems](https://www.crestdata.ai) for running it, and to the mentors and organisers who kept 200 teams moving without the whole thing falling over.',
      },
    ],
  },
]

export const posts: Post[] = [...entries].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)

export const featuredPosts = posts.filter((post) => post.featured)

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}
