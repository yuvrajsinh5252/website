"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OrbitingCircles from "@/components/orbiter/oribiting-cirlce";
import { FaPython } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiCplusplus, SiTailwindcss, SiTypescript } from "react-icons/si";
import { motion } from "framer-motion";

export default function Orbitingskills() {
  return (
    <MaxWidthWrapper className="items-center h-80 max-sm:hidden">
      <div className="text-center sm:ml-20 h-full w-full sm:text-left flex flex-col items-center sm:items-start">
        <motion.div
          className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <OrbitingCircles
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            delay={20}
            radius={70}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <RiNextjsFill size={30} />
            </motion.div>
          </OrbitingCircles>
          <OrbitingCircles
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            delay={10}
            radius={70}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SiTailwindcss size={30} />
            </motion.div>
          </OrbitingCircles>

          {/* Outer Circles (reverse) */}
          <OrbitingCircles
            className="h-[50px] w-[50px] border-none bg-transparent"
            radius={130}
            duration={40}
            delay={42}
            reverse
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SiTypescript size={25} />
            </motion.div>
          </OrbitingCircles>
          <OrbitingCircles
            className="h-[50px] w-[50px] border-none bg-transparent"
            radius={130}
            duration={40}
            delay={15}
            reverse
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaPython size={30} />
            </motion.div>
          </OrbitingCircles>
          <OrbitingCircles
            className="h-[50px] w-[50px] border-none bg-transparent"
            radius={130}
            duration={40}
            delay={28}
            reverse
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SiCplusplus size={30} />
            </motion.div>
          </OrbitingCircles>
        </motion.div>
      </div>
    </MaxWidthWrapper>
  );
}
