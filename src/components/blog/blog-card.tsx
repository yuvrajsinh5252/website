"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlogMeta } from "@/types/blog";
import { format } from "date-fns";
import { FaClock, FaTag } from "react-icons/fa";

interface BlogCardProps {
  post: BlogMeta;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative w-full"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className={`
          relative overflow-hidden rounded-2xl
          dark:bg-white/[0.03] bg-gray-400/20 backdrop-blur-lg
          border border-white/10
          transition-all duration-100
          group-hover:border-white/20
          group-hover:shadow-lg group-hover:shadow-blue-500/10
        `}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full
                  bg-blue-500/10 px-3 py-1 text-xs
                  text-blue-400 transition-colors
                  group-hover:bg-blue-500/20"
                  >
                    <FaTag className="text-[10px]" />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <time dateTime={post.date}>
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
                <span className="flex items-center gap-1">
                  <FaClock className="text-[10px]" />
                  {post.readingTime}
                </span>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
            <p className="mb-4 text-sm text-gray-400/90 line-clamp-2">
              {post.description}
            </p>
            <p className="mt-4 text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
              Continue reading →
            </p>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-blue-500 to-gray-500 -z-10" />
        </div>
      </Link>
    </motion.article>
  );
}
