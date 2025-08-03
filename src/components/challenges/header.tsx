"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export function Header({ title, back }: { title: string; back: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-12 sm:mb-14 md:mb-16"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="flex justify-center items-center text-2xl sm:text-3xl md:text-4xl text-blue-400 hover:text-blue-300 transition-colors duration-150 rounded-full">
          {back ? (
            <Link href="/challenges">
              <IoIosArrowBack />
            </Link>
          ) : (
            <IoIosArrowForward />
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          {title}
        </h1>
      </div>
    </motion.div>
  );
}
