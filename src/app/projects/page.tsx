"use client";

import { PROJECTS } from "@/data/projectData";
import { SquareArrowOutUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect } from "react";
import { SiGithub } from "react-icons/si";

export default function Home() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme == "light") {
      PROJECTS.map((project, index) => {
        document.getElementById(project.title)?.classList.remove("box");
      });
    } else {
      PROJECTS.map((project, index) => {
        document.getElementById(project.title)?.classList.add("box");
      });
    }
  }, [theme]);

  useEffect(() => {
    document.body.onmousemove = (e) => {
      const boxes: any = Array.from(document.getElementsByClassName("box"));

      for (const date of boxes) {
        const rect = date.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        date.style.setProperty("--mouse-x", `${x}px`);
        date.style.setProperty("--mouse-y", `${y}px`);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center h-screen no-scrollbar overflow-scroll">
      <div className="flex flex-col max-sm:items-center max-w-screen-lg gap-10 mt-44 pb-10">
        <h1 className="text-5xl font-bold pl-2">Projects</h1>
        <div className="flex items-center max-sm:flex-col justify-center flex-wrap h-full">
          {PROJECTS.map((project, index) => {
            return (
              <div
                key={index}
                className="flex max-sm:w-full w-1/2 justify-center p-2 gap-2 group"
              >
                <div
                  id={project.title}
                  className="flex rounded-lg justify-between flex-col gap-4 p-1 box relative"
                >
                  <div className="p-3 rounded-lg dark:bg-gray-600/40 bg-gray-500/10 bg-clip-padding backdrop-filter backdrop-blur-lg hover:ring-1 ring-gray-400 hover:bg-opacity-10">
                    <div className="flex flex-col justify-center gap-4">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                          <h1 className="text-2xl font-bold">
                            {project.title}
                          </h1>
                          {project.link ? (
                            <Link
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <SquareArrowOutUpRight className="group-hover:text-teal-300 transition-transform duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 cursor-pointer" />
                            </Link>
                          ) : null}
                          <Link
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <SiGithub size={20} />
                          </Link>
                        </div>
                        <div>
                          {project.year ? (
                            <p className="text-[14px] leading-2">
                              {project.year}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <p className="text-[14px] leading-2 overflow-ellipsis overflow-hidden text-justify">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex mt-5 flex-wrap gap-2">
                      {project.tag.map((t, ind) => {
                        return (
                          <div
                            key={ind}
                            className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs leading-5 text-teal-300 "
                          >
                            {t}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
