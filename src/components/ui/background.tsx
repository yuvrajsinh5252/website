"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";
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

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  r: number;
  g: number;
  b: number;
  layer: number;
}

export function Background() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const starCanvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);

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

    const generateParticles = () => {
      const baseCount = isMobile ? 15 : reducedMotion ? 20 : 40;
      const particleCount = Math.min(
        baseCount,
        Math.max(10, Math.floor(window.innerWidth / 50))
      );
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3.0 + 1.2,
          speedX: (Math.random() - 0.5) * 0.02,
          speedY: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.6 + 0.3,
          animationDuration: 8 + Math.random() * 6,
          animationDelay: Math.random() * 4,
        });
      }
      setParticles(newParticles);
    };

    let animationFrameId: number;

    generateParticles();

    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    let frameCount = 0;
    const startAnimation = () => {
      if (reducedMotion) return;

      const animate = () => {
        frameCount++;
        const updateFrequency = isMobile ? 20 : 10;
        if (frameCount % updateFrequency === 0) {
          setParticles((prevParticles) =>
            prevParticles.map((particle) => {
              const speedMultiplier = isMobile ? 2 : 3.3;
              let newX = particle.x + particle.speedX * speedMultiplier;
              let newY = particle.y + particle.speedY * speedMultiplier;

              if (newX < -10) newX = window.innerWidth + 10;
              if (newX > window.innerWidth + 10) newX = -10;
              if (newY < -10) newY = window.innerHeight + 10;
              if (newY > window.innerHeight + 10) newY = -10;

              return { ...particle, x: newX, y: newY };
            })
          );
        }
        animationFrameId = requestAnimationFrame(animate);
      };
      animationFrameId = requestAnimationFrame(animate);
    };

    if (!reducedMotion) {
      startAnimation();
    }

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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    const canvas = starCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const generateStars = () => {
      const starCount = isMobile ? 80 : 150;
      const stars: Star[] = [];

      for (let i = 0; i < starCount; i++) {
        const brightnessFactor = Math.pow(Math.random(), 2.5);
        const baseBrightness = 0.15 + brightnessFactor * 0.85;

        const baseSize =
          brightnessFactor < 0.1
            ? 1.5 + Math.random() * 1.5
            : brightnessFactor < 0.3
            ? 0.8 + Math.random() * 0.7
            : 0.3 + Math.random() * 0.5;

        const colorRand = Math.random();
        let r = 255,
          g = 255,
          b = 255;
        if (colorRand < 0.1) {
          r = 255;
          g = Math.floor(240 + Math.random() * 15);
          b = Math.floor(200 + Math.random() * 55);
        } else if (colorRand < 0.25) {
          r = Math.floor(200 + Math.random() * 55);
          g = Math.floor(220 + Math.random() * 35);
          b = 255;
        } else {
          const warmth = Math.floor(230 + Math.random() * 25);
          r = warmth;
          g = warmth;
          b = Math.floor(warmth + Math.random() * 15);
        }

        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: baseSize,
          brightness: baseBrightness,
          r,
          g,
          b,
          layer: Math.floor(Math.random() * 3),
        });
      }

      starsRef.current = stars;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    };

    resizeCanvas();

    const renderStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      const sortedStars = [...stars].sort((a, b) => a.layer - b.layer);

      sortedStars.forEach((star) => {
        const depthMultiplier = 0.6 + star.layer * 0.15;
        const finalBrightness = star.brightness * depthMultiplier;

        if (star.brightness > 0.5 && finalBrightness > 0.3) {
          const glowSize = star.size * 2.5;
          const glowGradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            glowSize
          );

          glowGradient.addColorStop(
            0,
            `rgba(${star.r}, ${star.g}, ${star.b}, ${finalBrightness * 0.3})`
          );
          glowGradient.addColorStop(
            0.5,
            `rgba(${star.r}, ${star.g}, ${star.b}, ${finalBrightness * 0.1})`
          );
          glowGradient.addColorStop(
            1,
            `rgba(${star.r}, ${star.g}, ${star.b}, 0)`
          );

          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${finalBrightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (
          star.brightness > 0.8 &&
          Math.random() < 0.01 &&
          finalBrightness > 0.5
        ) {
          const sparkleLength = star.size * 3;
          ctx.strokeStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${
            finalBrightness * 0.6
          })`;
          ctx.lineWidth = 0.5;

          ctx.beginPath();
          ctx.moveTo(star.x - sparkleLength, star.y);
          ctx.lineTo(star.x + sparkleLength, star.y);
          ctx.moveTo(star.x, star.y - sparkleLength);
          ctx.lineTo(star.x, star.y + sparkleLength);
          ctx.stroke();
        }
      });
    };

    renderStars();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMobile, reducedMotion, isLoaded]);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-10"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="absolute inset-0 z-20">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: isMobile
              ? gradientBackgrounds.nebula
              : `
              ${gradientBackgrounds.nebula},
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(255,255,255,0.002) 1px,
                rgba(255,255,255,0.002) 2px
              )
            `,
            filter: isMobile ? "none" : "blur(1px)",
            transform: "translateZ(0)",
            willChange: "auto",
            backgroundAttachment: "fixed",
          }}
        />

        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        >
          <canvas
            ref={starCanvasRef}
            className="absolute inset-0 w-full h-full"
            style={{
              transform: "translateZ(0)",
              willChange: "auto",
            }}
          />
        </motion.div>

        {isLoaded && !isMobile && (
          <motion.div
            className="absolute top-0 left-0 w-[40rem] h-[25rem]"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.10) 30%, rgba(37, 99, 235, 0.05) 50%, rgba(37, 99, 235, 0.02) 70%, transparent 90%)",
              filter: "blur(40px)",
              transform: "translateZ(0)",
              willChange: "opacity, transform",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.08, 0.15, 0.08],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {isLoaded && !isMobile && (
          <motion.div
            className="absolute top-1/3 right-0 w-[35rem] h-[30rem]"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 70% 50%, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 25%, rgba(168, 85, 247, 0.08) 40%, rgba(168, 85, 247, 0.04) 60%, rgba(168, 85, 247, 0.02) 80%, transparent 95%)",
              filter: "blur(50px)",
              transform: "translateZ(0)",
              willChange: "opacity, transform",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.06, 0.1, 0.06],
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

        {isLoaded && !isMobile && (
          <motion.div
            className="absolute bottom-0 left-1/4 w-[50rem] h-[20rem]"
            style={{
              background:
                "radial-gradient(ellipse 80% 40% at 50% 80%, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.08) 30%, rgba(37, 99, 235, 0.08) 50%, rgba(37, 99, 235, 0.04) 70%, rgba(37, 99, 235, 0.02) 85%, transparent 100%)",
              filter: "blur(45px)",
              transform: "translateZ(0)",
              willChange: "opacity, transform",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.05, 0.09, 0.05],
              x: [0, "5vw", 0],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10,
            }}
          />
        )}
      </div>

      {isLoaded && !isMobile && (
        <svg
          className="absolute inset-0 w-full h-full opacity-8"
          style={{ transform: "translateZ(0)" }}
        >
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

      {isLoaded && !reducedMotion && (
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
                boxShadow: `0 0 ${particle.size * 1.5}px rgba(255, 255, 255, ${
                  particle.opacity * 0.6
                })`,
                transform: "translateZ(0)",
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

      {isLoaded && !isMobile && (
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
}
