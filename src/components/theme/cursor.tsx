"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    document.addEventListener("mousemove", move);

    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, [setPosition]);

  return (
    <div
      style={{
        background:
          theme === "dark"
            ? `radial-gradient(400px at ${position.x + 200}px ${
                position.y + 500
              }px, rgba(0, 0, 255, 0.2) 0%, transparent 100%)`
            : "",
      }}
      className="pointer-events-none fixed w-[120vw] -left-[200px] -top-[500px] -z-10 aspect-square rounded-full blur-4xl backdrop-blur-4xl transition duration-1000 ease-in-out"
    ></div>
  );
}
