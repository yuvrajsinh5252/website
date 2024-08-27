"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 absolute left-5 z-10 rounded-full bg-gray-200 dark:bg-gray-800">
        <Sun size={24} className="animate-spin" />
      </button>)
  }

  return (
    <button
      className="p-2 absolute left-5 z-10 rounded-full bg-gray-200 dark:bg-gray-800"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "light" ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}