"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { MeteorShowerEffect } from "@/components/effects/meteor-shower";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
}

export function Background() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const gradientBackgrounds = useMemo(
    () => ({
      nebula: `
        radial-gradient(ellipse 150% 100% at 25% 15%,
          rgba(37, 99, 235, 0.12) 0%,
          rgba(37, 99, 235, 0.10) 15%,
          rgba(37, 99, 235, 0.08) 25%,
          rgba(37, 99, 235, 0.06) 35%,
          rgba(37, 99, 235, 0.04) 45%,
          rgba(37, 99, 235, 0.02) 60%,
          rgba(37, 99, 235, 0.01) 75%,
          transparent 85%),
        radial-gradient(ellipse 120% 80% at 75% 85%,
          rgba(139, 92, 246, 0.10) 0%,
          rgba(139, 92, 246, 0.08) 20%,
          rgba(139, 92, 246, 0.06) 30%,
          rgba(168, 85, 247, 0.04) 45%,
          rgba(168, 85, 247, 0.03) 55%,
          rgba(168, 85, 247, 0.02) 70%,
          rgba(168, 85, 247, 0.01) 80%,
          transparent 95%),
        radial-gradient(ellipse 200% 100% at 50% 0%,
          rgba(59, 130, 246, 0.08) 0%,
          rgba(59, 130, 246, 0.06) 25%,
          rgba(59, 130, 246, 0.04) 40%,
          rgba(59, 130, 246, 0.02) 60%,
          rgba(59, 130, 246, 0.01) 75%,
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
      stars: `
        radial-gradient(2px 2px at 83px 47px, rgba(255,255,255,1.0) 0%, transparent 2px),
        radial-gradient(1px 1px at 234px 89px, rgba(255,255,255,0.8) 0%, transparent 1px),
        radial-gradient(2px 2px at 156px 23px, rgba(255,255,255,0.9) 0%, transparent 2px),
        radial-gradient(1px 1px at 67px 134px, rgba(255,255,255,0.7) 0%, transparent 1px),
        radial-gradient(1px 1px at 289px 56px, rgba(255,255,255,0.6) 0%, transparent 1px),
        radial-gradient(2px 2px at 123px 178px, rgba(255,255,255,1.0) 0%, transparent 2px)
      `,
      vignette: `
        radial-gradient(circle at center, transparent 40%, rgba(3, 7, 18, 0.6) 100%)
      `,
    }),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const generateParticles = () => {
      const particleCount = Math.min(
        15,
        Math.max(8, Math.floor(window.innerWidth / 120))
      );
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3.0 + 1.2,
          speedX: (Math.random() - 0.5) * 0.05,
          speedY: (Math.random() - 0.5) * 0.05,
          opacity: Math.random() * 0.6 + 0.3,
          animationDuration: 5 + Math.random() * 4,
          animationDelay: Math.random() * 4,
        });
      }
      setParticles(newParticles);
    };

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          if (newX < -10) newX = window.innerWidth + 10;
          if (newX > window.innerWidth + 10) newX = -10;
          if (newY < -10) newY = window.innerHeight + 10;
          if (newY > window.innerHeight + 10) newY = -10;

          return { ...particle, x: newX, y: newY };
        })
      );
    };

    generateParticles();

    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    const intervalId = setInterval(animateParticles, 120);

    const handleResize = () => {
      setParticles((prevParticles) => {
        if (prevParticles.length === 0) {
          generateParticles();
          return prevParticles;
        }
        return prevParticles.map((particle) => ({
          ...particle,
          x: Math.min(particle.x, window.innerWidth),
          y: Math.min(particle.y, window.innerHeight),
        }));
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      <div className="absolute inset-0 z-20">
        <div
          className="absolute inset-0 opacity-35"
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
            backgroundAttachment: "fixed",
          }}
        />

        <motion.div
          className="absolute inset-0"
          style={{
            background: gradientBackgrounds.stars,
            backgroundSize: "400px 300px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.4 : 0 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          className="absolute inset-0"
          style={{
            background: gradientBackgrounds.stars,
            backgroundSize: "600px 450px",
            backgroundPosition: "200px 150px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.25 : 0 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 1.5 }}
        />

        {isLoaded && (
          <motion.div
            className="absolute top-0 left-0 w-[40rem] h-[25rem]"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.10) 30%, rgba(37, 99, 235, 0.05) 50%, rgba(37, 99, 235, 0.02) 70%, transparent 90%)",
              filter: "blur(60px)",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.08, 0.15, 0.08],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {isLoaded && (
          <motion.div
            className="absolute top-1/3 right-0 w-[35rem] h-[30rem]"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 70% 50%, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 25%, rgba(168, 85, 247, 0.08) 40%, rgba(168, 85, 247, 0.04) 60%, rgba(168, 85, 247, 0.02) 80%, transparent 95%)",
              filter: "blur(80px)",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.06, 0.1, 0.06],
              scale: [1, 1.15, 1],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        )}

        {isLoaded && (
          <motion.div
            className="absolute bottom-0 left-1/4 w-[50rem] h-[20rem]"
            style={{
              background:
                "radial-gradient(ellipse 80% 40% at 50% 80%, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.08) 30%, rgba(37, 99, 235, 0.08) 50%, rgba(37, 99, 235, 0.04) 70%, rgba(37, 99, 235, 0.02) 85%, transparent 100%)",
              filter: "blur(70px)",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.05, 0.09, 0.05],
              x: [0, "5vw", 0],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10,
            }}
          />
        )}
      </div>

      {isLoaded && (
        <svg className="absolute inset-0 w-full h-full opacity-8">
          <motion.path
            d="M 150 100 Q 250 150 350 120 T 550 140"
            stroke="rgba(147, 197, 253, 0.2)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 8, ease: "easeInOut", delay: 2 }}
          />
          <motion.path
            d="M 100 300 L 200 280 L 180 350 L 280 320"
            stroke="rgba(196, 181, 253, 0.15)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.15 }}
            transition={{ duration: 10, ease: "easeInOut", delay: 4 }}
          />
        </svg>
      )}

      {isLoaded && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${
                  particle.opacity * 0.8
                })`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [
                  particle.opacity,
                  particle.opacity * 2,
                  particle.opacity,
                ],
              }}
              transition={{
                duration: particle.animationDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.animationDelay,
              }}
            />
          ))}
        </motion.div>
      )}

      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{ background: gradientBackgrounds.vignette }}
      />

      <MeteorShowerEffect
        key="meteor-shower-main"
        className="absolute inset-0 z-30 h-full w-full"
        background="transparent"
        meteorCount={1}
        meteorSize={{ min: 1.0, max: 2.0 }}
        meteorSpeed={{ min: 5, max: 10 }}
        tailLength={{ min: 80, max: 160 }}
        meteorColor="#FFFFFF"
        meteorGlow={true}
        colorVariation={false}
        showStars={false}
        meteorFrequency={{ min: 6000, max: 12000 }}
        maxSimultaneousMeteors={1}
      />
    </div>
  );
}
