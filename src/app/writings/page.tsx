import { getPosts } from "@/lib/post";
import { PostHeader } from "@/components/writings/post/header";
import { WritingsContent } from "@/components/writings/content_page";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

export default function WritingsPage() {
  const posts = getPosts();
  const personalPosts = posts.filter((post) => post.category === "personal");
  // const adventOfCodePosts = posts.filter(
  //   (post) => post.category === "advent-of-code"
  // );

  return (
    <div className="min-h-screen">
      <MaxWidthWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
          <PostHeader title="Writings" />
          <WritingsContent personalPosts={personalPosts} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
