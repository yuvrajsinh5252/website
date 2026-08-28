import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaCalendar, FaClock } from "react-icons/fa";
import { getPost } from "@/lib/content";
import { AnimatedPost } from "@/components/effects/animated-post";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { MDX_STYLES } from "@/lib/utils";
import { mdxComponents } from "@/components/post/mdx-components";
import { NotFoundPage } from "@/pages/not-found";
import { Seo } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export function PostPage() {
  const { slug = "" } = useParams();
  const post = getPost(slug);

  if (!post) {
    return <NotFoundPage />;
  }

  const url = `${siteConfig.url}/posts/${post.slug}`;
  const { Component } = post;

  return (
    <div className="min-h-screen pt-24 sm:pt-32 md:pt-44 pb-16 sm:pb-20">
      <Seo
        title={post.title}
        description={post.description}
        image={post.coverImage}
        type="article"
        publishedTime={post.date}
        canonical={url}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          keywords: post.tags.join(", "),
          url,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          image: post.coverImage
            ? `${siteConfig.url}${post.coverImage}`
            : `${siteConfig.url}/images/og.png`,
          author: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: siteConfig.url,
          },
        }}
      />

      <MaxWidthWrapper>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <AnimatedPost>
            <div className="mb-6 sm:mb-8">
              <Link
                to="/posts"
                className="inline-flex items-center gap-1 group text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors"
              >
                <IoIosArrowBack
                  className="text-blue-400 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                Back to Posts
              </Link>
            </div>

            <header className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-gray-400 shrink-0">
                <span className="inline-flex items-center gap-2">
                  <FaCalendar
                    className="text-blue-400"
                    size={14}
                    aria-hidden="true"
                  />
                  <time dateTime={post.date}>{post.date}</time>
                </span>
                <span className="inline-flex items-center gap-2">
                  <FaClock
                    className="text-blue-400"
                    size={14}
                    aria-hidden="true"
                  />
                  {post.readingTime}
                </span>
              </div>
            </header>

            <div className={MDX_STYLES}>
              <Component components={mdxComponents} />
            </div>
          </AnimatedPost>
        </article>
      </MaxWidthWrapper>
    </div>
  );
}
