"use client";

import React from "react";
import { motion } from "framer-motion";
import MaxWidthWrapper from "../ui/max-width-wrapper";
import NavLink from "./navlink";

const NAV_ITEMS = [
  { href: "/", text: "home", width: 95 },
  { href: "/projects", text: "projects", width: 115 },
  { href: "/writings", text: "writings", width: 105 },
] as const;

export default function Navbar() {
  return (
    <MaxWidthWrapper className="fixed flex justify-center md:px-10 items-center w-full h-fit mt-10 z-50 mx-auto left-0 right-0">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center w-fit h-5 py-5 max-sm:py-4 rounded-full
          backdrop-blur-md
          bg-slate-600/40
          border border-slate-700/40
          hover:border-blue-500/20
          shadow-lg shadow-black/20
          hover:shadow-xl hover:shadow-blue-300/40
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
    </MaxWidthWrapper>
  );
}
