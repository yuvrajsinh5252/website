import { getPosts } from "@/lib/content";
import { PostHeader } from "@/components/post/header";
import { PostsList } from "@/components/post/posts_list";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Metadata } from "next";

const title = "Posts";
const description =
  "Read about my thoughts, experiences, learnings, coding challenges and achievements to know me better.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "blog",
    "posts",
    "yuvrajsinh gohil",
    "programming",
    "coding tutorials",
    "articles",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://www.yuvrajsinh.me",
    siteName: "Yuvrajsinh Gohil",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function WritingsPage() {
  const posts = getPosts();

  return (
    <div className="min-h-screen">
      <MaxWidthWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
          <PostHeader title="Posts" />
          <PostsList posts={posts} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
