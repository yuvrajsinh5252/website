"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OrbitingCircles from "@/components/oribiting-cirlce";
import { RiNextjsFill } from "react-icons/ri";
import { Database, File, Phone } from "lucide-react";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

export default function Orbitingskills() {
  return (
    <MaxWidthWrapper className="items-center h-80">
      <div className="text-center sm:ml-20 h-full w-full sm:text-left flex flex-col items-center sm:items-start">
        <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg">
          <OrbitingCircles
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            delay={20}
            radius={70}
          >
            <RiNextjsFill size={30} />
          </OrbitingCircles>
          <OrbitingCircles
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            delay={10}
            radius={70}
          >
            <SiTailwindcss size={30} />
          </OrbitingCircles>

          {/* Outer Circles (reverse) */}
          <OrbitingCircles
            className="h-[50px] w-[50px] border-none bg-transparent"
            radius={130}
            duration={40}
            delay={42}
            reverse
          >
            <SiTypescript size={25} />
          </OrbitingCircles>
          <OrbitingCircles
            className="h-[50px] w-[50px] border-none bg-transparent"
            radius={130}
            duration={40}
            delay={15}
            reverse
          >
            <TbBrandFramerMotion size={30} />
          </OrbitingCircles>
          <OrbitingCircles
            className="h-[50px] w-[50px] border-none bg-transparent"
            radius={130}
            duration={40}
            delay={30}
            reverse
          >
            <TbBrandFramerMotion size={30} />
          </OrbitingCircles>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};