"use client";

import { getBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogHeader } from "@/components/blog/blog-header";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { motion } from "motion/react";
import { FaUser, FaCode } from "react-icons/fa";

export default function BlogPage() {
  const posts = getBlogPosts();
  const personalPosts = posts.filter((post) => post.category === "personal");
  const adventOfCodePosts = posts.filter(
    (post) => post.category === "advent-of-code"
  );

  return (
    <div className="min-h-screen">
      <MaxWidthWrapper>
        <div className="max-w-7xl mx-auto px-4 pt-44 pb-20">
          <BlogHeader title="Writings" />

          <div className="space-y-20 mt-16">
            {/* Personal Posts */}
            {personalPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                {personalPosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </motion.div>
            )}

            {/* Advent of Code Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-blue-400 rounded-full"></div>
                <div className="flex items-center gap-3">
                  <FaCode className="text-2xl text-green-400" />
                  <h2 className="text-2xl font-bold text-white">
                    Advent of Code
                  </h2>
                </div>
              </div>

              {adventOfCodePosts.length > 0 ? (
                <div className="space-y-6">
                  {adventOfCodePosts.map((post, index) => (
                    <BlogCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-4">
                    Advent of Code solutions coming soon!
                  </div>
                  <div className="text-gray-500 text-sm">
                    Daily coding challenges with detailed explanations and code.
                  </div>
                </div>
              )}
            </motion.div>

            {/* Coming Soon Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center py-16"
            >
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-4">
                  More Content Coming
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Stay tuned for more personal stories, project insights, and
                  coding challenges. I'll be regularly updating both sections
                  with new content.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
