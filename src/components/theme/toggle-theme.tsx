"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import GrowingCircleAnimation from "./GrowingCircleAnimation";
import NoSSR from "react-no-ssr";
import { Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const onClickWrapper = (event: any) => {
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = event.target.getBoundingClientRect();
    const offsetTop = elemRect.top - bodyRect.top;
    const offsetLeft = elemRect.left - bodyRect.left;

    const deviceZoomRatio =
      document.documentElement.clientWidth / window.innerWidth;

    const customEventState = {
      x: offsetLeft + elemRect.width / 2,
      y: (deviceZoomRatio > 1 ? offsetTop : elemRect.top) + elemRect.height / 2
    };

    const darkModeToggleEvent = new CustomEvent("darkModeToggle", {
      detail: customEventState
    });
    setTheme(theme === "light" ? "dark" : "light");
    dispatchEvent(darkModeToggleEvent);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-4 h-4 rounded-full fixed right-96 max-sm:right-10 flex justify-center items-center border-none focus:outline-none">
      <NoSSR>
        <GrowingCircleAnimation />
      </NoSSR>

      {
        !mounted ?
          <button
            className="p-3 relative z-10 animate-ping rounded-full bg-gray-600"
            onClick={(event) => {
              onClickWrapper(event)
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            {
              theme === "light" ? <Sun size={20} /> : <Sun size={20} color="#f8c555" />
            }
          </button>
          :
          <button
            className="p-3 flex z-10 rounded-full bg-gray-400 focus:outline-none focus:bg-blue-300"
            onClick={(event) => {
              onClickWrapper(event)
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            <div className={"absolute rounded-full left-1 bottom-1 w-5 h-5 transform  transition-all duration-700 "
              + (theme === "light" ? "scale-100 bg-white" : "scale-0 bg-[#111111]")}
            >
            </div>
          </button>
      }
    </div>
  );
};

