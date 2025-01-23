import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { FaArrowLeft } from "react-icons/fa";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedPost } from "@/components/effects/animated-post";

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
    <main className="min-h-screen pt-44 py-20">
      <article className="container mx-auto px-4 max-w-4xl">
        <AnimatedPost>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-12 group transition-colors"
          >
            <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-6 bg-clip-text">
              {post.title}
            </h1>
          </header>

          <div
            className="prose dark:prose-invert transition-all max-w-none
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3
            prose-img:rounded-xl prose-img:shadow-lg
        "
          >
            <MDXRemote source={post.content} />
          </div>
        </AnimatedPost>
      </article>
    </main>
  );
}
