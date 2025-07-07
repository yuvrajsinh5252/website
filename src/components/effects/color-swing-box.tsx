"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState } from "react";

interface ColorSwingBoxProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function ColorSwingBox({
  children,
  className = "",
  ...props
}: ColorSwingBoxProps) {
  const { whileHover, ...restProps } = props;
  const [hasAnimated, setHasAnimated] = useState(false);
  const rotation = useMotionValue(0);

  const background = useTransform(
    rotation,
    (value) =>
      `conic-gradient(from ${value}deg, #3B82F6, #9333EA, #06B6D4, #8B5CF6, #3B82F6)`
  );

  const handleHoverStart = () => {
    if (!hasAnimated) {
      setHasAnimated(true);
      animate(rotation, 360, {
        duration: 0.7,
        ease: "easeInOut",
        onComplete: () => {
          rotation.set(0);
          setTimeout(() => setHasAnimated(false), 200);
        },
      });
    }
  };

  const hoverEffect = {
    y: -5,
    scale: 1.02,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  };

  return (
    <motion.div
      className={`group relative ${className}`}
      onHoverStart={handleHoverStart}
      whileHover={hoverEffect}
      {...restProps}
    >
      {/* Color swing border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-100"
        style={{
          background,
          borderRadius: "inherit",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "2px",
        }}
      />

      {children}
    </motion.div>
  );
}
