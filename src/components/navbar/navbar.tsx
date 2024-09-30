"use client"

import React from "react";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "../MaxWidthWrapper";
import NavLink from "./navlink";
import ThemeToggle from "../theme/toggle-theme";

export default function Navbar() {
  const [activeNav, setActiveNav] = React.useState(usePathname());

  React.useEffect(() => {
    try {
      const activeBg = document.getElementById("active-bg");
      const activeLink = document.querySelector(`[href="${activeNav}"]`);
      const firstLink = document.querySelector(`[href="/"]`);

      if (activeLink && activeBg && firstLink) {
        const firstLinkRects = firstLink.getClientRects()[0];
        const activeLinkRects = activeLink.getClientRects()[0];
        const top = activeLinkRects.top - firstLinkRects.top;
        const left = activeLinkRects.left - firstLinkRects.left;

        activeBg.style.width = `${activeLink.clientWidth + 30}px`;
        activeBg.style.height = `calc(${activeLink.clientHeight}px)`;

        if (activeNav === "/") {
          activeBg.style.top = `${top + 7.5}px`;
          activeBg.style.left = `${left + 28}px`;
        }
        else {
          activeBg.style.top = `${top + 11}px`;
          activeBg.style.left = `${left + 15}px`;
        }
      } else if (activeBg) {
        activeBg.style.top = `0px`;
        activeBg.style.left = `0px`;
      }
    } catch (error) {
      alert("Error in Navbar: " + error);
    }
  }, [activeNav])

  return (
    <MaxWidthWrapper className="z-50 relative">
      <div className="items-center fixed flex justify-start w-[inherit] h-fit mt-14">
        <nav className="flex left-1/2 -translate-x-1/2 fixed m-auto items-center justify-between w-fit h-9 rounded-2xl bg-gray-600/20 transition-transform duration-200 ease-linear outline-none border-2 border-gray-300/20 border-opacity-20 backdrop-filter backdrop-blur-xl gap-2 py-7 px-3">
          <div
            id="active-bg"
            className="bg-gray-300/20 -mx-5 bg-opacity-10 h-9 rounded-2xl absolute bg transition-all duration-300 ease-linear flex items-center justify-center">
          </div>
          <NavLink setActiveNav={setActiveNav} activeNav={activeNav} text="home" href="/" />
          <NavLink setActiveNav={setActiveNav} activeNav={activeNav} text="projects" href="/projects" />
          <NavLink setActiveNav={setActiveNav} activeNav={activeNav} text="about" href="/about" />
          {/* <NavLink setActiveNav={setActiveNav} activeNav={activeNav} text="blog" href="/blog" /> */}
        </nav>
        <ThemeToggle />
      </div >
    </MaxWidthWrapper>
  )
}