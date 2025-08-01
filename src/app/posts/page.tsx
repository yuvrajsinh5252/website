import { getPosts } from "@/lib/content";
import { PostHeader } from "@/components/post/header";
import { PostsList } from "@/components/post/posts_list";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yuvrajsinh Gohil Posts",
  description:
    "Blog posts by Yuvrajsinh Gohil - programming tutorials, tech insights, and coding experiences.",
  keywords: [
    "Yuvrajsinh Gohil posts",
    "Yuvrajsinh Gohil blog",
    "programming blog",
    "tech articles",
  ],
};

export default function PostsPage() {
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
