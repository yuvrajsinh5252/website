"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/config/site";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 1.15, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 12,
      mass: 0.7,
    },
  },
};

const socialItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 140,
      damping: 12,
      mass: 0.7,
    },
  },
};

export function HeroContent() {
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
        className="space-y-6 sm:space-y-10 max-w-5xl mx-auto relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-2 sm:space-y-5" variants={itemVariants}>
          <h1 className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight sm:leading-tight">
            <motion.span
              className="text-gray-300 block text-[1.5rem] sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl"
              variants={itemVariants}
            >
              Hey there, I&apos;m
            </motion.span>
            <motion.span
              className="mt-1 sm:mt-2 block bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent lg:text-6xl xl:text-7xl"
              variants={itemVariants}
            >
              Yuvrajsinh Gohil
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          className="text-sm leading-[1.6] sm:text-base md:text-lg lg:text-xl font-extralight sm:leading-relaxed text-gray-300/90 px-2 sm:px-2 max-w-[90%] sm:max-w-none mx-auto"
          variants={itemVariants}
        >
          Software Developer passionate about emerging technologies and crafting
          innovative digital solutions.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-stretch sm:items-center pt-4 sm:pt-8 w-full sm:w-auto"
          variants={containerVariants}
        >
          <motion.div variants={buttonVariants}>
            <Link
              href="/projects"
              className="group relative flex items-center justify-center px-6 py-3 sm:px-9 sm:py-4 rounded-full
                       border border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/20
                       transition-all duration-200 shadow-[0_0_0_0_rgba(59,130,246,0.0)] hover:shadow-[0_0_30px_0_rgba(59,130,246,0.25)]
                       backdrop-blur-sm w-full sm:w-auto"
            >
              <span className="text-blue-200 group-hover:text-white transition-colors duration-200 font-medium text-sm sm:text-base">
                View My Work
              </span>
            </Link>
          </motion.div>

          <motion.div variants={buttonVariants}>
            <Link
              href="/posts"
              className="group relative flex items-center justify-center px-6 py-3 sm:px-9 sm:py-4 rounded-full
                       border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10
                       transition-all duration-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]
                       backdrop-blur-sm w-full sm:w-auto"
            >
              <span className="text-gray-200 group-hover:text-white transition-colors duration-200 font-medium text-sm sm:text-base">
                Read My Posts
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-5 sm:mt-6 flex items-center justify-center gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.a
          variants={socialItemVariants}
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-gray-300 hover:text-white transition-colors"
        >
          <FaGithub className="w-5 h-5" />
        </motion.a>
        <motion.a
          variants={socialItemVariants}
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-gray-300 hover:text-white transition-colors"
        >
          <FaLinkedin className="w-5 h-5" />
        </motion.a>
        <motion.a
          variants={socialItemVariants}
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noreferrer"
          aria-label="X (Twitter)"
          className="text-gray-300 hover:text-white transition-colors"
        >
          <FaXTwitter className="w-5 h-5" />
        </motion.a>
      </motion.div>

      <HeroScrollButton />
    </div>
  );
}

function HeroScrollButton() {
  const [showScrollButton, setShowScrollButton] = useState(true);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const elementPosition = aboutSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 60;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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

  return (
    <>
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
              size={16}
              className="text-gray-400 group-hover:text-white transition-colors duration-150"
            />
          </motion.div>
        </motion.button>
      )}
    </>
  );
}
