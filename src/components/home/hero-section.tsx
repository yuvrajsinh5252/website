"use client";

import { TypewriterEffect } from "@/components/effects/typewritter";
import { SOCIAL_LINKS } from "@/data/social-links";
import { motion } from "motion/react";
import { Mail, Twitter, ArrowDown } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";

export function HeroSection() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 mb-6 font-light"
        >
          Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Yuvrajsinh
          </span>
          <br />
          <span className="text-white/90">Gohil</span>
        </motion.h1>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-8"
        >
          <TypewriterEffect
            words={[
              { text: "Full-Stack" },
              { text: "Developer" },
              { text: "•" },
              { text: "Problem" },
              { text: "Solver" },
              { text: "•" },
              { text: "Tech" },
              { text: "Enthusiast" },
            ]}
            className="text-xl md:text-2xl text-gray-300 font-medium"
          />
        </motion.div>

        {/* Brief description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="max-w-2xl text-gray-400 text-lg leading-relaxed mb-12 mx-auto"
        >
          Computer Science student at Nirma University, passionate about
          creating innovative solutions with modern technologies and clean code.
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex gap-6 justify-center items-center mb-16"
        >
          {SOCIAL_LINKS.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.1 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Link
                href={
                  social.name === "Email"
                    ? social.url
                    : { pathname: social.url }
                }
                target="_blank"
                className="group relative p-4 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/20
                         hover:bg-white/15 hover:border-white/30 hover:scale-110 hover:-translate-y-1
                         transition-all duration-300 ease-out shadow-lg hover:shadow-xl"
              >
                <div className="relative z-10">
                  {social.icon === "Github" && (
                    <SiGithub
                      size={24}
                      className="text-white group-hover:text-blue-400 transition-colors duration-300"
                    />
                  )}
                  {social.icon === "Linkedin" && (
                    <SiLinkedin
                      size={24}
                      className="text-white group-hover:text-blue-400 transition-colors duration-300"
                    />
                  )}
                  {social.icon === "Mail" && (
                    <Mail
                      size={24}
                      className="text-white group-hover:text-blue-400 transition-colors duration-300"
                    />
                  )}
                  {social.icon === "Twitter" && (
                    <Twitter
                      size={24}
                      className="text-white group-hover:text-blue-400 transition-colors duration-300"
                    />
                  )}
                </div>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToProjects}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="group flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm font-medium">Explore my work</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-2 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300"
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
}
