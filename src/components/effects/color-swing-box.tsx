"use client";

import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { useState } from "react";

export function ColorSwingBox({ children }: { children: React.ReactNode }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const rotation = useMotionValue(0);

  const background = useTransform(
    rotation,
    (value) =>
      `linear-gradient(${value}deg, rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.6), rgba(139, 92, 246, 0.4))`
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

  return (
    <motion.div
      className="group p-5 sm:p-6 rounded-xl bg-gray-800/40 backdrop-blur-xl hover:bg-blue-400/10 transition-all duration-150 hover:shadow-2xl hover:shadow-blue-500/30 h-full relative overflow-hidden"
      onHoverStart={handleHoverStart}
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 p-0.5"
        style={{
          background,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />
      <div className="absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      {children}
    </motion.div>
  );
}
