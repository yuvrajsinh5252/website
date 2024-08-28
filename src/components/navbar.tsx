"use client"

import Link from "next/link";
import DarkModeToggle from "./theme/toggle-theme";
import NoSSR from "react-no-ssr";
import GrowingCircleAnimation from "./theme/GrowingCircleAnimation";

export default function Navbar() {
  return (
    <div className="flex justify-around items-center p-2 fixed w-full mt-5">
      <div className="w-4 h-4 rounded-full border-none relative -z-50 focus:outline-none">
        <NoSSR>
          <GrowingCircleAnimation />
        </NoSSR>
        <DarkModeToggle />
      </div>
      <nav className="pointer-events-auto gap-5 p-3 pr-5 pl-5 hidden md:inline-flex bg-gray-800/20 px-3.5 text-sm rounded-full font-medium shadow-xl shadow-black/20 ring-1 ring-inset ring-gray-700/30 backdrop-blur-lg">
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/skills">Skills</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  )
}