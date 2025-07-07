"use client";

import { SOCIAL_LINKS } from "@/data/social-links";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { useState, useEffect } from "react";
import { FaXTwitter, FaArrowDown, FaEnvelope } from "react-icons/fa6";
import { IconType } from "react-icons";

const iconMap: { [key: string]: IconType } = {
  FaGithub: SiGithub,
  FaLinkedin: SiLinkedin,
  FaTwitter: FaXTwitter,
  FaEnvelope: FaEnvelope,
};

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
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
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

        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-purple-500/5 blur-2xl"
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 sm:space-y-10 max-w-4xl mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-gray-300">Hi, I&apos;m</span>
            <span className="mt-1 block bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text leading-tight text-transparent">
              Yuvrajsinh Gohil
            </span>
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl font-light leading-relaxed max-sm:-mx-6 text-gray-400 px-2"
          whileHover={{
            color: "rgb(209, 213, 219)",
            scale: 1.02,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 25,
            },
          }}
        >
          Computer Science student passionate about emerging technologies and
          crafting innovative digital solutions.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 flex-wrap"
        >
          {SOCIAL_LINKS.map((social, index) => {
            const Icon = iconMap[social.icon];

            if (social.name === "Discord") {
              return null;
            }

            return (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                whileHover={{
                  scale: 1.2,
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  },
                }}
              >
                <Link
                  href={
                    social.name === "Email"
                      ? social.url
                      : { pathname: social.url }
                  }
                  target="_blank"
                  className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full
                           border-2 border-gray-700 hover:border-blue-400 bg-gray-800/50 hover:bg-blue-500/10
                           transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25
                           backdrop-blur-sm"
                >
                  {Icon && (
                    <Icon
                      size={20}
                      className="text-gray-200 group-hover:text-blue-400 transition-colors duration-200 relative z-10 sm:text-[22px]"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {showScrollButton && (
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.2,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 group"
          whileHover={{
            scale: 1.1,
            y: -3,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          }}
          whileTap={{
            scale: 0.9,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 20,
            },
          }}
        >
          <motion.div
            className="flex items-center gap-2 px-4 py-2"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaArrowDown
              size={14}
              className="text-gray-400 group-hover:text-white transition-colors duration-200"
            />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}
