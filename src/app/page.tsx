"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Orbitingskills from "@/components/orbiter/orbitting-skills";
import SocialLinks from "@/components/socialLinks";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="flex justify-center flex-col h-screen max-sm:px-2 max-sm:overflow-hidden">
        <div className="flex max-sm:flex-col justify-between max-sm:gap-20 max-sm:mt-5">
          <motion.div
            className="flex items-start max-sm:items-center justify-center flex-col w-full gap-5"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="flex items-start max-sm:items-center flex-col">
              <span className="mt-2 font-semibold tracking-tight text-4xl md:text-[2.7rem] leading-tight md:leading-tight">
                Hey there, I&lsquo;m
              </span>
              <div className="flex">
                <h1
                  className="text-5xl font-extrabold highlight pb-2 bg-clip-text text-transparent
                  bg-gradient-to-r from-[#FFD700] to-[#FFA500] md:text-[3.90rem] md:leading-tight md:pb-0 md:mt-1 md:mb-2
                "
                >
                  Yuvrajsinh
                </h1>
                <span className="text-4xl max-sm:hidden animate-wiggle mix-blend-normal m-auto">
                  👋🏽
                </span>
              </div>
            </div>

            <div className="max-sm:flex flex-col items-center justify-center">
              <span className="md:text-[18px] max-sm:text-xl text-gray-400 tracking-tight leading-relaxed">
                Passionate about efficiency,{" "}
              </span>
              <span className="md:text-[18px] max-sm:text-xl text-gray-400 tracking-tight leading-relaxed">
                tech, and open source
              </span>
            </div>

            <div className="flex gap-5">
              <SocialLinks />
            </div>
          </motion.div>

          <Orbitingskills />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
