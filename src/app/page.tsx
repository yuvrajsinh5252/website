"use client";

import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import SocialLinks from "@/components/socialLinks";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Home() {
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
              <div className="w-[90vw] md:w-[40rem] h-[14rem] md:h-[12rem] relative">
                <SparklesCore
                  background="transparent"
                  minSize={0.8}
                  maxSize={1}
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
              <SocialLinks />
            </motion.div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
