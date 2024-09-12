"use client"

import { useEffect } from "react";

export default function Overlay({ children }: any) {
  useEffect(() => {
    const captures = document.querySelectorAll(".glow-capture")

    captures.forEach((capture) => {
      const clonedChild = capture.children[0].cloneNode(true)
      const overlay: any = capture.querySelector(".glow-overlay")

      overlay.appendChild(clonedChild);

      capture.addEventListener("mousemove", (event: any) => {
        const captureElement = capture as HTMLElement;

        const x = event.pageX - captureElement.offsetLeft;
        const y = event.pageY - captureElement.offsetTop;

        overlay.style.setProperty("--glow-x", `${x}px`);
        overlay.style.setProperty("--glow-y", `${y}px`);
        overlay.style.setProperty("--glow-opacity", "1");
      });

      capture.addEventListener("mouseleave", () => {
        overlay.style.setProperty("--glow-opacity", "0")
      })
    })
  }, []);

  return (
    <div className="relative glow-capture">
      {children}
      <div
        className="absolute inset-0 pointer-events-none select-none glow-overlay" style={{
          "--glow-color": "red",
          "--glow-size": "25rem",
          opacity: "var(--glow-opacity, 0)",
          mask: "radial-gradient(var(--glow-size) var(--glow-size) at var(--glow-x) var(--glow-y), var(--glow-color) 1%, transparent 50%)",
          transition: "400ms mask ease",
          willChange: "mask"
        } as React.CSSProperties}
      >
      </div>
    </div>
  );
}
