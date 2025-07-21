"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Meteor {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  tailLength: number;
  opacity: number;
  active: boolean;
  delay: number;
  life: number;
  maxLife: number;
}

interface MeteorShowerProps {
  className?: string;
  meteorCount?: number;
  meteorFrequency?: { min: number; max: number };
  maxSimultaneousMeteors?: number;
}

export const MeteorShowerEffect = ({ 
  className,
  meteorCount = 3,
  meteorFrequency = { min: 3000, max: 7000 },
  maxSimultaneousMeteors = 1,
}: MeteorShowerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meteorsRef = useRef<Meteor[]>([]);
  const animationIdRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const startTimeRef = useRef(0);
  const activeMeteorCountRef = useRef(0);

  const createMeteors = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    meteorsRef.current = [];
    activeMeteorCountRef.current = 0;

    for (let i = 0; i < meteorCount; i++) {
      const delay = i === 0 ? 500 : Math.random() * 8000 + 2000; // Random timing, but ensure meteors every 2-10 seconds
      
      // Random angle between 20-50 degrees for natural diagonal fall
      const angleRad = (20 + Math.random() * 30) * (Math.PI / 180);
      
      // Moderate speed for smooth movement
      const speed = 8 + Math.random() * 12;
      
      // Realistic meteor head size
      const size = 1.5 + Math.random() * 2.5;
      
      // Realistic tail length based on speed
      const tailLen = speed * 15 + Math.random() * 150;

      // Start from random position above and to the left of screen
      const startX = Math.random() * canvas.width * 1.2 - canvas.width * 0.2;
      const startY = -100 - Math.random() * 150;

      // Calculate max life based on screen diagonal
      const diagonalDistance = Math.sqrt(
        Math.pow(canvas.width + 200, 2) + Math.pow(canvas.height + 200, 2)
      );
      const maxLife = diagonalDistance / speed;

      meteorsRef.current.push({
        x: startX,
        y: startY,
        size,
        speed,
        angle: angleRad,
        tailLength: tailLen,
        opacity: 0.8 + Math.random() * 0.2,
        active: false, // All meteors start inactive
        delay,
        life: 0,
        maxLife,
      });
    }
  }, [meteorCount, meteorFrequency]);

  const animate = useCallback((currentTime: number) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const deltaTime = currentTime - lastTimeRef.current;
    if (deltaTime < 16) { // 60 FPS
      animationIdRef.current = requestAnimationFrame(animate);
      return;
    }
    lastTimeRef.current = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const elapsedTime = currentTime - startTimeRef.current;

    // Activate meteors based on delay
    if (activeMeteorCountRef.current < maxSimultaneousMeteors) {
      for (const meteor of meteorsRef.current) {
        if (!meteor.active && elapsedTime > meteor.delay) {
          meteor.active = true;
          meteor.life = 0;
          activeMeteorCountRef.current++;
          break;
        }
      }
    }

    // Draw active meteors
    meteorsRef.current.forEach((meteor) => {
      if (!meteor.active) return;

      meteor.life++;
      meteor.x += Math.cos(meteor.angle) * meteor.speed;
      meteor.y += Math.sin(meteor.angle) * meteor.speed;

      // Calculate realistic fading as meteor travels
      const progress = meteor.life / meteor.maxLife;
      let intensity = 1;
      
      // Fade in quickly at start
      if (progress < 0.05) {
        intensity = progress / 0.05;
      }
      // Maintain brightness in middle
      else if (progress < 0.6) {
        intensity = 1;
      }
      // Gradual fade out
      else if (progress < 0.9) {
        intensity = 1 - (progress - 0.6) / 0.3 * 0.7;
      }
      // Quick final fade
      else {
        intensity = Math.max(0, (1 - progress) / 0.1 * 0.3);
      }

      const currentOpacity = meteor.opacity * intensity;
      
      // Additional distance-based fading for realism
      const distanceTraveled = meteor.life * meteor.speed;
      const distanceFade = Math.max(0.3, 1 - (distanceTraveled / 800));
      const finalOpacity = currentOpacity * distanceFade;
      
      // Reset meteor if it's faded out or off screen
      if (finalOpacity < 0.01 || meteor.x > canvas.width + 150 || meteor.y > canvas.height + 150) {
        meteor.active = false;
        activeMeteorCountRef.current--;

        // Reset for next appearance
        meteor.x = Math.random() * canvas.width * 1.2 - canvas.width * 0.2;
        meteor.y = -100 - Math.random() * 150;
        meteor.delay = elapsedTime + Math.random() * 6000 + 2000; // 2-8 seconds for next meteor
        meteor.life = 0;
        return;
      }

      ctx.save();

      // Draw realistic narrowing tail
      const tailLen = meteor.tailLength * intensity;
      const tailStartX = meteor.x - Math.cos(meteor.angle) * tailLen;
      const tailStartY = meteor.y - Math.sin(meteor.angle) * tailLen;

      // Create multiple segments for narrowing effect
      const segments = 20;
      for (let i = 0; i < segments; i++) {
        const segmentProgress = i / segments;
        const nextSegmentProgress = (i + 1) / segments;
        
        const x1 = meteor.x - Math.cos(meteor.angle) * tailLen * segmentProgress;
        const y1 = meteor.y - Math.sin(meteor.angle) * tailLen * segmentProgress;
        const x2 = meteor.x - Math.cos(meteor.angle) * tailLen * nextSegmentProgress;
        const y2 = meteor.y - Math.sin(meteor.angle) * tailLen * nextSegmentProgress;
        
        // Linearly decrease width from head to tail
        const widthAtSegment = meteor.size * (1 - segmentProgress * 0.9); // Keep 10% width at end
        
        // Fade opacity along the tail
        const opacityAtSegment = finalOpacity * (1 - segmentProgress * 0.8);
        
        if (widthAtSegment > 0.1 && opacityAtSegment > 0.01) {
          const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacityAtSegment})`);
          gradient.addColorStop(1, `rgba(200, 230, 255, ${opacityAtSegment * 0.7})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = widthAtSegment;
          ctx.lineCap = "round";
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // Draw realistic meteor head (ball)
      const headRadius = meteor.size;
      
      // Outer atmospheric glow
      const outerGlow = ctx.createRadialGradient(
        meteor.x, meteor.y, 0,
        meteor.x, meteor.y, headRadius * 6
      );
      
      outerGlow.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity * 0.3})`);
      outerGlow.addColorStop(0.3, `rgba(200, 230, 255, ${finalOpacity * 0.2})`);
      outerGlow.addColorStop(0.6, `rgba(150, 200, 255, ${finalOpacity * 0.1})`);
      outerGlow.addColorStop(1, `rgba(100, 150, 255, 0)`);
      
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(meteor.x, meteor.y, headRadius * 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner bright glow
      const innerGlow = ctx.createRadialGradient(
        meteor.x, meteor.y, 0,
        meteor.x, meteor.y, headRadius * 2.5
      );
      
      innerGlow.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity * 0.8})`);
      innerGlow.addColorStop(0.5, `rgba(255, 240, 200, ${finalOpacity * 0.4})`);
      innerGlow.addColorStop(1, `rgba(200, 220, 255, 0)`);
      
      ctx.fillStyle = innerGlow;
      ctx.beginPath();
      ctx.arc(meteor.x, meteor.y, headRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Solid meteor ball core
      const coreGradient = ctx.createRadialGradient(
        meteor.x - headRadius * 0.3, meteor.y - headRadius * 0.3, 0,
        meteor.x, meteor.y, headRadius
      );
      
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, finalOpacity * 1.5)})`);
      coreGradient.addColorStop(0.7, `rgba(255, 240, 200, ${Math.min(1, finalOpacity * 1.2)})`);
      coreGradient.addColorStop(1, `rgba(200, 220, 255, ${Math.min(1, finalOpacity * 0.8)})`);
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(meteor.x, meteor.y, headRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    animationIdRef.current = requestAnimationFrame(animate);
  }, [maxSimultaneousMeteors, meteorFrequency]);

  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = (rect.width || window.innerWidth) * dpr;
    canvas.height = (rect.height || window.innerHeight) * dpr;
    canvas.style.width = `${rect.width || window.innerWidth}px`;
    canvas.style.height = `${rect.height || window.innerHeight}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    createMeteors();
  }, [createMeteors]);

  useEffect(() => {
    if (!canvasRef.current) return;

    startTimeRef.current = performance.now();
    handleResize();

    lastTimeRef.current = performance.now();
    animationIdRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [animate, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      style={{ pointerEvents: "none" }}
    />
  );
};