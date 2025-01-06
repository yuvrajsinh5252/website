"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SocialLinks from "@/components/socialLinks";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Home() {
  return (
    <div className="relative w-full">
      <MaxWidthWrapper>
        <div className="flex flex-col min-h-screen">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-[90vw] md:w-[40rem] h-[15rem] md:h-[20rem] relative">
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={100}
                  className="w-full h-full"
                  particleColor="#4A90E2"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] to-[#50E3C2]">
                    Yuvrajsinh Gohil
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
