"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ColorSwingBox } from "@/components/effects/color-swing-box";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  index: number;
}

export function CategoryCard({ title, description, href }: CategoryCardProps) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.99 }}
    >
      <ColorSwingBox>
        <Link href={href} className="block h-full">
          <article className="flex flex-col h-full relative">
            {/* Centered arrow icon on the right */}
            <motion.div
              className="absolute top-1/2 right-3 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-colors duration-150 transform -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.1, x: 2 }}
            >
              <svg
                className="w-4 h-4"
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

            <motion.h2
              className="mb-2 mt-1 text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors duration-150 leading-tight pr-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300 transition-colors duration-150 flex-grow leading-relaxed mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {description}
            </motion.p>
          </article>
        </Link>
      </ColorSwingBox>
    </motion.div>
  );
}
