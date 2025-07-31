"use client";

import { motion } from "framer-motion";
import { PostMeta } from "@/types/post";
import { PostCard } from "../post/card";

const headerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export function PostsList({ posts }: { posts: PostMeta[] }) {
  return (
    <motion.div
      className="space-y-16 sm:space-y-20 mt-12 sm:mt-14 md:mt-16"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.length > 0 ? (
        <motion.div
          variants={sectionVariants}
        >
          <div className="space-y-4 sm:space-y-6">
            {posts.map((post, index) => (
              <div key={post.slug}>
                <PostCard post={post} index={index} />
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-16 sm:py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-gray-400 text-base sm:text-lg">
            No posts yet. Check back soon!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
