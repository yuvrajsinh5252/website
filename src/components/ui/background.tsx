"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo, memo } from "react";
import { MeteorShowerEffect } from "@/components/effects/meteor-shower";

const BackgroundComponent = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const gradientBackgrounds = useMemo(
    () => ({
      nebula: `
        radial-gradient(ellipse 120% 80% at 75% 85%,
          rgba(139, 92, 246, 0.06) 0%,
          rgba(139, 92, 246, 0.05) 20%,
          rgba(139, 92, 246, 0.04) 30%,
          rgba(168, 85, 247, 0.03) 45%,
          rgba(168, 85, 247, 0.02) 55%,
          rgba(168, 85, 247, 0.01) 70%,
          transparent 85%),
        linear-gradient(180deg,
          rgba(15, 23, 42, 0.7) 0%,
          rgba(18, 26, 46, 0.65) 20%,
          rgba(20, 30, 50, 0.6) 30%,
          rgba(25, 35, 55, 0.5) 45%,
          rgba(30, 41, 59, 0.4) 55%,
          rgba(25, 35, 55, 0.5) 70%,
          rgba(20, 30, 50, 0.6) 80%,
          rgba(15, 23, 42, 0.8) 100%)
      `,
      vignette: `
        radial-gradient(circle at center, transparent 35%, rgba(2, 5, 12, 0.7) 100%)
      `,
    }),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-10"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="absolute inset-0 z-20">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              ${gradientBackgrounds.nebula},
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(255,255,255,0.002) 1px,
                rgba(255,255,255,0.002) 2px
              )
            `,
            filter: "blur(1px)",
            transform: "translateZ(0)",
            willChange: "auto",
            backgroundAttachment: "fixed",
          }}
        />

        {isLoaded && (
          <motion.div
            className="absolute top-1/3 right-0 w-[35rem] h-[30rem]"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 70% 50%, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.06) 25%, rgba(168, 85, 247, 0.06) 40%, rgba(168, 85, 247, 0.03) 60%, rgba(168, 85, 247, 0.02) 80%, transparent 95%)",
              filter: "blur(50px)",
              transform: "translateZ(0)",
              willChange: "opacity, transform",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.04, 0.08, 0.04],
              scale: [1, 1.15, 1],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        )}
      </div>

      {isLoaded && (
        <svg
          className="absolute inset-0 w-full h-full opacity-8"
          style={{ transform: "translateZ(0)" }}
        >
          <motion.path
            d="M 150 100 Q 250 150 350 120 T 550 140"
            stroke="rgba(168, 85, 247, 0.1)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 8, ease: "easeInOut", delay: 2 }}
          />
          <motion.path
            d="M 100 300 L 200 280 L 180 350 L 280 320"
            stroke="rgba(196, 181, 253, 0.08)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.08 }}
            transition={{ duration: 10, ease: "easeInOut", delay: 4 }}
          />
        </svg>
      )}

      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{ background: gradientBackgrounds.vignette }}
      />

      {isLoaded && (
        <MeteorShowerEffect
          key="meteor-shower-main"
          className="absolute inset-0 z-30 h-full w-full"
          background="transparent"
          meteorCount={3}
          meteorSize={{ min: 1.0, max: 2.5 }}
          meteorSpeed={{ min: 5, max: 10 }}
          tailLength={{ min: 80, max: 150 }}
          meteorColor="#FFFFFF"
          meteorGlow={true}
          colorVariation={false}
          showStars={false}
          meteorFrequency={{ min: 6000, max: 12000 }}
          maxSimultaneousMeteors={2}
        />
      )}
    </div>
  );
};

export const Background = memo(BackgroundComponent);
