"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  trail: { x: number; y: number }[];
  color?: string;
}

export const SparklesCore = ({
  background,
  minSize = 0.5,
  maxSize = 2,
  particleDensity = 50,
  className,
  particleColor = "#FFD700",
  particleGlow = true,
  enableMouseInteraction = true,
  connectParticles = true,
  connectDistance = 100,
  colorVariation = true,
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  particleGlow?: boolean;
  enableMouseInteraction?: boolean;
  connectParticles?: boolean;
  connectDistance?: number;
  colorVariation?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let animationFrameId: number;

    // Generate color variants
    const generateColor = () => {
      if (!colorVariation) return particleColor;

      // Create color variations based on the base color
      const r = parseInt(particleColor.slice(1, 3), 16);
      const g = parseInt(particleColor.slice(3, 5), 16);
      const b = parseInt(particleColor.slice(5, 7), 16);

      const variance = 30;
      const newR = Math.min(
        255,
        Math.max(0, r + (Math.random() * variance * 2 - variance))
      );
      const newG = Math.min(
        255,
        Math.max(0, g + (Math.random() * variance * 2 - variance))
      );
      const newB = Math.min(
        255,
        Math.max(0, b + (Math.random() * variance * 2 - variance))
      );

      return `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(
        newB
      )})`;
    };

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
          color: generateColor(),
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between particles
      if (connectParticles) {
        particles.forEach((p1, i) => {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectDistance) {
              const opacity = 1 - distance / connectDistance;
              ctx.beginPath();
              ctx.strokeStyle = colorVariation
                ? `rgba(${parseInt(p1.color!.slice(4, 7))}, ${parseInt(
                    p1.color!.slice(9, 12)
                  )}, ${parseInt(p1.color!.slice(14, 17))}, ${opacity * 0.2})`
                : `rgba(255, 215, 0, ${opacity * 0.2})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      }

      particles.forEach((particle) => {
        const color = particle.color || particleColor;

        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 5) {
          particle.trail.shift();
        }

        // Draw trail with fade effect
        if (particle.trail.length > 1) {
          for (let i = 0; i < particle.trail.length - 1; i++) {
            const t1 = particle.trail[i];
            const t2 = particle.trail[i + 1];

            const gradient = ctx.createLinearGradient(t1.x, t1.y, t2.x, t2.y);
            const trailOpacity =
              particle.opacity * 0.3 * (i / particle.trail.length);

            gradient.addColorStop(0, `rgba(255, 215, 0, 0)`);
            gradient.addColorStop(1, `rgba(255, 215, 0, ${trailOpacity})`);

            ctx.beginPath();
            ctx.moveTo(t1.x, t1.y);
            ctx.lineTo(t2.x, t2.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = particle.size * (i / particle.trail.length);
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = particle.opacity;

        if (particleGlow) {
          ctx.shadowBlur = particle.size * 3;
          ctx.shadowColor = color;
        }

        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        // Apply mouse interaction
        if (enableMouseInteraction && mousePosition) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            particle.speedX += (dx / distance) * force * 0.02;
            particle.speedY += (dy / distance) * force * 0.02;
          }
        }

        // Add some random movement
        if (Math.random() < 0.05) {
          particle.speedX += (Math.random() - 0.5) * 0.2;
          particle.speedY += (Math.random() - 0.5) * 0.2;
        }

        // Apply velocity limits
        const maxSpeed = 2;
        particle.speedX = Math.max(
          -maxSpeed,
          Math.min(maxSpeed, particle.speedX)
        );
        particle.speedY = Math.max(
          -maxSpeed,
          Math.min(maxSpeed, particle.speedY)
        );

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Pulsating opacity
        particle.opacity =
          Math.sin(Date.now() * 0.003 + particle.x * 0.01) * 0.3 + 0.7;

        // Bounce off edges with damping
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener("resize", resizeCanvas);

    if (enableMouseInteraction) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (enableMouseInteraction) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }

      cancelAnimationFrame(animationFrameId);
    };
  }, [
    maxSize,
    minSize,
    particleColor,
    particleDensity,
    particleGlow,
    enableMouseInteraction,
    connectParticles,
    connectDistance,
    colorVariation,
  ]);

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
