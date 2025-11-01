"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChallengesList } from "@/types/challenge";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { ColorSwingBox } from "@/components/effects/color-swing-box";

function getChallengeHref(challenge: ChallengesList): string {
  return `/challenges/${challenge.category}`;
}

export function ChallengeCard(challenge: ChallengesList) {
  const href = getChallengeHref(challenge);

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
      <ColorSwingBox className="p-4 sm:p-5">
        <Link href={href} className="block h-full">
          <article className="flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <motion.h2
                className="mb-3 sm:mb-4 text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors duration-150 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {challenge.title}
              </motion.h2>
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs text-gray-400 whitespace-nowrap order-1 sm:order-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <time
                  dateTime={challenge.date}
                  className="group-hover:text-gray-300 transition-colors duration-150 flex items-center gap-1.5"
                >
                  <FaCalendarAlt className="text-[10px]" />
                  {format(new Date(challenge.date), "MMM d, yyyy")}
                </time>
              </motion.div>
            </div>
            <motion.div
              className="flex justify-between items-start pr-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-150 flex-grow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="line-clamp-3 leading-relaxed flex-grow pr-4">
                {challenge.description}
              </p>

              <motion.div
                className="flex items-center text-blue-400 group-hover:text-blue-300 transition-all duration-150 group-hover:translate-x-1 flex-shrink-0"
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
            </motion.div>
          </article>
        </Link>
      </ColorSwingBox>
    </motion.div>
  );
}
