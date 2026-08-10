"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
interface MagicLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

function pseudoRandom(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

export function MagicLink({
  href,
  children,
  className = "",
  external = false,
}: MagicLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const particles = Array.from({ length: 24 }).map((_, index) => {
    const random = (offset: number) => pseudoRandom(index * 7 + offset);
    const edge = Math.floor(random(1) * 4);

    let startX = "10%";
    let startY = "10%";
    let angle = 0;

    switch (edge) {
      case 0:
        startX = `${random(2) * 100}%`;
        startY = "0%";
        angle = random(3) * 60 - 30; // -30 to 30 degrees
        break;
      case 1:
        startX = "100%";
        startY = `${random(2) * 100}%`;
        angle = random(3) * 60 + 150; // 150 to 210 degrees
        break;
      case 2:
        startX = `${random(2) * 100}%`;
        startY = "100%";
        angle = random(3) * 60 + 330; // 330 to 390 degrees
        break;
      case 3:
        startX = "0%";
        startY = `${random(2) * 100}%`;
        angle = random(3) * 60 + 30; // 30 to 90 degrees
        break;
    }

    return {
      startX,
      startY,
      angle,
      length: random(4) * 20 + 10,
      delay: random(5) * 0.2,
      duration: random(6) * 0.3 + 0.3,
    };
  });

  const LinkComponent = external ? "a" : Link;
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <span className="relative inline-block">
      <LinkComponent
        href={href}
        ref={linkRef}
        className={`relative inline-block ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...externalProps}
      >
        <span className="relative z-10 magic">{children}</span>

        <span className="absolute -inset-4 overflow-hidden pointer-events-none">
          {isHovered &&
            particles.map((particle, index) => (
              <motion.span
                key={index}
                className="absolute bg-current"
                style={{
                  width: particle.length,
                  height: "4px",
                  left: particle.startX,
                  top: particle.startY,
                  rotate: `${particle.angle}deg`,
                  originX: 0,
                  originY: 0.5,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: 1,
                  opacity: 0,
                  x: Math.cos((particle.angle * Math.PI) / 180) * 50,
                  y: Math.sin((particle.angle * Math.PI) / 180) * 50,
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "easeOut",
                }}
              />
            ))}
        </span>
      </LinkComponent>
    </span>
  );
}
