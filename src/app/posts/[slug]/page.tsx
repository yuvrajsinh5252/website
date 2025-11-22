import { getPost } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedPost } from "@/components/effects/animated-post";
import { IoIosArrowBack } from "react-icons/io";
import { MagicLink } from "@/components/effects/magiclink";
import { Metadata } from "next";
import { FaCalendar } from "react-icons/fa";
import { createSEO } from "@/lib/seo";
import Image from "next/image";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { MDX_STYLES } from "@/lib/utils";
import { Pre } from "@/components/ui/code-block";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getPost(slug);

  if (!post) {
    return notFound();
  }

  return createSEO({
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.date,
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
  img: (props: any) => (
    <Image
      {...props}
      alt={props.alt || "Image"}
      width={props.width || 800}
      height={props.height || 600}
      className="rounded-xl shadow-lg my-4 border border-white/10"
      unoptimized={props.src?.startsWith("http")}
    />
  ),
  pre: Pre,
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const postData = await params;
  const post = getPost(postData.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 sm:pt-32 md:pt-44 pb-16 sm:pb-20">
      <MaxWidthWrapper>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <AnimatedPost>
            <div className="mb-6 sm:mb-8">
              <Link
                href="/posts"
                className="inline-flex items-center gap-1 group text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors"
              >
                <IoIosArrowBack className="text-blue-400 transition-transform group-hover:-translate-x-1" />
                Back to Posts
              </Link>
            </div>

            <header className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                {post.title}
              </h1>
              <span className="inline-flex items-center gap-2 text-xs text-gray-400 shrink-0">
                <FaCalendar className="text-blue-400" size={14} />
                {post.date}
              </span>
            </header>

            <div className="relative">
              <div className={MDX_STYLES}>
                <MDXRemote source={post.content} components={components} />
              </div>
            </div>
          </AnimatedPost>
        </article>
      </MaxWidthWrapper>
    </main>
  );
}
