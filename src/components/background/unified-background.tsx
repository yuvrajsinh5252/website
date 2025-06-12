"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { MeteorShowerEffect } from "./meteorShower";

interface GradientCache {
  darkRadial?: CanvasGradient;
  darkLinear?: CanvasGradient;
  nebula: Map<string, CanvasGradient>;
  starGlow?: CanvasGradient;
}

const TARGET_FPS = 60;
const FRAME_TIME = 1000 / TARGET_FPS;
const NEBULA_UPDATE_INTERVAL = 3;

export function UnifiedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastFrameTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const gradientCacheRef = useRef<GradientCache>({ nebula: new Map() });

  const nebulaColors = useMemo(
    () => [
      "rgba(138, 43, 226, 0.03)",
      "rgba(75, 0, 130, 0.02)",
      "rgba(106, 90, 205, 0.025)",
    ],
    []
  );

  const getOrCreateGradient = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      type: string,
      ...params: any[]
    ): CanvasGradient => {
      const cache = gradientCacheRef.current;

      let gradient: CanvasGradient;

      switch (type) {
        case "darkRadial":
          if (cache.darkRadial) return cache.darkRadial;
          gradient = ctx.createRadialGradient(
            params[0],
            params[1],
            0,
            params[0],
            params[1],
            params[2]
          );
          gradient.addColorStop(0, "rgba(15, 16, 22, 1)");
          gradient.addColorStop(0.4, "rgba(26, 27, 46, 0.95)");
          gradient.addColorStop(1, "rgba(44, 42, 69, 0.9)");
          cache.darkRadial = gradient;
          return gradient;

        case "darkLinear":
          if (cache.darkLinear) return cache.darkLinear;
          gradient = ctx.createLinearGradient(0, 0, 0, params[0]);
          gradient.addColorStop(0, "rgba(15, 16, 22, 0.8)");
          gradient.addColorStop(0.5, "rgba(26, 27, 46, 0.6)");
          gradient.addColorStop(1, "rgba(44, 42, 69, 0.8)");
          cache.darkLinear = gradient;
          return gradient;

        case "nebula":
          const nebulaKey = `${params[0]}_${params[1]}_${params[2]}`;
          if (cache.nebula.has(nebulaKey)) {
            return cache.nebula.get(nebulaKey)!;
          }
          gradient = ctx.createRadialGradient(
            params[0],
            params[1],
            0,
            params[0],
            params[1],
            params[2]
          );
          gradient.addColorStop(0, params[3]);
          gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          cache.nebula.set(nebulaKey, gradient);
          return gradient;

        default:
          throw new Error(`Unknown gradient type: ${type}`);
      }
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createOffscreenCanvas = (): CanvasRenderingContext2D | null => {
      if (!offscreenCanvasRef.current) {
        offscreenCanvasRef.current = document.createElement("canvas");
      }
      offscreenCanvasRef.current.width = canvas.width;
      offscreenCanvasRef.current.height = canvas.height;
      return offscreenCanvasRef.current.getContext("2d");
    };

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      pulsePhase: number;
      baseGlow: number;
      category: "small" | "medium" | "large";
    }> = [];

    const nebulaParticles: Array<{
      x: number;
      y: number;
      size: number;
      drift: number;
      driftSpeed: number;
      opacity: number;
      color: string;
      driftAmplitude: number;
    }> = [];

    const setupCanvas = () => {
      createStars();
      createNebula();
      const offscreenCtx = createOffscreenCanvas();
      if (offscreenCtx) {
        renderBackgroundToOffscreen(offscreenCtx);
      }
    };

    const createStars = () => {
      stars.length = 0;
      const starCount = 60;

      for (let i = 0; i < starCount; i++) {
        const size = Math.random() * 1.8 + 0.8;
        const category: "small" | "medium" | "large" =
          size < 1.2 ? "small" : size < 1.6 ? "medium" : "large";

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.003 + 0.0015,
          pulsePhase: Math.random() * Math.PI * 2,
          baseGlow: size > 1.2 ? size * 2 : 0,
          category,
        });
      }
    };

    const createNebula = () => {
      nebulaParticles.length = 0;
      const particleCount = 40;

      for (let i = 0; i < particleCount; i++) {
        nebulaParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 120 + 80,
          drift: Math.random() * Math.PI * 2,
          driftSpeed: Math.random() * 0.0008 + 0.0002,
          opacity: Math.random() * 0.6 + 0.2,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          driftAmplitude: Math.random() * 30 + 20,
        });
      }
    };

    const renderBackgroundToOffscreen = (
      offscreenCtx: CanvasRenderingContext2D
    ) => {
      if (!offscreenCanvasRef.current) return;

      offscreenCtx.clearRect(
        0,
        0,
        offscreenCanvasRef.current.width,
        offscreenCanvasRef.current.height
      );

      const darkRadial = getOrCreateGradient(
        offscreenCtx,
        "darkRadial",
        canvas.width * 0.3,
        canvas.height * 0.2,
        canvas.width * 0.8
      );
      const darkLinear = getOrCreateGradient(
        offscreenCtx,
        "darkLinear",
        canvas.height
      );

      offscreenCtx.fillStyle = darkRadial;
      offscreenCtx.fillRect(
        0,
        0,
        offscreenCanvasRef.current.width,
        offscreenCanvasRef.current.height
      );

      offscreenCtx.globalCompositeOperation = "multiply";
      offscreenCtx.fillStyle = darkLinear;
      offscreenCtx.fillRect(
        0,
        0,
        offscreenCanvasRef.current.width,
        offscreenCanvasRef.current.height
      );
      offscreenCtx.globalCompositeOperation = "source-over";
    };

    const drawBackground = () => {
      if (offscreenCanvasRef.current) {
        ctx.drawImage(offscreenCanvasRef.current, 0, 0);
      }
    };

    const drawNebula = () => {
      if (frameCountRef.current % NEBULA_UPDATE_INTERVAL !== 0) return;

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      nebulaParticles.forEach((particle) => {
        particle.drift += particle.driftSpeed;
        particle.x += Math.sin(particle.drift) * particle.driftAmplitude * 0.01;
        particle.y +=
          Math.cos(particle.drift) * particle.driftAmplitude * 0.005;

        if (particle.x < -particle.size)
          particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size)
          particle.x = -particle.size;
        if (particle.y < -particle.size)
          particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size)
          particle.y = -particle.size;

        const nebula = getOrCreateGradient(
          ctx,
          "nebula",
          particle.x,
          particle.y,
          particle.size,
          particle.color
        );

        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = nebula;
        ctx.fillRect(
          particle.x - particle.size,
          particle.y - particle.size,
          particle.size * 2,
          particle.size * 2
        );
      });

      ctx.restore();
    };

    const drawStars = () => {
      ctx.save();
      ctx.fillStyle = "white";

      const starsByCategory = {
        small: [] as typeof stars,
        medium: [] as typeof stars,
        large: [] as typeof stars,
      };

      stars.forEach((star) => {
        starsByCategory[star.category].push(star);
      });

      starsByCategory.small.forEach((star) => {
        ctx.globalAlpha = star.opacity * 0.8;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      [...starsByCategory.medium, ...starsByCategory.large].forEach((star) => {
        ctx.globalAlpha = star.opacity * 0.9;

        if (star.category === "large" && star.baseGlow > 0) {
          ctx.shadowColor = `rgba(255, 255, 255, ${star.opacity * 0.3})`;
          ctx.shadowBlur = star.baseGlow;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (star.category === "large") {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 1.5, star.y);
          ctx.lineTo(star.x + star.size * 1.5, star.y);
          ctx.moveTo(star.x, star.y - star.size * 1.5);
          ctx.lineTo(star.x, star.y + star.size * 1.5);
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
      });

      ctx.restore();
    };

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTimeRef.current;

      if (deltaTime < FRAME_TIME) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTimeRef.current = currentTime;
      frameCountRef.current++;

      drawBackground();
      drawNebula();
      drawStars();
      animationRef.current = requestAnimationFrame(animate);
    };

    setupCanvas();
    animationRef.current = requestAnimationFrame(animate);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createStars();
        createNebula();
        gradientCacheRef.current = { nebula: new Map() };

        const offscreenCtx = createOffscreenCanvas();
        if (offscreenCtx) {
          renderBackgroundToOffscreen(offscreenCtx);
        }
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [nebulaColors, getOrCreateGradient]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 h-full w-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(15, 16, 22, 0.8) 0%, rgba(26, 27, 46, 0.9) 50%, rgba(44, 42, 69, 0.95) 100%)",
        }}
      />
      <MeteorShowerEffect
        className="fixed inset-0 -z-10 h-full w-full"
        background="transparent"
        meteorCount={6}
        meteorSize={{ min: 1, max: 2.5 }}
        meteorSpeed={{ min: 4, max: 12 }}
        tailLength={{ min: 80, max: 300 }}
        meteorColor="#FFFFFF"
        meteorGlow={true}
        colorVariation={true}
        showStars={false}
        meteorFrequency={{ min: 3000, max: 8000 }}
        maxSimultaneousMeteors={3}
      />
    </>
  );
}
