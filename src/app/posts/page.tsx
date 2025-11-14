import { getPosts } from "@/lib/content";
import PageHeader from "@/components/ui/page-header";
import { PostsList } from "@/components/post/posts_list";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { createSEO } from "@/lib/seo";

export const metadata = createSEO({
  title: "Posts",
  description:
    "Blog posts by Yuvrajsinh Gohil - Personal insights, anonymous stories...",
});

export default function PostsPage() {
  const posts = getPosts();

  return (
    <div className="min-h-screen">
      <MaxWidthWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
          <PageHeader
            title="Posts"
            description="Personal stories, achievements, and coding challenges."
          />
          <PostsList posts={posts} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
