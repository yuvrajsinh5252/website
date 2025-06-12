"use client";

import { TypewriterEffect } from "@/components/effects/typewritter";
import { SOCIAL_LINKS } from "@/data/social-links";
import { motion } from "motion/react";
import { Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { GlowText } from "@/components/effects/glow-text";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-[90vw] md:w-[40rem] h-[14rem] md:h-[12rem] relative cursor-pointer">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="mb-4 text-xl text-center">Hey there, I&apos;m</p>
            <h1 className="flex max-sm:flex-col -gap-3 text-6xl lg:text-7xl font-extrabold text-center">
              <GlowText
                text="Yuvrajsinh"
                colorFrom="#3B82F6"
                colorTo="#06B6D4"
                animationSpeed={1.2}
              />
              <GlowText
                text="Gohil"
                colorFrom="#06B6D4"
                colorTo="#10B981"
                animationSpeed={1.5}
              />
            </h1>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 px-4 md:px-0"
      >
        <TypewriterEffect
          words={[
            {
              text: "Passionate about efficiency, ",
            },
            { text: "tech, and open source." },
          ]}
          className="font-bold text-base md:text-xl"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <div className="flex gap-6 justify-center items-center">
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.name}
              href={
                social.name === "Email" ? social.url : { pathname: social.url }
              }
              target="_blank"
              className="p-3 rounded-full hover:bg-gray-800 expand-cursor hover:scale-110 hover:-translate-y-1 transition-all duration-300"
            >
              {social.icon === "Github" && <SiGithub size={24} />}
              {social.icon === "Linkedin" && <SiLinkedin size={24} />}
              {social.icon === "Mail" && <Mail size={24} />}
              {social.icon === "Twitter" && <Twitter size={24} />}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
