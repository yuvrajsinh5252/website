"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "../MaxWidthWrapper";
import NavLink from "./navlink";
import ThemeToggle from "../theme/toggle-theme";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [activeNav, setActiveNav] = React.useState(usePathname());

  React.useEffect(() => {
    const updateActiveBgPosition = () => {
      const activeBg = document.getElementById("active-bg");
      const activeLink = document.querySelector(`[href="${activeNav}"]`);
      const firstLink = document.querySelector(`[href="/"]`);
      const navbar = document.getElementsByClassName(
        "navbar"
      )[0] as HTMLElement;

      if (activeLink && activeBg && firstLink && navbar) {
        const firstLinkRects = firstLink.getBoundingClientRect();
        const activeLinkRects = activeLink.getBoundingClientRect();
        const top = activeLinkRects.top - firstLinkRects.top;
        const left = activeLinkRects.left - firstLinkRects.left;

        activeBg.style.top = `4px`;

        if (activeNav === "/") {
          activeBg.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
          activeBg.style.width = "90px";
          activeBg.style.height = "40px";
          activeBg.style.left = "4px";
        }

        if (activeNav === "/projects") {
          activeBg.style.width = `110px`;
          activeBg.style.height = `40px`;
          activeBg.style.left = `40px`;
        }

        if (activeNav === "/about") {
          activeBg.style.width = `${activeLink.clientWidth + 90}px`;
          activeBg.style.height = `${activeLink.clientHeight + 40}px`;
          activeBg.style.left = `${left + 10}px`;
        }
      }
    };

    updateActiveBgPosition();
    window.addEventListener("resize", updateActiveBgPosition);
    return () => window.removeEventListener("resize", updateActiveBgPosition);
  }, [activeNav]);

  return (
    <MaxWidthWrapper className="z-50 relative">
      <div className="items-center fixed flex justify-start w-full h-fit mt-14">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
          className="flex max-sm:left-1/4 left-1/2 -translate-x-1/2 fixed m-auto items-center justify-between w-fit h-10 rounded-full dark:bg-gray-600/30 bg-white/70 duration-300 ease-linear outline-none border dark:border-gray-300/30 border-gray-800/30 backdrop-filter backdrop-blur-lg gap-4 px-4 py-6 dark:text-white text-black transition-all navbar hover:shadow-lg hover:dark:bg-gray-600/40 hover:bg-white/80"
        >
          <div
            id="active-bg"
            className="dark:bg-gray-300/20 bg-black/10 rounded-full absolute transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center backdrop-blur-sm"
          />
          <AnimatePresence mode="wait">
            {[
              { href: "/", text: "home" },
              { href: "/projects", text: "projects" },
              { href: "/about", text: "about" },
            ].map((item) => (
              <motion.div key={item.href}>
                <NavLink
                  setActiveNav={setActiveNav}
                  activeNav={activeNav}
                  text={item.text}
                  href={item.href}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.nav>
        <ThemeToggle />
      </div>
    </MaxWidthWrapper>
  );
}
