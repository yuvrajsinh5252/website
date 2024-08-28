"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import useDarkMode from "use-dark-mode";

const onClickWrapper = (darkMode: any, event: any) => {
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
  darkMode.toggle();
  dispatchEvent(darkModeToggleEvent);
};

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const darkMode = useDarkMode();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-3 absolute left-5 z-10 animate-ping rounded-full bg-gray-600"
        onClick={(event) => {
          onClickWrapper(darkMode, event)
          setTheme(theme === "light" ? "dark" : "light");
        }}
      ></button>
    )
  }

  return (
    <button
      className="p-3 absolute left-5 z-10 rounded-full bg-gray-400 focus:outline-none focus:bg-blue-300"
      onClick={(event) => {
        onClickWrapper(darkMode, event)
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <div className={"absolute rounded-full left-[7px] bottom-[7px] w-[20px] h-[20px] transform scale-100 transition-all duration-700 bg-[#111111]" +
        (theme === "light" ? "scale-100 bg-white" : "scale-0")}
      ></div>
    </button>
  );
};

export default DarkModeToggle;
