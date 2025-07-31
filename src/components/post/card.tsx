"use client";

import Link from "next/link";
import { PostMeta } from "@/types/post";
import { format } from "date-fns";
import { FaClock, FaTag } from "react-icons/fa";
import { ColorSwingBox } from "@/components/effects/color-swing-box";

interface PostCardProps {
  post: PostMeta;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <div className="h-full">
      <ColorSwingBox>
        <Link href={`/posts/${post.slug}`} className="block h-full">
          <article className="flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4 sm:mb-5">
              <div className="flex flex-wrap gap-2 order-2 sm:order-1">
                {post.tags.map((tag, idx) => (
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

            <div className="flex justify-between items-start text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-150 flex-grow pr-3">
              <p className="line-clamp-3 leading-relaxed flex-grow pr-4">
                {post.description}
              </p>

              <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-all duration-150 group-hover:translate-x-1 flex-shrink-0">
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-150"
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
              </div>
            </div>
          </article>
        </Link>
      </ColorSwingBox>
    </div>
  );
}