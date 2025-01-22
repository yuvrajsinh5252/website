"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const customEvent = new CustomEvent("darkModeToggle", {
      detail: { x, y },
    });
    window.dispatchEvent(customEvent);

    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="relative rounded-full justify-center items-center border-none focus:outline-none">
      <button
        className="p-3 flex rounded-full bg-gray-400/40 backdrop-blur-sm focus:outline-none hover:bg-gray-400/60 transition-colors"
        onClick={handleThemeToggle}
      >
        <div
          className={`absolute rounded-full left-2 bottom-2 w-5 h-5 transform transition duration-700 ${
            theme === "light" ? "scale-100 bg-white" : "scale-0 bg-black"
          }`}
        />
      </button>
    </div>
  );
}
