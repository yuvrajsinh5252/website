"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-0">
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/50"
            : "bg-gradient-to-b from-transparent via-gray-100/30 to-gray-200/50"
        }`}
      />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              isDark ? "bg-blue-500/10" : "bg-blue-500/5"
            } backdrop-blur-3xl`}
            initial={{
              opacity: 0.1,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 2 + 1,
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 2 + 1,
              opacity: isDark ? [0.1, 0.2, 0.1] : [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              filter: isDark ? "none" : "saturate(1.2) brightness(1.1)",
            }}
          />
        ))}
      </div>

      <div
        className={`absolute inset-0 bg-noise ${
          isDark ? "opacity-20" : "opacity-[0.07]"
        }`}
      />
    </div>
  );
}
