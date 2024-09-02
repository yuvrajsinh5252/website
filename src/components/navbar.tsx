"use client"

import { usePathname } from "next/navigation";
import NavLink from "./navlink";
import NavTitle from "./navtitle";
import ThemeToggle from "./theme/toggle-theme";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function Navbar() {
  let path = usePathname();

  React.useEffect(() => {
    try {
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
    } catch (error) {
      alert("Error in Navbar: " + error);
    }
  }, [path])

  return (
    <MaxWidthWrapper>
      <div className="items-center fixed flex justify-start w-[inherit] h-fit mt-12">
        {/* <NavTitle /> */}

        <nav className="hidden md:inline-flex left-1/2 -translate-x-1/2 fixed max-auto items-center justify-center w-fit h-9 rounded-full bg-gray-600/10  transition-transform duration-200 ease-linear outline-none">
          <div
            id="active-bg"
            className="bg-gray-300/20 bg-opacity-10 h-9 rounded-full absolute bg transition-all duration-300 ease-linear flex items-center justify-center">
          </div>
          <NavLink text="home" href="/" />
          <NavLink text="projects" href="/projects" />
          <NavLink text="skills" href="/skills" />
          <NavLink text="blog" href="/blog" />
        </nav>

        <ThemeToggle />
      </div >
    </MaxWidthWrapper>
  )
}