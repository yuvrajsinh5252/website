"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<DOMRect | null>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 900, mass: 0.1 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const expandElement = target.closest(".expand-cursor");

      if (expandElement) {
        const rect = expandElement.getBoundingClientRect();
        setHoveredElement(rect);
        setIsHovered(true);
        cursorX.set(rect.left + rect.width / 2);
        cursorY.set(rect.top + rect.height / 2);
      } else {
        setHoveredElement(null);
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="rounded-full border-2"
        animate={{
          width: isHovered ? (hoveredElement?.width || 0) + 10 : 12,
          height: isHovered ? (hoveredElement?.height || 0) + 10 : 12,
          backgroundColor: "transparent",
          borderColor: "#3b82f6",
          opacity: 0.8,
        }}
        transition={springConfig}
      />
    </motion.div>
  );
}
