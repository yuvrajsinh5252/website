import { getCategoryList } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedPost } from "@/components/effects/animated-post";
import { IoIosArrowBack } from "react-icons/io";
import { MagicLink } from "@/components/effects/magiclink";
import { Metadata } from "next";
import { FaCalendar, FaClock } from "react-icons/fa";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const challenge = getCategoryList().find(
    (challenge) => challenge.slug === slug
  );

  if (!challenge) {
    return notFound();
  }

  return {
    title: `${challenge.title}`,
    description: challenge.description,
    keywords: [
      "advent of code",
      "aoc",
      "aoc 2024",
      "yuvrajsinh gohil",
      "programming",
      "algorithms",
      "problem solving",
    ],
    openGraph: {
      title: `${challenge.title}`,
      description: challenge.description,
      type: "article",
      url: `https://www.yuvrajsinh.me/challenges/aoc/${slug}`,
      siteName: "Yuvrajsinh Gohil",
    },
    twitter: {
      card: "summary_large_image",
      title: `${challenge.title}`,
      description: challenge.description,
      creator: "@Yuvrajsinh_099",
    },
  };
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
};

export default async function AOCChallengePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const challenge = getCategoryList().find(
    (challenge) => challenge.slug === slug
  );

  console.log(challenge);

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
              AOC 2024
            </Link>
          </div>

          <header className="mb-12">
            <h1 className="text-4xl font-bold bg-clip-text mb-4">
              {challenge.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <FaCalendar className="text-blue-400" size={16} />
                {challenge.date}
              </span>
              <span className="flex items-center gap-2">
                <FaClock className="text-blue-400" size={16} />
                {challenge.readingTime}
              </span>
            </div>
          </header>

          <div
            className="prose dark:prose-invert transition-all max-w-none
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3
            prose-img:rounded-xl prose-img:shadow-lg
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700
            prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
          >
            <MDXRemote source={challenge.content} components={components} />
          </div>
        </AnimatedPost>
      </article>
    </main>
  );
}
