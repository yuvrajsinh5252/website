"use client";

import { motion } from "motion/react";
import { IoIosArrowForward } from "react-icons/io";

interface BlogHeaderProps {
  title: string;
}

export function BlogHeader({ title }: BlogHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 sm:mb-14 md:mb-16"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <IoIosArrowForward className="text-2xl sm:text-3xl md:text-4xl text-blue-400" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          {title}
        </h1>
      </div>
      <p className="text-gray-400 text-base sm:text-lg max-w-2xl">
        Personal stories, achievements, and coding challenges.
      </p>
    </motion.div>
  );
}
