"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OrbitingCircles from "@/components/oribiting-cirlce";
import { Database, File, Phone } from "lucide-react";

export default function Orbitingskills() {
  return (
    <MaxWidthWrapper className="items-center h-80">
      <div className="text-center sm:ml-20 h-full w-full sm:text-left flex flex-col items-center sm:items-start">
        <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg">
          <OrbitingCircles
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            delay={20}
            radius={60}
          >
            <Database className="text-white" size={30} />
          </OrbitingCircles>
          <OrbitingCircles
            className="h-[30px] w-[30px] border-none bg-transparent"
            duration={20}
            delay={10}
            radius={60}
          >
            <Phone className="text-white" size={30} />
          </OrbitingCircles>

          {/* Outer Circles (reverse) */}
          <OrbitingCircles
            className="h-[50px] w-[50px] border-none bg-transparent"
            radius={120}
            duration={40}
            delay={40}
            reverse
          >
            <File size={30} />
          </OrbitingCircles>
          <OrbitingCircles
            className="h-[50px] w-[50px] border-none bg-transparent"
            radius={120}
            duration={40}
            delay={20}
            reverse
          >
            <File size={30} />
          </OrbitingCircles>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};