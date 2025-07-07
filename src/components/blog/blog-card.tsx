"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlogMeta } from "@/types/blog";
import { format } from "date-fns";
import { FaClock, FaTag } from "react-icons/fa";
import { ColorSwingBox } from "@/components/effects/color-swing-box";

interface BlogCardProps {
  post: BlogMeta;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <ColorSwingBox
      className="p-5 sm:p-6 rounded-xl bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 hover:border-blue-400/60 hover:bg-gray-800/90 transition-all duration-150 hover:shadow-2xl hover:shadow-blue-500/30 hover:backdrop-blur-2xl h-full relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      {/* Subtle inner glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      <Link href={`/writings/${post.slug}`} className="block h-full">
        <article className="flex flex-col h-full relative z-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4 sm:mb-5">
            <div className="flex flex-wrap gap-2 order-2 sm:order-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-md
                  bg-blue-500/10 px-2.5 py-1 text-xs font-medium
                  text-blue-400 whitespace-nowrap
                  group-hover:bg-blue-500/20 group-hover:text-blue-300
                  border border-blue-500/20 hover:border-blue-500/40"
                >
                  <FaTag className="text-[10px]" />
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs text-gray-400 whitespace-nowrap order-1 sm:order-2">
              <time
                dateTime={post.date}
                className="group-hover:text-gray-300 transition-colors duration-150"
              >
                {format(new Date(post.date), "MMM d, yyyy")}
              </time>
              <span className="flex items-center gap-1.5 group-hover:text-gray-300 transition-colors duration-150">
                <FaClock className="text-[10px]" />
                {post.readingTime}
              </span>
            </div>
          </div>

          <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors duration-150 leading-tight">
            {post.title}
          </h2>

          <p className="mb-4 sm:mb-6 text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300 transition-colors duration-150 flex-grow leading-relaxed">
            {post.description}
          </p>

          <motion.div
            className="flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-150 mt-auto"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Continue reading
            <motion.svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              whileHover={{
                x: 2,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
            >
              <path
                d="M1 8h14M9 2l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </article>
      </Link>
    </ColorSwingBox>
  );
}
