import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedPost } from "@/components/effects/animated-post";
import { IoIosArrowBack } from "react-icons/io";
import { MagicLink } from "@/components/effects/magiclink";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { FaCalendar } from "react-icons/fa";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postData = await params;
  const post = getBlogPost(postData.slug);

  if (!post) {
    return notFound();
  }

  return constructMetadata({
    title: `${post.title} - Yuvrajsinh Gohil`,
    description: post.description,
    image: post.coverImage || "/logo.png",
  });
}

export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const postData = await params;
  const post = getBlogPost(postData.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-44 py-20">
      <article className="container mx-auto px-4 max-w-4xl">
        <AnimatedPost>
          <Link
            href="/writings"
            className="inline-flex items-center gap-2 text-sm mb-12 group transition-colors"
          >
            <IoIosArrowBack className="text-blue-400 text-lg transition-transform group-hover:-translate-x-1" />
            Back to Writings
          </Link>

          <header className="mb-12 flex justify-between items-center">
            <h1 className="text-4xl font-bold bg-clip-text">{post.title}</h1>
            <p className="max-sm:hidden text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2 transition-colors">
              <FaCalendar className="inline-block mr-2" size={18} />
              {post.date}
            </p>
          </header>

          <div
            className="prose dark:prose-invert transition-all max-w-none
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3
            prose-img:rounded-xl prose-img:shadow-lg"
          >
            <MDXRemote source={post.content} components={components} />
          </div>
        </AnimatedPost>
      </article>
    </main>
  );
}
