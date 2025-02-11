"use client";

import React from "react";
import { motion } from "motion/react";
import MaxWidthWrapper from "../ui/max-width-wrapper";
import NavLink from "./navlink";
import ThemeToggle from "../themes/theme-toggle";

const NAV_ITEMS = [
  { href: "/", text: "home", width: 95 },
  { href: "/about", text: "about", width: 95 },
  { href: "/projects", text: "projects", width: 115 },
  { href: "/blog", text: "blog", width: 82 },
] as const;

export default function Navbar() {
  return (
    <MaxWidthWrapper className="fixed flex justify-between md:px-10 items-center w-full h-fit mt-10 z-50 mx-auto left-0 right-0">
      <div></div>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center w-fit h-5 py-5 rounded-full
          backdrop-blur-md
          bg-white/40 dark:bg-slate-600/40
          border border-white/40 dark:border-slate-700/40
          hover:border-blue-200/40 dark:hover:border-blue-500/20
          shadow-lg shadow-black/5 dark:shadow-black/20
          hover:shadow-xl hover:shadow-blue-100/20 dark:hover:shadow-blue-300/40
          transition-all duration-300"
      >
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
