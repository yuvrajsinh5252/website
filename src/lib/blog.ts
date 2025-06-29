import { BlogPost, BlogMeta } from "@/types/blog";

// Static blog data - no filesystem dependencies
const BLOG_POSTS: BlogPost[] = [
  {
    slug: "hacknuthon-5.0",
    title: "HackNUthon 5.0: Victory Unleashed",
    description:
      "I'm thrilled to share an incredible milestone - our team Formality secured not just one, but two major victories at HackNUthon 5.0! We clinched 2nd place...",
    date: "2024-04-22",
    tags: ["Hackathon", "EdTech", "Next.js", "TypeScript"],
    category: "personal",
    readingTime: "3 min read",
    coverImage: "/images/hacknuthon-5.0.jpg",
    content: `🎉 I'm thrilled to share an incredible milestone - our team Formality secured not just one, but two major victories at HackNUthon 5.0! We clinched 2nd place in both the overall category and the EdTech track sponsored by Crest Data Systems. Among 800+ participants and roughly 200 teams, this achievement feels extra special.

![Award ceremony at HackNUthon 5.0](/images/hacknuthon-5.0.jpg)

## Meet the Team

The success of this project wouldn't have been possible without my exceptional teammates. Working alongside Nirlep, Palash, and Darshil was an enriching experience, with each of us bringing unique perspectives to the project.

## Project Overview

We developed Brilliant++, an educational technology platform designed to transform the online learning experience. Our focus was on creating an engaging, interactive learning environment with key features that address common challenges in digital education:

- Streamlined course creation system
- Automated video transcript generation
- AI-powered adaptive assessment system
- Performance-based leaderboard implementation

## Technical Architecture

Our technology stack was carefully chosen to ensure scalability and performance:
- Next.js with TypeScript for robust frontend development
- tRPC for efficient API implementation
- PostgreSQL with Prisma for database management
- Google's Gemini AI for intelligent content processing
- Cloudinary for media asset management

## Development Process

The 36-hour development cycle presented significant challenges, particularly during the critical integration phase. We encountered notable technical hurdles with our AI integration and Cloudinary implementation, but through systematic problem-solving and effective collaboration, we successfully resolved these issues.

## Final Presentation

During our presentation to the judges, we demonstrated the platform's advanced AI capabilities: automatically generating accurate video transcripts and using these transcripts to create contextual quiz questions from video content. This showcased a practical end-to-end application of our AI integration, from speech-to-text to intelligent content analysis.

## Future Development

The project is open-source and available for review: [Brilliant++ Repository](https://github.com/yuvrajsinh5252/brilliant-plus-plus). We are currently exploring additional features and optimizations to enhance the platform's capabilities.

## Acknowledgments

We extend our sincere gratitude to CSI Nirma University and Crest Data Systems for organizing this opportunity. The guidance from mentors and support from the organizing team were instrumental in our success.

This hackathon experience reinforced the value of focused teamwork and innovative problem-solving in software development. For those considering participation in future hackathons, it provides an excellent opportunity for both technical growth and professional development.`,
  },
];

export const getBlogPosts = (): BlogMeta[] => {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    category: post.category,
    readingTime: post.readingTime,
    coverImage: post.coverImage,
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogPost = (slug: string): BlogPost | null => {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  return post || null;
};
