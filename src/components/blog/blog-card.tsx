"use client";

import Link from "next/link";
import { motion } from "motion/react";
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
      transition={{
        delay: index * 0.1,
        duration: 0.4,
        ease: "easeOut",
      }}
      whileHover={{ y: -4 }}
      className="group relative w-full"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className={`
          relative overflow-hidden rounded-2xl border
          bg-white/[0.04]
          backdrop-blur-lg
          border-white/10
          transition-all
          group-hover:border-white/20
          group-hover:shadow-xl
          group-hover:shadow-blue-500/20
          before:absolute before:inset-0
          before:-translate-x-full before:animate-shimmer
          before:bg-gradient-to-r
          before:from-transparent
          before:via-white/10
          before:to-transparent
          group-hover:before:translate-x-full
        `}
        >
          <div className="p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-5">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full
                    bg-blue-500/10 px-2.5 sm:px-3.5 py-1 sm:py-1.5
                    text-[11px] sm:text-xs font-medium
                    text-blue-400 transition-colors whitespace-nowrap
                    group-hover:bg-blue-500/20
                    group-hover:text-blue-300"
                  >
                    <FaTag className="text-[9px] sm:text-[10px]" />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-[11px] sm:text-xs text-gray-400">
                <time
                  dateTime={post.date}
                  className="group-hover:text-gray-300 transition-colors"
                >
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
                <span className="flex items-center gap-1.5 group-hover:text-gray-300 transition-colors">
                  <FaClock className="text-[9px] sm:text-[10px]" />
                  {post.readingTime}
                </span>
              </div>
            </div>
            <h2
              className="mb-3 text-lg sm:text-xl font-bold tracking-tight
              group-hover:text-blue-50 transition-colors"
            >
              {post.title}
            </h2>
            <p
              className="mb-4 text-xs sm:text-sm text-gray-400
              line-clamp-2 group-hover:text-gray-300 transition-colors"
            >
              {post.description}
            </p>
            <p
              className="mt-4 text-xs sm:text-sm font-medium text-blue-400
              group-hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              Continue reading
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 8h14M9 2l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </div>

          <div
            className="absolute inset-0 rounded-2xl opacity-0
            group-hover:opacity-20 transition-opacity duration-300
            bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 -z-10"
          />
        </div>
      </Link>
    </motion.article>
  );
}
