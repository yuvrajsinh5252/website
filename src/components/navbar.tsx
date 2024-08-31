"use client"

import Link from "next/link";
import DarkModeToggle from "./theme/toggle-theme";
import NoSSR from "react-no-ssr";
import GrowingCircleAnimation from "./theme/GrowingCircleAnimation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NavLink from "./navlink";

export default function Navbar() {
  let path = usePathname();

  "use client"
  useEffect(() => {
    const activeBg = document.getElementById("active-bg");
    const activeLink = document.querySelector(`[href="${path}"]`);
    const firstLink = document.querySelector(`[href="/"]`);

    if (activeLink && activeBg && firstLink) {
      const firstLinkRects = firstLink.getClientRects()[0];
      const activeLinkRects = activeLink.getClientRects()[0];
      const top = activeLinkRects.top - firstLinkRects.top;
      const left = activeLinkRects.left - firstLinkRects.left;

      activeBg.style.width = `${activeLink.clientWidth}px`;
      activeBg.style.height = `calc(${activeLink.clientHeight}px + 12px)`;
      activeBg.style.top = `${top - 1}px`;
      activeBg.style.left = `${left}px`;
    } else if (activeBg) {
      activeBg.style.top = `0px`;
      activeBg.style.left = `0px`;
    }
  }, [path])

  return (
    <div className="flex justify-center gap-10 items-center p-2 fixed w-full mt-5">
      <div className="w-4 h-4 absolute rounded-full border-none bottom-0 right-10 -z-50 focus:outline-none">
        <NoSSR>
          <GrowingCircleAnimation />
        </NoSSR>
        <DarkModeToggle />
      </div>
      <nav className="fixed left-1/2 flex z-50 -translate-x-1/2 mx-auto items-center justify-center w-fit mt-6 h-9 rounded-full
      dark:bg-gray-600/20 bg-gray-200/80 bg transition-all duration-200 ease-linear outline-none">
        <div
          id="active-bg"
          className="dark:bg-gray-300/20 bg-gray-300/80
          bg-opacity-10 h-9 rounded-full z-0 absolute bg transition-all duration-300 ease-linear flex items-center justify-center">
        </div>
        <NavLink text="home" href="/" />
        <NavLink text="projects" href="/projects" />
        <NavLink text="skills" href="/skills" />
        <NavLink text="blog" href="/blog" />
      </nav>
    </div >
  )
}