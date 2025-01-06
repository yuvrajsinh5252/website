"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const SparklesCore = ({
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let animationFrameId: number;

    const createParticles = () => {
      const particleCount = particleDensity || 50;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size:
            Math.random() * ((maxSize || 2) - (minSize || 0.5)) +
            (minSize || 0.5),
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        ctx.fillStyle = particleColor || "#FFD700";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [maxSize, minSize, particleColor, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        background: background || "transparent",
      }}
      className={cn("w-full h-full", className)}
    />
  );
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}
