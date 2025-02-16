"use client";

import { SparklesCore } from "@/components/effects/sparkles";
import { TypewriterEffect } from "@/components/effects/typewritter";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { SOCIAL_LINKS } from "@/data/social-links";
import { motion } from "motion/react";
import { Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { GravityBox } from "@/components/effects/gravity-box";
import { useState } from "react";

export default function Home() {
  const [isGravityActive, setIsGravityActive] = useState(false);

  return (
    <div className="relative w-full">
      <MaxWidthWrapper>
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div
                className="w-[90vw] md:w-[40rem] h-[14rem] md:h-[12rem] relative cursor-pointer"
                onClick={() => setIsGravityActive(true)}
              >
                {/* <GravityBox isActive={isGravityActive}> */}
                <SparklesCore
                  background="transparent"
                  minSize={0.8}
                  maxSize={1.5}
                  particleDensity={100}
                  className="w-full h-full"
                  particleColor="#4A90E2"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="mb-4 text-xl text-center">
                    Hey there, I&apos;m
                  </p>
                  <h1 className="flex max-sm:flex-col gap-3 text-6xl lg:text-7xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 animate-text">
                    <span>Yuvrajsinh</span>
                    <span>Gohil</span>
                  </h1>
                </div>
                {/* </GravityBox> */}
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
                      social.name === "Email"
                        ? social.url
                        : { pathname: social.url }
                    }
                    target="_blank"
                    className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 expand-cursor hover:scale-110 hover:-translate-y-1"
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
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
