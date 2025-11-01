import { getCategoryListContent } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedPost } from "@/components/effects/animated-post";
import { IoIosArrowBack } from "react-icons/io";
import { MagicLink } from "@/components/effects/magiclink";
import { CodeBlock } from "@/components/ui/code-block";
import { TabbedCodeBlock } from "@/components/ui/tabbed-code-block";
import { Metadata } from "next";
import { FaCalendar } from "react-icons/fa";
import { createSEO } from "@/lib/seo";
import { siteConfig } from "@/config/site";

interface Props {
  params: Promise<{ slug: string; year: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const year = (await params).year;
  const challenge = getCategoryListContent(slug, year);

  if (!challenge) {
    return notFound();
  }

  return createSEO({
    title: challenge.title,
    description: `Advent of Code ${challenge.year} solution for ${challenge.title}`,
    type: "article",
    publishedTime: challenge.date,
    canonical: `${siteConfig.url}/challenges/aoc/${year}/${slug}`,
  });
}

const components = {
  a: (props: any) => (
    <MagicLink
      className="no-underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: (props: any) => {
    if (!props.className) {
      return (
        <code className="bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded text-sm border border-purple-500/20" {...props} />
      );
    }
    return <CodeBlock {...props} />;
  },
  TabbedCodeBlock,
};

export default async function AOCChallengePage({
  params,
}: {
  params: Promise<{ slug: string; year: string }>;
}) {
  const slug = (await params).slug;
  const year = (await params).year;

  const challenge = getCategoryListContent(slug, year);

  if (!challenge) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 sm:pt-32 md:pt-44 py-8 sm:py-12 md:py-20">
      <article className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
        <AnimatedPost>
          {/* Breadcrumb Navigation */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Link
              href="/challenges"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 group transition-colors hover:text-blue-400"
            >
              <IoIosArrowBack className="text-blue-400 text-base sm:text-lg transition-transform group-hover:-translate-x-1" />
              Challenges
            </Link>
            <span className="text-gray-600 hidden sm:block">/</span>
            <Link
              href="/challenges/aoc"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 group transition-colors hover:text-blue-400"
            >
              AOC {challenge.year}
            </Link>
          </div>

          {/* Header */}
          <header className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {challenge.title}
              </h1>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/5 border border-white/10 w-fit">
                <FaCalendar className="text-blue-400 text-xs sm:text-sm" size={14} />
                <span className="text-xs sm:text-sm text-gray-300">{challenge.date}</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose dark:prose-invert transition-all max-w-none
            prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-3 sm:prose-h2:mb-4 prose-h2:mt-6 sm:prose-h2:mt-10 prose-h2:text-white
            prose-h3:text-lg sm:prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-2 sm:prose-h3:mb-3 prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:text-white
            prose-p:text-gray-300 prose-p:leading-6 sm:prose-p:leading-7 prose-p:mb-3 sm:prose-p:mb-4 prose-p:text-sm sm:prose-p:text-base
            prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-white/10 prose-img:max-w-full
            prose-pre:!p-0 prose-pre:!bg-transparent prose-pre:!border-0
            prose-code:text-purple-300 prose-code:bg-purple-500/10 prose-code:px-1 sm:prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs sm:prose-code:text-sm prose-code:border prose-code:border-purple-500/20
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-gray-300 prose-ul:my-3 sm:prose-ul:my-4 prose-ul:text-sm sm:prose-ul:text-base
            prose-li:text-gray-300 prose-li:my-1.5 sm:prose-li:my-2 prose-li:text-sm sm:prose-li:text-base
            prose-blockquote:border-l-4 prose-blockquote:border-blue-400/30 prose-blockquote:pl-3 sm:prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400 prose-blockquote:bg-blue-500/5 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:text-sm sm:prose-blockquote:text-base
            prose-a:text-blue-400 prose-a:no-underline prose-a:hover:text-blue-300 prose-a:transition-colors prose-a:text-sm sm:prose-a:text-base"
          >
            <MDXRemote source={challenge.content} components={components} />
          </div>
        </AnimatedPost>
      </article>
    </main>
  );
}
