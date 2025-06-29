"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useState } from "react";

interface ColorSwingBoxProps {
  children: React.ReactNode;
  className?: string;
  whileHover?: any;
  [key: string]: any;
}

export function ColorSwingBox({
  children,
  className = "",
  whileHover,
  ...props
}: ColorSwingBoxProps) {
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
        duration: 1.5,
        ease: "easeInOut",
        onComplete: () => {
          rotation.set(0);
          setTimeout(() => setHasAnimated(false), 500);
        },
      });
    }
  };

  return (
    <motion.div
      className={`group relative ${className}`}
      onHoverStart={handleHoverStart}
      whileHover={whileHover}
      {...props}
    >
      {/* Color swing border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
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
