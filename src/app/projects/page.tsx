import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { PROJECTS } from "@/data/projectData";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center items-center flex-wrap">
          {PROJECTS.map((project) => {
            return (
              <div className="flex justify-center p-2 gap-2 group">
                <div
                  key={project.title}
                  className="flex w-[30rem] rounded-lg h-72 justify-between flex-col gap-4 p-2 bg-gray-500/10"
                >
                  <div className="flex flex-col justify-center gap-4">
                    <div className="flex gap-4 items-center group-hover:text-teal-300">
                      <h1 className="text-2xl">
                        {project.title}
                      </h1>
                      <Link href={project.link} target="_blank" rel="noreferrer">
                        <SquareArrowOutUpRight className="transition-transform duration-300 transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                      </Link>
                    </div>
                    <p className="text-[14px]">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tag.map((t) => {
                      return (
                        <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
                          {t}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
