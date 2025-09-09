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
        <code className="bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
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
    <main className="min-h-screen pt-44 py-20">
      <article className="container mx-auto px-4 max-w-4xl">
        <AnimatedPost>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/challenges"
              className="inline-flex items-center gap-2 text-sm group transition-colors hover:text-blue-400"
            >
              <IoIosArrowBack className="text-blue-400 text-lg transition-transform group-hover:-translate-x-1" />
              Challenges
            </Link>
            <span className="text-gray-500 hidden sm:block">/</span>
            <Link
              href="/challenges/aoc"
              className="inline-flex items-center gap-2 text-sm group transition-colors hover:text-blue-400"
            >
              AOC {challenge.year}
            </Link>
          </div>

          <header className="mb-12 flex justify-between items-center">
            <h1 className="text-4xl font-bold bg-clip-text">
              {challenge.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <FaCalendar className="text-blue-400" size={16} />
                {challenge.date}
              </span>
            </div>
          </header>

          <div
            className="prose dark:prose-invert transition-all max-w-none
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-8
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-6
            prose-p:text-gray-300 prose-p:leading-7
            prose-img:rounded-xl prose-img:shadow-lg
            prose-pre:!p-0 prose-pre:!bg-transparent prose-pre:!border-0
            prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-strong:text-white prose-strong:font-semibold"
          >
            <MDXRemote source={challenge.content} components={components} />
          </div>
        </AnimatedPost>
      </article>
    </main>
  );
}
