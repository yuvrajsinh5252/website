"use client";

import React from "react";
import { motion } from "framer-motion";
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
        className="flex items-center w-fit h-5 py-5 rounded-full backdrop-blur-lg bg-white/10 dark:bg-slate-800/40 border dark:border-gray-500/20 border-gray-200/60 hover:bg-white/20 dark:hover:bg-slate-700/50 group shadow-lg shadow-black/5 dark:shadow-white/5 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10 transition-colors"
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
