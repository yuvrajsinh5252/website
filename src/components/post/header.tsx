"use client";

import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

interface PostHeaderProps {
  title: string;
}

export function PostHeader({ title }: PostHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-12 sm:mb-14 md:mb-16"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <IoIosArrowForward className="text-2xl sm:text-3xl md:text-4xl text-blue-400" />
        </motion.div>
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        >
          {title}
        </motion.h1>
      </div>
      <motion.p
        className="text-gray-400 text-base sm:text-lg max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        Personal stories, achievements, and coding challenges.
      </motion.p>
    </motion.div>
  );
}
