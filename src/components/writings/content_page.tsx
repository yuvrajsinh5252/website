"use client";

import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { PostMeta } from "@/types/post";
import { PostCard } from "./post/card";

interface WritingsContentProps {
  personalPosts: PostMeta[];
}

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

export function WritingsContent({ personalPosts }: WritingsContentProps) {
  return (
    <motion.div
      className="space-y-16 sm:space-y-20 mt-12 sm:mt-14 md:mt-16"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {personalPosts.length > 0 ? (
        <motion.div
          variants={sectionVariants}
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.2 },
          }}
        >
          <motion.div
            className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <motion.div
              className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div transition={{ duration: 0.2, delay: 0.4 }}>
                <FaUser className="text-xl sm:text-2xl text-blue-400" />
              </motion.div>
              <motion.h2
                className="text-xl sm:text-2xl font-bold text-white"
                transition={{ duration: 0.2, delay: 0.5 }}
              >
                Posts
              </motion.h2>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {personalPosts.map((post, index) => (
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
            No writings yet. Check back soon!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
