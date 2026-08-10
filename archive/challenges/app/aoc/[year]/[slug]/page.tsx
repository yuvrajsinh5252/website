import { getCategoryListContent } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedPost } from "@/components/effects/animated-post";
import { IoIosArrowBack } from "react-icons/io";
import { MagicLink } from "@/components/effects/magiclink";
import { TabbedCodeBlock, Pre } from "@/components/ui/code-block";
import { Metadata } from "next";
import { FaCalendar } from "react-icons/fa";
import { createSEO } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { MDX_STYLES } from "@/lib/utils";

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
    title: `AoC Day ${challenge.day}: ${challenge.title}`,
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
      className="bg-white/10 text-gray-200 px-1.5 py-0.5 rounded text-sm border border-white/10"
      {...props}
    />
  ),
  pre: Pre,
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
        <article className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
              <div className="mb-4">
                <MagicLink
                  href={`https://adventofcode.com/${challenge.year}/day/${challenge.day}`}
                  external
                  className="text-gray-300 font-medium hover:text-white transition-colors"
                >
                  Advent of Code {challenge.year} Day {challenge.day}
                </MagicLink>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                  {challenge.title}
                </h1>
                <span className="inline-flex items-center gap-2 text-xs text-gray-400 shrink-0">
                  <FaCalendar className="text-blue-400" size={14} />
                  {challenge.date}
                </span>
              </div>
            </header>

            <div className="relative">
              <div className={MDX_STYLES}>
                <MDXRemote source={challenge.content} components={components} />
              </div>
            </div>
          </AnimatedPost>
        </article>
      </MaxWidthWrapper>
    </main>
  );
}
