"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "../ui/MaxWidthWrapper";
import NavLink from "./navlink";
import ThemeToggle from "../theme/toggle-theme";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "/", text: "home", width: 95 },
  { href: "/projects", text: "projects", width: 115 },
  { href: "/about", text: "about", width: 95 },
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
    <MaxWidthWrapper>
      <div className="fixed flex justify-start items-center w-full h-fit mt-14 z-50">
        <motion.nav
          ref={navRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="fixed m-auto flex items-center gap-8 w-fit h-8 px-5 py-6 max-sm:left-1/4 left-[45%] rounded-full backdrop-blur-md dark:bg-gray-800/50 border dark:border-gray-300/20 hover:dark:bg-gray-800/50 hover:bg-white/90 group shadow-lg shadow-black/5 dark:shadow-white/5 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10"
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
              <NavLink
                href={item.href}
                text={item.text}
                className="px-3 py-2 relative capitalize"
                activeClassName="font-medium"
              />
            </motion.div>
          ))}
        </motion.nav>
        <ThemeToggle />
      </div>
    </MaxWidthWrapper>
  );
}
