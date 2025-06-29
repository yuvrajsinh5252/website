"use client";

import { SOCIAL_LINKS } from "@/data/social-links";
import { motion } from "motion/react";
import { Mail, ArrowDown } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { useState, useEffect } from "react";
import { FaXTwitter } from "react-icons/fa6";

export function HeroSection() {
  const [showScrollButton, setShowScrollButton] = useState(true);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
      // Hide the button after scrolling
      setTimeout(() => setShowScrollButton(false), 1000);
    }
  };

  // Hide button if user has scrolled down manually
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
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

  const itemVariants = {
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
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden">
      {/* Enhanced background decoration */}
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

        {/* Subtle floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl"
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
          className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-purple-500/5 blur-2xl"
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

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10 max-w-4xl mx-auto relative z-10"
      >
        {/* Greeting and name combined */}
        <motion.div
          variants={itemVariants}
          className="space-y-4"
          whileHover={{
            scale: 1.02,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="text-gray-300">Hi, I'm </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Yuvrajsinh Gohil
            </span>
          </h1>
        </motion.div>

        {/* Student description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto text-gray-400"
          whileHover={{
            color: "rgb(209, 213, 219)",
            scale: 1.02,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          }}
        >
          Computer Science student passionate about emerging technologies and
          crafting innovative digital solutions.
        </motion.p>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex gap-6 justify-center items-center pt-8"
        >
          {SOCIAL_LINKS.map((social, index) => (
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
              <Link
                href={
                  social.name === "Email"
                    ? social.url
                    : { pathname: social.url }
                }
                target="_blank"
                className="group relative flex items-center justify-center w-14 h-14 rounded-full
                         border-2 border-gray-700 hover:border-blue-400 bg-gray-800/50 hover:bg-blue-500/10
                         transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25
                         backdrop-blur-sm"
              >
                {social.icon === "Github" && (
                  <SiGithub
                    size={22}
                    className="text-gray-200 group-hover:text-blue-400 transition-colors duration-200 relative z-10"
                  />
                )}
                {social.icon === "Linkedin" && (
                  <SiLinkedin
                    size={22}
                    className="text-gray-200 group-hover:text-blue-400 transition-colors duration-200 relative z-10"
                  />
                )}
                {social.icon === "Mail" && (
                  <Mail
                    size={22}
                    className="text-gray-200 group-hover:text-blue-400 transition-colors duration-200 relative z-10"
                  />
                )}
                {social.icon === "Twitter" && (
                  <FaXTwitter
                    size={22}
                    className="text-gray-200 group-hover:text-blue-400 transition-colors duration-200 relative z-10"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator */}
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group"
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
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-600
                     group-hover:border-blue-400 transition-all duration-250 bg-gray-800/50 group-hover:bg-blue-500/10
                     hover:shadow-lg hover:shadow-blue-500/25 backdrop-blur-sm"
          >
            <ArrowDown
              size={18}
              className="text-gray-200 group-hover:text-blue-400 transition-colors duration-200 relative z-10"
            />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}
