"use client";

import { getBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogHeader } from "@/components/blog/blog-header";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { motion } from "motion/react";
import { FaUser, FaCode, FaStar, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

export default function WritingsPage() {
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
            {/* Personal Posts Section */}
            {personalPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                  <div className="flex items-center gap-3">
                    <FaUser className="text-2xl text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">Posts</h2>
                  </div>
                </div>

                <div className="space-y-6">
                  {personalPosts.map((post, index) => (
                    <BlogCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
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
                <div className="space-y-8">
                  {/* Advent of Code 2024 Section */}
                  <Link href="/writings/advent-of-code-2024">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-8 hover:border-blue-400/60 hover:bg-gray-800/90 transition-all duration-300 cursor-pointer group"
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <FaCalendarAlt className="text-2xl text-green-400 group-hover:text-green-300 transition-colors" />
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            Advent of Code 2024
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <FaStar className="text-yellow-400" />
                          <span>0/50 stars</span>
                        </div>
                      </div>

                      <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                        My journey through the 25 days of coding challenges.
                        Click to view progress and solutions.
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          <span className="inline-block w-2 h-2 bg-gray-800/60 border border-gray-600/40 rounded mr-2"></span>
                          25 challenges awaiting
                        </div>

                        <p className="text-xs text-blue-400 group-hover:text-blue-300 transition-colors font-medium">
                          Click to explore →
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
