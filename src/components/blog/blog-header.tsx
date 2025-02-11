"use client";

import { motion } from "motion/react";
import { IoIosArrowForward } from "react-icons/io";

interface BlogHeaderProps {
  title: string;
}

export function BlogHeader({ title }: BlogHeaderProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 sm:text-5xl text-4xl font-bold pl-2"
    >
      <IoIosArrowForward className="text-3xl max-sm:hidden sm:text-4xl text-blue-500/80" />
      <span className="text-foreground dark:text-gray-300 max-sm:mx-auto">
        {title}
      </span>
    </motion.h1>
  );
}
