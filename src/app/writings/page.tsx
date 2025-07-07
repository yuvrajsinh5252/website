"use client";

import { getBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogHeader } from "@/components/blog/blog-header";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { motion } from "framer-motion";
import { FaUser, FaCode } from "react-icons/fa";

export default function WritingsPage() {
  const posts = getBlogPosts();
  const personalPosts = posts.filter((post) => post.category === "personal");
  const adventOfCodePosts = posts.filter(
    (post) => post.category === "advent-of-code"
  );

  return (
    <div className="min-h-screen">
      <MaxWidthWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
          <BlogHeader title="Writings" />

          <div className="space-y-16 sm:space-y-20 mt-12 sm:mt-14 md:mt-16">
            {/* Personal Posts Section */}
            {personalPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FaUser className="text-xl sm:text-2xl text-blue-400" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Posts
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {personalPosts.map((post, index) => (
                    <BlogCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Advent of Code Section */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-green-400 to-blue-400 rounded-full"></div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <FaCode className="text-xl sm:text-2xl text-green-400" />
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Advent of Code
                  </h2>
                </div>
              </div>

              {adventOfCodePosts.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  {adventOfCodePosts.map((post, index) => (
                    <BlogCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-10">
                  <p className="text-gray-400 text-base sm:text-lg">
                    Advent of Code posts will appear here in December!
                  </p>
                </div>
              )}
            </motion.div> */}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
