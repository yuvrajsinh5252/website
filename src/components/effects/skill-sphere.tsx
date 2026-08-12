"use client";

import React, { useRef, useMemo } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Skill } from "@/config/skills";
import { IconType } from "react-icons";

interface SkillSphereProps {
  skills: Skill[];
}

export function SkillSphere({ skills }: SkillSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pan state
  const isDragging = useRef(false);
  const startPan = useRef({ x: 0, y: 0 });
  const pan = useRef({ x: 0, y: 0 });
  
  // Spring animated values for smooth panning & momentum
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const animatedX = useSpring(0, springConfig);
  const animatedY = useSpring(0, springConfig);

  // Generate honeycomb layout
  const layout = useMemo(() => {
    const coords: Array<{ r: number; c: number; x: number; y: number; dist: number }> = [];
    const GRID_SIZE = 6;
    for (let r = -GRID_SIZE; r <= GRID_SIZE; r++) {
      for (let c = -GRID_SIZE; c <= GRID_SIZE; c++) {
        // Pointy-topped hex stagger
        const x = c + (Math.abs(r) % 2 === 1 ? 0.5 : 0);
        const y = r * 0.866;
        // Use an elliptical distance to generate a wider layout of 17 items
        coords.push({ r, c, x, y, dist: Math.sqrt((x * 0.55) * (x * 0.55) + y * y) });
      }
    }
    coords.sort((a, b) => a.dist - b.dist);
    
    // Assign skills to the closest coords
    return skills.map((skill, i) => {
      return {
        skill,
        baseX: coords[i].x,
        baseY: coords[i].y,
      };
    });
  }, [skills]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startPan.current = {
      x: e.clientX - pan.current.x,
      y: e.clientY - pan.current.y,
    };
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    
    let newX = e.clientX - startPan.current.x;
    let newY = e.clientY - startPan.current.y;

    // Optional bounds to prevent scrolling out into the abyss
    const maxPan = 200;
    const distance = Math.sqrt(newX * newX + newY * newY);
    if (distance > maxPan) {
      const angle = Math.atan2(newY, newX);
      newX = Math.cos(angle) * maxPan;
      newY = Math.sin(angle) * maxPan;
    }

    pan.current = { x: newX, y: newY };
    animatedX.set(newX);
    animatedY.set(newY);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
    // Snap back to center slightly if pushed too far
    const currentX = pan.current.x;
    const currentY = pan.current.y;
    const distance = Math.sqrt(currentX * currentX + currentY * currentY);
    const softLimit = 100;
    
    if (distance > softLimit) {
      const angle = Math.atan2(currentY, currentX);
      const snapX = Math.cos(angle) * softLimit;
      const snapY = Math.sin(angle) * softLimit;
      pan.current = { x: snapX, y: snapY };
      animatedX.set(snapX);
      animatedY.set(snapY);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[220px] lg:min-h-0 overflow-hidden cursor-grab touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        {layout.map((item) => {
          return (
            <SkillItem
              key={item.skill.name}
              item={item}
              animatedX={animatedX}
              animatedY={animatedY}
            />
          );
        })}
      </div>
    </div>
  );
}

// Extracted into a sub-component so each item can have its own useTransforms
function SkillItem({ item, animatedX, animatedY }: { item: any; animatedX: any; animatedY: any }) {
  // Spacing for circular icons
  const SPACING = 60; 
  const MAX_RADIUS = 135;

  const x = useTransform(animatedX, (val: number) => item.baseX * SPACING + val);
  const y = useTransform(animatedY, (val: number) => item.baseY * SPACING + val);

  const scale = useTransform(() => {
    const absX = x.get();
    const absY = y.get();
    // Elliptical fading mask tightly fitted to the rectangle boundaries
    const dist = Math.sqrt((absX * 0.45) * (absX * 0.45) + absY * absY);
    
    const innerRadius = MAX_RADIUS * 0.4;
    let s = 1;
    if (dist > innerRadius) {
      s = 1 - ((dist - innerRadius) / (MAX_RADIUS - innerRadius)) * 1;
    }
    return Math.max(0, s);
  });

  const opacity = useTransform(() => {
    const absX = x.get();
    const absY = y.get();
    const dist = Math.sqrt((absX * 0.45) * (absX * 0.45) + absY * absY);
    
    const innerRadius = MAX_RADIUS * 0.4;
    let o = 1;
    if (dist > innerRadius) {
      o = 1 - ((dist - innerRadius) / (MAX_RADIUS - innerRadius)) * 1;
    }
    return Math.max(0, o);
  });

  const zIndex = useTransform(scale, (s: number) => Math.round(s * 100));
  const pointerEvents = useTransform(opacity, (o: number) => o < 0.2 ? "none" : "auto");
  
  const Icon = item.skill.icon;

  return (
    <motion.a
      href={item.skill.url}
      target="_blank"
      rel="noreferrer"
      className={`absolute flex flex-col items-center justify-center w-[48px] h-[48px] bg-gradient-to-br ${item.skill.color} border ${item.skill.border} rounded-full text-white/90 hover:text-white transition-colors duration-150 group`}
      style={{
        x: useTransform(x, (val) => `calc(-50% + ${val}px)`),
        y: useTransform(y, (val) => `calc(-50% + ${val}px)`),
        scale,
        opacity,
        zIndex,
        pointerEvents,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
      draggable={false}
      aria-label={`Learn more about ${item.skill.name}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {/* Optional: Add a small tooltip or visually hidden text for accessibility */}
      <span className="sr-only">{item.skill.name}</span>
    </motion.a>
  );
}
