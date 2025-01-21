"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NavLink from "./navlink";
import ThemeToggle from "../theme/toggle-theme";
import { motion } from "framer-motion";
import MaxWidthWrapper from "../ui/MaxWidthWrapper";

const NAV_ITEMS = [
  { href: "/", text: "home", width: 95 },
  { href: "/projects", text: "projects", width: 115 },
  { href: "/about", text: "about", width: 95 },
  { href: "/blog", text: "blog", width: 82 },
] as const;

export default function Navbar() {
  const activeNav = usePathname();
  const navRef = React.useRef<HTMLElement>(null);

  const updateActiveBgPosition = React.useCallback(() => {
    const activeBg = document.getElementById("active-bg");
    const activeLink = document.querySelector(`[href="${activeNav}"]`);
    if (!activeLink || !activeBg || !navRef.current) return;

    const item = NAV_ITEMS.find((item) => item.href === activeNav);
    if (!item) return;

    const rect = activeLink.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    const left = rect.left - navRect.left;

    Object.assign(activeBg.style, {
      left: `${left - 18}px`,
      width: `${item.width + 12}px`,
      opacity: "1",
    });
  }, [activeNav]);

  React.useEffect(() => {
    updateActiveBgPosition();
    window.addEventListener("resize", updateActiveBgPosition);
    return () => window.removeEventListener("resize", updateActiveBgPosition);
  }, [updateActiveBgPosition]);

  return (
    <MaxWidthWrapper className="fixed flex justify-between md:px-10 max-w-screen-lg items-center w-full h-fit mt-10 z-50 mx-auto left-0 right-0">
      <div></div>
      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex items-center gap-8 w-fit h-8 px-5 py-6 rounded-full backdrop-blur-md bg-gray-100/20 dark:bg-gray-800/50 border dark:border-gray-300/20 border-gray-300 hover:bg-white/40 group shadow-lg shadow-black/5 dark:shadow-white/5 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10"
      >
        <div
          id="active-bg"
          className="absolute inset-0 h-11 top-1/2 -translate-y-1/2 z-0 rounded-full transition-all duration-600 dark:bg-gray-300/20 bg-black/10 backdrop-blur-sm group-hover:dark:bg-gray-300/30 group-hover:bg-black/15 opacity-0"
        />
        {NAV_ITEMS.map((item) => (
          <motion.div
            key={item.href}
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <NavLink href={item.href} text={item.text} />
          </motion.div>
        ))}
      </motion.nav>
      <ThemeToggle />
    </MaxWidthWrapper>
  );
}
