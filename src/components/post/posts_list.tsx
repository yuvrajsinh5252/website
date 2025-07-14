"use client";

import { motion } from "framer-motion";
import { PostMeta } from "@/types/post";
import { PostCard } from "../post/card";

const headerVariants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
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
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.2 },
          }}
        >
          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.2 }}
              >
                <PostCard post={post} index={index} />
              </motion.div>
            ))}
          </motion.div>
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
