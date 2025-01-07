"use client";

import { PROJECTS } from "@/data/projectData";
import { motion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { SiGithub } from "react-icons/si";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen no-scrollbar overflow-scroll">
      <div className="flex flex-col max-sm:items-center max-w-screen-lg gap-10 mt-44 pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 sm:text-5xl text-4xl font-bold pl-2"
        >
          <IoIosArrowForward className="text-3xl max-sm:hidden sm:text-4xl" />
          <span>Projects</span>
        </motion.h1>
        <div className="flex items-center max-sm:flex-col justify-center flex-wrap h-full">
          {PROJECTS.map((project, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex max-sm:w-full w-1/2 justify-center p-2 gap-2 group"
              >
                <div
                  id={project.title}
                  className="flex rounded-lg justify-between flex-col gap-4 p-1 relative w-full"
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
                            className="flex items-center rounded-full px-3 py-1 text-xs leading-5 bg-[#50E3C2]/30 "
                          >
                            {t}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
