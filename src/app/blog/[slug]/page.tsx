import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { format } from "date-fns";
import { FaClock, FaTag, FaArrowLeft } from "react-icons/fa";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-24">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-12 group transition-colors"
        >
          <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative h-[400px] w-full mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            </div>
          )}

          {/* Meta */}
          <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-400">
            <time dateTime={post.date}>
              {format(new Date(post.date), "MMMM d, yyyy")}
            </time>
            <span className="flex items-center gap-1">
              <FaClock className="text-xs" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-6">{post.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full
                  bg-purple-500/10 px-3 py-1 text-sm
                  text-purple-400"
              >
                <FaTag className="text-xs" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-invert prose-purple max-w-none
          prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4
          prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white/90
          prose-code:text-pink-400 prose-code:bg-white/5 prose-code:rounded prose-code:px-1
          prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-white/10
          prose-img:rounded-xl prose-img:shadow-lg
          prose-blockquote:border-l-purple-400 prose-blockquote:bg-white/[0.03] prose-blockquote:rounded-r
          prose-li:text-gray-300
        "
        >
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  );
}
