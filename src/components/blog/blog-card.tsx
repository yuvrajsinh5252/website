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
          relative overflow-hidden rounded-2xl
          dark:bg-white/[0.04] bg-gray-400/10
          backdrop-blur-lg
          dark:border-white/10 border-gray-200
          transition-all
          dark:group-hover:border-white/20 group-hover:border-gray-300
          group-hover:shadow-xl
          dark:group-hover:shadow-blue-500/20 group-hover:shadow-gray-200/50
          before:absolute before:inset-0
          before:-translate-x-full before:animate-shimmer
          before:bg-gradient-to-r
          before:from-transparent
          dark:before:via-white/10 before:via-gray-100
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
                    dark:bg-blue-500/10 bg-blue-50 px-2.5 sm:px-3.5 py-1 sm:py-1.5
                    text-[11px] sm:text-xs font-medium
                    dark:text-blue-400 text-blue-600 transition-colors whitespace-nowrap
                    dark:group-hover:bg-blue-500/20 group-hover:bg-blue-100
                    dark:group-hover:text-blue-300 group-hover:text-blue-700"
                  >
                    <FaTag className="text-[9px] sm:text-[10px]" />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-[11px] sm:text-xs dark:text-gray-400 text-gray-600">
                <time
                  dateTime={post.date}
                  className="dark:group-hover:text-gray-300 group-hover:text-gray-900 transition-colors"
                >
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
                <span className="flex items-center gap-1.5 dark:group-hover:text-gray-300 group-hover:text-gray-900 transition-colors">
                  <FaClock className="text-[9px] sm:text-[10px]" />
                  {post.readingTime}
                </span>
              </div>
            </div>
            <h2
              className="mb-3 text-lg sm:text-xl font-bold tracking-tight
              dark:group-hover:text-blue-50 group-hover:text-blue-700 transition-colors"
            >
              {post.title}
            </h2>
            <p
              className="mb-4 text-xs sm:text-sm dark:text-gray-400 text-gray-600
              line-clamp-2 dark:group-hover:text-gray-300 group-hover:text-gray-900 transition-colors"
            >
              {post.description}
            </p>
            <p
              className="mt-4 text-xs sm:text-sm font-medium dark:text-blue-400 text-blue-600
              dark:group-hover:text-blue-300 group-hover:text-blue-700 transition-colors flex items-center gap-2"
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
            dark:group-hover:opacity-20 group-hover:opacity-10 transition-opacity duration-300
            dark:bg-gradient-to-br dark:from-blue-400 dark:via-blue-500 dark:to-purple-600
            bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 -z-10"
          />
        </div>
      </Link>
    </motion.article>
  );
}
