"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa6";

export function HeroSection() {
  const [showScrollButton, setShowScrollButton] = useState(true);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setShowScrollButton(false), 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        staggerChildren: 0.02,
        delayChildren: 0,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
  };

  // Critical text variant - no animation for LCP optimization
  const criticalTextVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 sm:space-y-10 max-w-4xl mx-auto relative z-10"
      >
        <motion.div variants={criticalTextVariants} className="space-y-2 sm:space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-gray-300">Hi, I&apos;m</span>
            <span className="mt-1 block bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text leading-tight text-transparent">
              Yuvrajsinh Gohil
            </span>
          </h1>
        </motion.div>

        <motion.p
          variants={criticalTextVariants}
          className="text-base sm:text-lg md:text-xl font-light leading-relaxed max-sm:-mx-6 text-gray-400 px-2"
        >
          Computer Science student passionate about emerging technologies and
          crafting innovative digital solutions.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 sm:gap-6 justify-center items-center pt-4 sm:pt-6 flex-wrap"
        >
          <Link
            href="/projects"
            className="group relative flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full
                     border-2 border-blue-400 bg-blue-400/10 hover:bg-blue-400/20
                     transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25
                     backdrop-blur-sm"
          >
            <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-200 font-medium text-sm sm:text-base">
              View My Work
            </span>
          </Link>
          
          <Link
            href="/posts"
            className="group relative flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full
                     border-2 border-gray-600 bg-gray-600/10 hover:bg-gray-600/20
                     transition-all duration-200 hover:shadow-lg hover:shadow-gray-500/25
                     backdrop-blur-sm"
          >
            <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-200 font-medium text-sm sm:text-base">
              Read My Posts
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {showScrollButton && (
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 group"
          aria-label="Scroll down to about section"
        >
          <motion.div
            className="flex items-center gap-2 px-4 py-2"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaArrowDown
              size={14}
              className="text-gray-400 group-hover:text-white transition-colors duration-150"
            />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}
