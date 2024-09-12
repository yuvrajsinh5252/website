"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("rgba(70, 0, 200, 0.15)");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    }

    document.addEventListener("mousemove", move);

    return () => {
      document.removeEventListener("mousemove", move);
    }
  }, [setPosition])

  useEffect(() => {
    setTimeout(() => {
      setColor(theme === "dark" ? "rgba(70, 0, 200, 0.15)" : "rgb(210, 0, 0, 0.4)");
    }, 350);
  }, [theme])

  return (
    <div
      style={{
        background: `radial-gradient(600px at ${position.x + 200}px ${position.y + 500}px, ${color}, transparent 80%)`,
      }}
      className="pointer-events-none fixed w-[120vw] -left-[200px] -top-[500px] -z-10 aspect-square rounded-full blur-3xl backdrop-blur-3xl transition duration-300 ease-in-out"
    >
    </div>
  )
}
