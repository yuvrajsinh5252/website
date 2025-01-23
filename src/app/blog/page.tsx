import { getBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogHeader } from "@/components/blog/blog-header";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

export default async function BlogPage() {
  const posts = getBlogPosts();

  return (
    <MaxWidthWrapper>
      <div className="container mx-auto px-4 max-sm:px-0 pt-44">
        <BlogHeader title="Blogs" />
        <div className="flex mt-10 px-4">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
