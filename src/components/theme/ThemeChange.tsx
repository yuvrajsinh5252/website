"use client"

import { useTheme } from "next-themes";
import ThemeToggle from "./toggle-theme";

export default function ThemeChange() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute top-0 left-0">
      <ThemeToggle />
      {/* <div
        className={"bg-black h-[250vw] w-[250vw] transform transition duration-[2000ms] rounded-full absolute " +
          (theme === "dark" ? "scale-125" : "scale-0")
        }
      >
      </div> */}
    </div>
  )
}