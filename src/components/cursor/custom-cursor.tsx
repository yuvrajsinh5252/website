"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<DOMRect | null>(null);
  const [cursorType, setCursorType] = useState<"default" | "link" | "text">(
    "default"
  );
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 900, mass: 0.1 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const scale = useSpring(1, springConfig);
  const rotation = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;

      const linkElement = target.closest("a");
      const textElement = target.closest(
        "p, h1, h2, h3, h4, h5, h6, span, input, textarea, button"
      );

      if (target.classList.contains("skill-tag")) {
        setCursorType("link");
        setHoveredElement(null);
        setIsHovered(true);
      } else if (linkElement) {
        setCursorType("link");
        const rect = linkElement.getBoundingClientRect();
        setHoveredElement(rect);
        setIsHovered(true);
        cursorX.set(rect.left + rect.width / 2);
        cursorY.set(rect.top + rect.height / 2);
      }
      // else if (textElement) {
      //   setCursorType("text");
      //   setIsHovered(true);
      //   setHoveredElement(null);
      // }
      else if (target.classList.contains("hoverable")) {
        setCursorType("default");
        const rect = target.getBoundingClientRect();
        setHoveredElement(rect);
        setIsHovered(true);
      } else {
        setCursorType("default");
        setHoveredElement(null);
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      scale.set(0.9);
      rotation.set(15);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
      scale.set(1);
      rotation.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, scale, rotation]);

  return (
    <motion.div
      ref={cursorRef}
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
        style={{
          scale,
          rotate: rotation,
        }}
        animate={{
          width: isHovered
            ? cursorType === "link"
              ? (hoveredElement?.width || 0) + 10
              : 30
            : 12,
          height: isHovered
            ? cursorType === "link"
              ? (hoveredElement?.height || 0) + 10
              : 30
            : 12,
          opacity: isClicked ? 1 : 0.8,
          backgroundColor: isHovered
            ? "transparent"
            : "rgba(59, 130, 246, 0.5)",
          borderColor: isHovered
            ? cursorType === "text"
              ? "#f8f8f8"
              : "#3b82f6"
            : "#3b82f6",
          borderWidth: "2px",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 900,
          mass: 0.1,
        }}
      />
    </motion.div>
  );
}
