"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { FaCalendarAlt, FaStar, FaCode, FaGithub } from "react-icons/fa";
import { AnimatedPost } from "@/components/effects/animated-post";

export default function AdventOfCode2024() {
  return (
    <main className="min-h-screen pt-44 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <AnimatedPost>
          <Link
            href="/writings"
            className="inline-flex items-center gap-2 text-sm mb-12 group transition-colors"
          >
            <IoIosArrowBack className="text-blue-400 text-lg transition-transform group-hover:-translate-x-1" />
            Back to Writings
          </Link>

          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <FaCalendarAlt className="text-4xl text-green-400" />
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Advent of Code 2024
              </h1>
            </div>
            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
              My journey through the 25 days of Advent of Code 2024. Each day
              brings new programming challenges and algorithmic puzzles. Follow
              along as I solve each challenge and share my thought process,
              solutions, and lessons learned.
            </p>
          </header>

          {/* Progress Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-8 mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FaStar className="text-2xl text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">
                  Challenge Progress
                </h2>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Current Progress</div>
                <div className="text-2xl font-bold text-yellow-400">
                  0/50 ⭐
                </div>
              </div>
            </div>

            <p className="text-gray-400 mb-8">
              Track my daily progress through the challenges. Each day has two
              parts, earning up to 2 stars per day for a total of 50 stars.
            </p>

            {/* Detailed Progress Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-3 mb-6">
              {Array.from({ length: 25 }, (_, i) => (
                <motion.div
                  key={i + 1}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.02, duration: 0.3 }}
                  className="group relative"
                >
                  <div className="aspect-square bg-gray-800/60 border border-gray-600/40 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-700/80 hover:border-blue-400/50 transition-all duration-300 cursor-pointer hover:scale-105">
                    <span className="text-sm font-medium">{i + 1}</span>
                    <div className="flex gap-1 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Day {i + 1} - 0/2 stars
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-gray-800/60 border border-gray-600/40 rounded"></span>
                  <span className="text-gray-500">Not completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-yellow-500/20 border border-yellow-400/50 rounded"></span>
                  <span className="text-gray-500">1 star</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-green-500/20 border border-green-400/50 rounded"></span>
                  <span className="text-gray-500">2 stars</span>
                </div>
              </div>
              <p className="text-gray-500">
                Solutions coming daily throughout December!
              </p>
            </div>
          </motion.section>

          {/* Solutions Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-green-400 rounded-full"></div>
              <FaCode className="text-2xl text-blue-400" />
              <h2 className="text-2xl font-bold text-white">
                Solutions & Write-ups
              </h2>
            </div>

            {/* Solutions will be dynamically populated here */}
            <div className="space-y-6">
              {/* Placeholder for when no solutions exist yet */}
              <div className="text-center py-16 bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-xl">
                <FaCalendarAlt className="text-6xl text-gray-600 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">
                  Solutions Coming Soon
                </h3>
                <p className="text-gray-400 text-lg mb-4">
                  Check back daily for new solutions, explanations, and
                  insights!
                </p>
                <p className="text-gray-500 text-sm">
                  Each solution will include the problem analysis, approach,
                  code implementation, and time/space complexity discussion.
                </p>
              </div>

              {/* Example of how a solution card will look (commented out for now) */}
              {/*
              <motion.div
                className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-blue-400/60 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Day 1: Historian Hysteria</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400">⭐⭐</span>
                    <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                      <FaGithub className="text-lg" />
                    </Link>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  Finding the total distance between two lists and calculating similarity scores...
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">Arrays</span>
                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">Sorting</span>
                </div>
              </motion.div>
              */}
            </div>
          </motion.section>

          {/* Repository Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link
              href="#"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg hover:border-blue-400/60 hover:bg-gray-800/90 transition-all duration-300 text-gray-300 hover:text-white"
            >
              <FaGithub className="text-xl" />
              <span>View Solutions on GitHub</span>
            </Link>
          </motion.div>
        </AnimatedPost>
      </div>
    </main>
  );
}
