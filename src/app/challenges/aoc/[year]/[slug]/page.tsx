import { getCategoryListContent } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedPost } from "@/components/effects/animated-post";
import { IoIosArrowBack } from "react-icons/io";
import { MagicLink } from "@/components/effects/magiclink";
import { TabbedCodeBlock } from "@/components/ui/code-block";
import { Metadata } from "next";
import { FaCalendar } from "react-icons/fa";
import { createSEO } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

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
  code: (props: any) => (
    <code
      className="bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded text-sm border border-purple-500/20"
      {...props}
    />
  ),
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
    <main className="min-h-screen pt-24 sm:pt-32 md:pt-44 pb-16 sm:pb-20">
      <MaxWidthWrapper>
        <article className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <AnimatedPost>
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                <Link
                  href="/challenges"
                  className="inline-flex items-center gap-1 group"
                >
                  <IoIosArrowBack className="text-blue-400 transition-transform group-hover:-translate-x-1" />
                  <span className="group-hover:text-blue-400 transition-colors">
                    Back
                  </span>
                </Link>
                <span className="text-gray-600">/</span>
                <Link
                  href="/challenges/aoc"
                  className="hover:text-blue-400 transition-colors"
                >
                  AOC {challenge.year}
                </Link>
              </div>
            </div>

            <header className="mb-8 sm:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
                {challenge.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 border border-white/10 text-xs sm:text-sm text-gray-200">
                  <FaCalendar className="text-blue-400" size={14} />
                  {challenge.date}
                </span>
                <span className="inline-flex items-center rounded-lg bg-blue-500/10 px-2.5 py-1 text-[10px] sm:text-xs text-blue-300 border border-blue-400/20">
                  Advent of Code {challenge.year}
                </span>
              </div>
            </header>

            <div
              className="prose dark:prose-invert transition-all max-w-none
              prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-3 sm:prose-h2:mb-4 prose-h2:mt-6 sm:prose-h2:mt-10 prose-h2:text-white
              prose-h3:text-lg sm:prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-2 sm:prose-h3:mb-3 prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:text-white
              prose-p:text-gray-300 prose-p:leading-7 sm:prose-p:leading-8 prose-p:mb-4 sm:prose-p:mb-5 prose-p:text-[0.95rem] sm:prose-p:text-base
              prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-white/10 prose-img:max-w-full prose-img:h-auto
              prose-pre:!p-0 prose-pre:!bg-transparent prose-pre:!border-0
              prose-code:!bg-transparent prose-code:!border-0 prose-code:text-purple-300 prose-code:px-1 sm:prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs sm:prose-code:text-sm
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-gray-300 prose-ul:my-3 sm:prose-ul:my-4 prose-ul:text-sm sm:prose-ul:text-base
              prose-li:text-gray-300 prose-li:my-1.5 sm:prose-li:my-2 prose-li:text-sm sm:prose-li:text-base
              prose-blockquote:border-l-4 prose-blockquote:border-blue-400/30 prose-blockquote:pl-3 sm:prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400 prose-blockquote:bg-blue-500/5 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:text-sm sm:prose-blockquote:text-base
              prose-a:text-blue-400 prose-a:no-underline prose-a:hover:text-blue-300 prose-a:transition-colors prose-a:text-sm sm:prose-a:text-base"
            >
              <MDXRemote source={challenge.content} components={components} />
            </div>

            <div className="mt-8 flex justify-between">
              <Link
                href="/challenges/aoc"
                className="inline-flex items-center gap-2 px-1.5 py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors"
              >
                <IoIosArrowBack className="text-blue-400" />
                Back to Advent of Code
              </Link>
            </div>
          </AnimatedPost>
        </article>
      </MaxWidthWrapper>
    </main>
  );
}
