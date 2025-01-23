import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { FaArrowLeft } from "react-icons/fa";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getBlogPost((await params).slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-24">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm mb-12 group transition-colors"
        >
          <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        <header className="mb-12">
          {post.coverImage && (
            <div className="relative h-[400px] w-full mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <h1 className="text-4xl font-bold mb-6 bg-clip-text">{post.title}</h1>

          <p className="text-lg dark:text-gray-400 text-gray-600 mb-6">
            {post.description}
          </p>
        </header>

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
