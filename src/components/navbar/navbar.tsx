"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "../MaxWidthWrapper";
import NavLink from "./navlink";
import ThemeToggle from "../theme/toggle-theme";
import { motion } from "framer-motion";

export default function Navbar() {
  const [activeNav, setActiveNav] = React.useState(usePathname());

  React.useEffect(() => {
    const updateActiveBgPosition = () => {
      const activeBg = document.getElementById("active-bg");
      const activeLink = document.querySelector(`[href="${activeNav}"]`);
      const firstLink = document.querySelector(`[href="/"]`);

      if (activeLink && activeBg && firstLink) {
        const firstLinkRects = firstLink.getBoundingClientRect();
        const activeLinkRects = activeLink.getBoundingClientRect();
        const top = activeLinkRects.top - firstLinkRects.top;
        const left = activeLinkRects.left - firstLinkRects.left;

        activeBg.style.width = `${activeLink.clientWidth + 30}px`;
        activeBg.style.height = `${activeLink.clientHeight}px`;

        activeBg.style.top = `${top + (activeNav === "/" ? 7.5 : 11)}px`;
        activeBg.style.left = `${left + (activeNav === "/" ? 28 : 15)}px`;
      } else if (activeBg) {
        activeBg.style.top = `0px`;
        activeBg.style.left = `0px`;
      }
    };

    updateActiveBgPosition();
  }, [activeNav]);

  return (
    <MaxWidthWrapper className="z-50 relative">
      <div className="items-center fixed flex justify-start w-full h-fit mt-14">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex left-1/2 -translate-x-1/2 fixed m-auto items-center justify-between w-fit h-9 rounded-2xl bg-gray-600/20 duration-300 ease-linear outline-none border-2 border-gray-300/20 border-opacity-20 backdrop-filter backdrop-blur-md gap-2 py-7 px-3 dark:text-white text-black transition-all"
        >
          <div
            id="active-bg"
            className="dark:bg-gray-300/20 -mx-5 bg-opacity-10 h-9 rounded-2xl absolute bg transition-all duration-300 ease-linear flex items-center justify-center bg-black"
          ></div>
          <NavLink
            setActiveNav={setActiveNav}
            activeNav={activeNav}
            text="home"
            href="/"
          />
          <NavLink
            setActiveNav={setActiveNav}
            activeNav={activeNav}
            text="projects"
            href="/projects"
          />
          <NavLink
            setActiveNav={setActiveNav}
            activeNav={activeNav}
            text="about"
            href="/about"
          />
          {/* <NavLink setActiveNav={setActiveNav} activeNav={activeNav} text="blog" href="/blog" /> */}
        </motion.nav>
        <ThemeToggle />
      </div>
    </MaxWidthWrapper>
  );
}
