"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  trail: { x: number; y: number }[];
}

export const SparklesCore = ({
  background,
  minSize = 0.5,
  maxSize = 2,
  particleDensity = 50,
  className,
  particleColor = "#FFD700",
  particleGlow = true,
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  particleGlow?: boolean;
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
      for (let i = 0; i < particleDensity; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          opacity: Math.random(),
          trail: Array(3).fill({ x, y }),
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 3) {
          particle.trail.shift();
        }

        // Draw trail
        ctx.beginPath();
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
        for (let i = 1; i < particle.trail.length; i++) {
          ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
        }
        ctx.strokeStyle = particleColor;
        ctx.lineWidth = particle.size / 2;
        ctx.globalAlpha = particle.opacity * 0.3;
        ctx.stroke();

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = particle.opacity;
        if (particleGlow) {
          ctx.shadowBlur = particle.size * 2;
          ctx.shadowColor = particleColor;
        }
        ctx.fill();

        // Update position with smooth movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity = Math.sin(Date.now() * 0.003) * 0.3 + 0.7;

        // Bounce off edges with damping
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -0.9;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -0.9;
        }
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
  }, [maxSize, minSize, particleColor, particleDensity, particleGlow]);

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
