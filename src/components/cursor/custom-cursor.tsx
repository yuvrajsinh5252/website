"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<DOMRect | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 1000, mass: 0.2 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (target.closest("nav")) return;

      const linkElement =
        target.closest("a") ||
        (target.tagName.toLowerCase() === "a" ? target : null);

      const isInteractive =
        linkElement || target.classList.contains("hoverable");

      if (isInteractive) {
        const elementToMeasure = linkElement || target;
        const rect = elementToMeasure.getBoundingClientRect();
        setHoveredElement(rect);
        setIsHovered(true);
      } else {
        setHoveredElement(null);
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-3 h-3 rounded-full border-2 border-blue-500"
          animate={{
            width: isHovered ? (hoveredElement?.width || 0) + 10 : 12,
            height: isHovered ? (hoveredElement?.height || 0) + 10 : 12,
            opacity: 0.8,
            backgroundColor: isHovered ? "transparent" : "#3b82f6",
          }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 1000,
            mass: 0.2,
          }}
        />
      </motion.div>
    </>
  );
}
