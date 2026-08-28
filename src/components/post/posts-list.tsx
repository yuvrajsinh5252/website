import { PostMeta } from "@/types/post";
import { PostCard } from "@/components/post/post-card";

export function PostsList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 sm:py-20 animate-fade-up">
        <p className="text-gray-400 text-base sm:text-lg">
          No posts yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 sm:mt-14 md:mt-16 space-y-4 sm:space-y-6 animate-fade-in">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
