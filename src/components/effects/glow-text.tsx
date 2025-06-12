"use client";

import { useEffect, useRef, useState } from "react";

interface GlowTextProps {
  text: string;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
  animationSpeed?: number;
}

export function GlowText({
  text,
  className = "",
  colorFrom,
  colorTo,
  animationSpeed = 1,
}: GlowTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const defaultColorFrom = "#4D9FFF";
  const defaultColorTo = "#38BDF8";

  const gradientFrom = colorFrom || defaultColorFrom;
  const gradientTo = colorTo || defaultColorTo;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const calculateGradientAngle = () => {
    if (!containerRef.current || !isHovered) return 120;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const angleRad = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
    const angleDeg = (angleRad * 180) / Math.PI;

    return angleDeg;
  };

  const gradientStyle = {
    backgroundImage: `linear-gradient(${calculateGradientAngle()}deg, ${gradientFrom}, ${gradientTo})`,
    backgroundSize: "200% 200%",
    animation: `gradient-shift ${4 / animationSpeed}s ease infinite`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
    position: "relative" as const,
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <span className="relative z-10 inline-block" style={gradientStyle}>
        {text}
      </span>

      <span
        className={`absolute left-0 top-0 z-0 opacity-50 blur-md transition-opacity duration-500 ${
          isHovered ? "opacity-70" : "opacity-20"
        }`}
        style={gradientStyle}
      >
        {text}
      </span>

      <style jsx global>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
