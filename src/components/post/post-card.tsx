import { Link } from "react-router-dom";
import { PostMeta } from "@/types/post";
import { format } from "date-fns";
import { FaClock, FaTag } from "react-icons/fa";
import { ColorSwingBox } from "@/components/effects/color-swing-box";

interface PostCardProps {
  post: PostMeta;
}

function TagList({ tags, className }: { tags: string[]; className: string }) {
  return (
    <ul className={className}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="inline-flex items-center gap-1 sm:gap-1.5 rounded-md
            bg-blue-500/10 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium
            text-blue-400 whitespace-normal sm:whitespace-nowrap
            group-hover:bg-blue-500/20 group-hover:text-blue-300
            border border-blue-500/20 max-w-full break-words"
        >
          <FaTag
            className="text-[8px] sm:text-[10px] shrink-0"
            aria-hidden="true"
          />
          <span className="truncate">{tag}</span>
        </li>
      ))}
    </ul>
  );
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="h-full animate-fade-up">
      <ColorSwingBox className="p-3 sm:p-5">
        <article className="flex flex-col h-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-3 sm:mb-5">
            <TagList
              tags={post.tags}
              className="hidden sm:flex flex-wrap gap-1.5 sm:gap-2 order-2 sm:order-1 list-none p-0 m-0"
            />
            <div className="flex flex-row justify-between items-center gap-1.5 sm:gap-4 text-[11px] sm:text-xs text-gray-400 whitespace-nowrap order-1 sm:order-2 w-full sm:w-auto">
              <time
                dateTime={post.date}
                className="group-hover:text-gray-300 transition-colors duration-150"
              >
                {format(new Date(post.date), "MMM d, yyyy")}
              </time>
              <span className="flex items-center gap-1.5 group-hover:text-gray-300 transition-colors duration-150">
                <FaClock className="text-[10px]" aria-hidden="true" />
                {post.readingTime}
              </span>
            </div>
          </div>

          <h2 className="mb-2.5 sm:mb-4 text-base sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors duration-150 leading-tight">
            {/* The stretched pseudo-element makes the whole card clickable from one link. */}
            <Link
              to={`/posts/${post.slug}`}
              className="after:absolute after:inset-0"
            >
              {post.title}
            </Link>
          </h2>

          <div className="flex justify-between items-start text-[13px] sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-150 grow pr-2 sm:pr-3">
            <p className="line-clamp-2 sm:line-clamp-3 leading-relaxed grow pr-3 sm:pr-4">
              {post.description}
            </p>

            <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-all duration-150 group-hover:translate-x-1 shrink-0 ml-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-150"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
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

          <TagList
            tags={post.tags}
            className="mt-3 flex flex-wrap gap-1.5 sm:hidden list-none p-0"
          />
        </article>
      </ColorSwingBox>
    </div>
  );
}
