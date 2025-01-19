"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
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
      y: (deviceZoomRatio > 1 ? offsetTop : elemRect.top) + elemRect.height / 2,
    };

    const darkModeToggleEvent = new CustomEvent("darkModeToggle", {
      detail: customEventState,
    });
    setTheme(theme === "light" ? "dark" : "light");
    dispatchEvent(darkModeToggleEvent);
  };

  return (
    <div className="w-4 h-4 rounded-full fixed right-[10%] max-sm:left-5 max-sm:top-[95%] flex justify-center items-center border-none focus:outline-none">
      <button
        className="p-3 flex rounded-full bg-gray-400 focus:outline-none focus:bg-blue-300"
        onClick={(event) => {
          onClickWrapper(event);
        }}
      >
        <div
          className={`absolute rounded-full left-1 bottom-1 w-5 h-5 transform transition-all duration-700 ${
            theme === "light" ? "scale-100 bg-[#F0F0F0]" : "scale-0 bg-black"
          }`}
        ></div>
      </button>
    </div>
  );
}
