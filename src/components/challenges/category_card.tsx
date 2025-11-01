"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ColorSwingBox } from "@/components/effects/color-swing-box";

interface CategoryCardProps {
  title: string;
  href: string;
  index: number;
  year?: number;
  day?: number;
}

export function CategoryCard({ title, href, year, day }: CategoryCardProps) {
  return (
    <motion.div
      className="h-full group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <ColorSwingBox className="p-4 sm:p-5">
        <Link href={href} className="block h-full">
          <article className="relative flex flex-col h-full">
            <motion.div
              className="absolute right-2 flex items-center text-blue-400 group-hover:text-blue-300 transition-all duration-150 group-hover:translate-x-1 flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
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
            </motion.div>

            <div className="flex flex-wrap items-center gap-3 pr-12">
              <motion.h2
                className="text-xl font-bold tracking-tight text-white group-hover:text-blue-100 transition-colors duration-200 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {title}
              </motion.h2>

              {(year || day) && (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {year && (
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-blue-500/15 text-blue-300 rounded-full border border-blue-500/20 backdrop-blur-sm">
                      {year}
                    </span>
                  )}
                  {day && (
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-300 rounded-full border border-emerald-500/20 backdrop-blur-sm">
                      Day {day}
                    </span>
                  )}
                </motion.div>
              )}
            </div>
          </article>
        </Link>
      </ColorSwingBox>
    </motion.div>
  );
}
