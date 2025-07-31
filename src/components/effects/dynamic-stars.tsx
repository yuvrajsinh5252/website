"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  phase: number;
  twinkleSpeed: number;
  color: string;
}

interface DynamicStarsProps {
  starCount?: number;
  className?: string;
  opacity?: number;
}

export const DynamicStars = ({ 
  starCount = 30, 
  className,
  opacity = 1 
}: DynamicStarsProps) => {
  const starsRef = useRef<Star[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const generateStars = useCallback(() => {
    if (typeof window === "undefined") return;

    const adjustedCount = Math.min(starCount, Math.max(15, Math.floor(window.innerWidth / 50)));
    const newStars: Star[] = [];

    for (let i = 0; i < adjustedCount; i++) {
      // Create more varied brightness distribution for professional look
      const brightness = Math.pow(Math.random(), 2); // Fewer bright stars, more subtle ones
      const sizeRandom = Math.random();
      
      let size;
      if (sizeRandom < 0.8) {
        size = 0.6 + brightness * 1.0; // Mostly small, subtle stars
      } else if (sizeRandom < 0.95) {
        size = 1.2 + brightness * 1.5; // Some medium stars
      } else {
        size = 2.0 + brightness * 2.0; // Few larger accent stars
      }

      // Color variation for visual interest
      const colorRandom = Math.random();
      let color;
      if (colorRandom < 0.7) {
        color = "255,255,255"; // Pure white
      } else if (colorRandom < 0.85) {
        color = "200,220,255"; // Cool blue-white
      } else {
        color = "255,245,220"; // Warm white
      }

      // More subtle opacity range for portfolio
      const baseOpacity = 0.3 + brightness * 0.5;

      newStars.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: size,
        opacity: baseOpacity,
        baseOpacity: baseOpacity,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.005 + Math.random() * 0.008, // Slower, more gentle twinkling
        color: color,
      });
    }
    starsRef.current = newStars;
  }, [starCount]);

  const animateStars = useCallback((currentTime: number) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const deltaTime = currentTime - lastTimeRef.current;
    if (deltaTime < 16) {
      animationIdRef.current = requestAnimationFrame(animateStars);
      return;
    }
    lastTimeRef.current = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    starsRef.current.forEach((star) => {
      star.phase += star.twinkleSpeed;
      
      // Gentle twinkling effect
      const twinkle = Math.sin(star.phase) * 0.3 + Math.sin(star.phase * 1.7) * 0.15;
      const currentOpacity = Math.max(0.1, star.baseOpacity + twinkle) * opacity;

      // Draw stars with subtle glow for larger ones
      if (star.size > 1.5) {
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 1.8
        );
        gradient.addColorStop(0, `rgba(${star.color}, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(${star.color}, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${star.color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          star.x - star.size * 1.8,
          star.y - star.size * 1.8,
          star.size * 3.6,
          star.size * 3.6
        );
      } else {
        // Simple circle for smaller stars
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${currentOpacity})`;
        ctx.fill();
      }

      // Add bright core for the brightest stars only
      if (star.baseOpacity > 0.7 && star.size > 1.8) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8})`;
        ctx.fill();
      }
    });

    animationIdRef.current = requestAnimationFrame(animateStars);
  }, [opacity]);

  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    generateStars();
  }, [generateStars]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Use requestIdleCallback for better performance, fallback to setTimeout
    const initializeStars = () => {
      generateStars();

      if (canvasRef.current) {
        handleResize();
        // Delay animation start slightly to prevent initial hang
        setTimeout(() => {
          animationIdRef.current = requestAnimationFrame(animateStars);
        }, 16); // One frame delay
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(initializeStars, { timeout: 100 });
    } else {
      setTimeout(initializeStars, 0);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [generateStars, animateStars, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      style={{ pointerEvents: "none" }}
    />
  );
};