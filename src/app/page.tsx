"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Orbitingskills from "@/components/orbitting-skills";
import SocialLinks from "@/components/socialLinks";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="flex justify-center flex-col h-screen max-sm:px-2 max-sm:overflow-hidden">

        <div className="flex max-sm:flex-col justify-between max-sm:gap-20 max-sm:mt-20">
          <motion.div
            className="flex items-start justify-center flex-col w-full gap-5"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="flex items-start flex-col">
              <span className="mt-2 font-semibold tracking-tight text-4xl md:text-[2.7rem] leading-tight md:leading-tight">
                Hey there, I&lsquo;m
              </span>
              <div className="flex">
                <h1 className="text-5xl font-extrabold highlight pb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  Yuvrajsinh Gohil
                </h1>
                <span className="text-4xl animate-wiggle mix-blend-normal">👋🏽</span>
              </div>
            </div>

            <div>
              <p className="text-xl md:text-[17px] text-gray-400 tracking-tight leading-relaxed">
                Passionate about efficiency, tech, and open source
              </p>
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
