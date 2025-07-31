"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Meteor {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  tailLength: number;
  opacity: number;
  color: string;
  active: boolean;
  delay: number;
  fadeStart: number;
  life: number;
  maxLife: number;
  fadeOutDuration: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleAmount: number;
}

export const MeteorShowerEffect = ({
  background = "",
  meteorCount = 8,
  meteorSize = { min: 1, max: 3 },
  meteorSpeed = { min: 5, max: 15 },
  tailLength = { min: 100, max: 450 },
  angle = { min: 30, max: 60 },
  className,
  meteorColor = "#FFFFFF",
  meteorGlow = true,
  colorVariation = true,
  starCount = 40,
  showStars = true,
  meteorFrequency = { min: 5000, max: 15000 },
  maxSimultaneousMeteors = 2,
}: {
  background?: string;
  meteorCount?: number;
  meteorSize?: { min: number; max: number };
  meteorSpeed?: { min: number; max: number };
  tailLength?: { min: number; max: number };
  angle?: { min: number; max: number };
  className?: string;
  meteorColor?: string;
  meteorGlow?: boolean;
  colorVariation?: boolean;
  starCount?: number;
  showStars?: boolean;
  meteorFrequency?: { min: number; max: number };
  maxSimultaneousMeteors?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const meteors: Meteor[] = [];
    const stars: Star[] = [];
    let animationFrameId: number;
    let lastMeteorTime = Date.now();
    const startTime = Date.now();
    let activeMeteorCount = 0;

    const generateColor = () => {
      if (!colorVariation) return meteorColor;

      const baseColor = meteorColor.startsWith("#") ? meteorColor : "#FFFFFF";

      const r = parseInt(baseColor.slice(1, 3), 16);
      const g = parseInt(baseColor.slice(3, 5), 16);
      const b = parseInt(baseColor.slice(5, 7), 16);

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

      return `rgba(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(
        newB
      )}, 1)`;
    };

    const createMeteors = () => {
      meteors.length = 0;
      activeMeteorCount = 0;

      let initialDelay = 1000;

      for (let i = 0; i < meteorCount; i++) {
        const delay =
          initialDelay +
          Math.random() * (meteorFrequency.max - meteorFrequency.min) +
          meteorFrequency.min;
        createMeteor(false, delay);
        initialDelay = delay + meteorFrequency.min / 2;
      }
    };
    const createMeteor = (active = false, customDelay?: number) => {
      const angleRad =
        (Math.random() * (angle.max - angle.min) + angle.min) * (Math.PI / 180);
      const speed =
        Math.random() * (meteorSpeed.max - meteorSpeed.min) + meteorSpeed.min;
      const size =
        Math.random() * (meteorSize.max - meteorSize.min) + meteorSize.min;
      const tailLen =
        Math.random() * (tailLength.max - tailLength.min) + tailLength.min;

      const startPosition = Math.random();
      const startX = startPosition * canvas.width * 1.4 - canvas.width * 0.2;
      const startY = -150 - Math.random() * 100;

      const delay =
        customDelay !== undefined
          ? customDelay
          : Math.random() * (meteorFrequency.max - meteorFrequency.min) +
            meteorFrequency.min;

      const diagonalDistance = Math.sqrt(
        Math.pow(canvas.width + 400, 2) + Math.pow(canvas.height + 400, 2)
      );
      const travelTime = diagonalDistance / speed;
      const fadeOutDuration = Math.max(80, travelTime * 0.35);
      const maxLife = travelTime + fadeOutDuration;

      meteors.push({
        x: startX,
        y: startY,
        size,
        speed,
        angle: angleRad,
        tailLength: tailLen,
        opacity: 0.6 + Math.random() * 0.3,
        color: generateColor(),
        active,
        delay,
        fadeStart: travelTime * 0.7,
        life: 0,
        maxLife,
        fadeOutDuration,
      });

      if (active) activeMeteorCount++;
    };

    const createStars = () => {
      stars.length = 0;

      for (let i = 0; i < starCount; i++) {
        const brightness = Math.pow(Math.random(), 2);
        const size = 0.5 + brightness * 1.5;

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          opacity: 0.2 + brightness * 0.6,
          twinkleSpeed: Math.random() * 0.004 + 0.001,
          twinkleAmount: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const drawBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (showStars) {
        const currentTime = Date.now();

        stars.forEach((star) => {
          const twinkle = Math.sin(currentTime * star.twinkleSpeed);
          const opacityVariation = twinkle * star.twinkleAmount;
          const opacity = Math.max(0.05, star.opacity * (1 + opacityVariation));

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Reduced star sparkle frequency
          if (star.size > 1.8 && Math.random() < 0.005) {
            const sparkleSize = star.size * 1.5;

            ctx.save();
            ctx.globalAlpha = opacity * 0.25;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
            ctx.lineWidth = 0.3;
            
            ctx.beginPath();
            ctx.moveTo(star.x - sparkleSize, star.y);
            ctx.lineTo(star.x + sparkleSize, star.y);
            ctx.moveTo(star.x, star.y - sparkleSize);
            ctx.lineTo(star.x, star.y + sparkleSize);
            ctx.stroke();
            ctx.restore();
          }
        });
      }
    };

    const checkMeteorActivation = () => {
      const currentTime = Date.now() - startTime;

      if (activeMeteorCount < maxSimultaneousMeteors) {
        for (let i = 0; i < meteors.length; i++) {
          const meteor = meteors[i];
          if (!meteor.active && currentTime > meteor.delay) {
            meteor.active = true;
            meteor.life = 0;
            activeMeteorCount++;
            break;
          }
        }
      }
    };

    const drawMeteors = () => {
      meteors.forEach((meteor, index) => {
        if (!meteor.active) return;

        meteor.life++;
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;

        let fadeProgress = 1;
        let entryProgress = 1;

        if (meteor.life > meteor.fadeStart) {
          const fadeLife = meteor.life - meteor.fadeStart;
          fadeProgress = Math.max(0, 1 - fadeLife / meteor.fadeOutDuration);
          fadeProgress = Math.pow(fadeProgress, 0.4);
        }

        if (meteor.life < 30) {
          entryProgress = meteor.life / 30;
          entryProgress = Math.pow(entryProgress, 0.3);
        }

        // Calculate travel fade - meteors fade as they travel across screen
        const travelDistance = Math.sqrt(
          Math.pow(
            meteor.x -
              (meteor.x - Math.cos(meteor.angle) * meteor.speed * meteor.life),
            2
          ) +
            Math.pow(
              meteor.y -
                (meteor.y -
                  Math.sin(meteor.angle) * meteor.speed * meteor.life),
              2
            )
        );
        const maxTravelDistance = Math.sqrt(
          Math.pow(canvas.width * 1.5, 2) + Math.pow(canvas.height * 1.5, 2)
        );
        const travelProgress = Math.min(
          1,
          travelDistance / (maxTravelDistance * 0.7)
        );
        const travelFade = Math.pow(1 - travelProgress, 0.6); // Gradual fade as meteor travels

        const atmosphereProgress = Math.min(
          1,
          Math.max(
            0.4, // Reduced minimum to allow more fading
            1 - Math.abs(meteor.x - canvas.width * 0.5) / (canvas.width * 0.5)
          )
        );

        const intensity =
          entryProgress * fadeProgress * atmosphereProgress * travelFade;

        const currentOpacity = meteor.opacity * intensity;
        const currentTailLength = meteor.tailLength * Math.max(0.3, intensity);
        const currentSize = meteor.size * Math.max(0.4, intensity);

        if (currentOpacity < 0.003 && fadeProgress < 0.05) {
          meteor.active = false;
          activeMeteorCount--;

          const delay =
            Date.now() -
            startTime +
            Math.random() * (meteorFrequency.max - meteorFrequency.min) +
            meteorFrequency.min;

          meteor.x = Math.random() * canvas.width * 1.4 - canvas.width * 0.2;
          meteor.y = -150 - Math.random() * 100;
          meteor.delay = delay;
          meteor.color = generateColor();
          meteor.life = 0;

          const diagonalDistance = Math.sqrt(
            Math.pow(canvas.width + 400, 2) + Math.pow(canvas.height + 400, 2)
          );
          const travelTime = diagonalDistance / meteor.speed;
          const fadeOutDuration = Math.max(80, travelTime * 0.35);
          meteor.maxLife = travelTime + fadeOutDuration;
          meteor.fadeStart = travelTime * 0.85;
          meteor.fadeOutDuration = fadeOutDuration;
          return;
        }

        if (currentOpacity < 0.003) return;

        const tailEndX = meteor.x - Math.cos(meteor.angle) * currentTailLength;
        const tailEndY = meteor.y - Math.sin(meteor.angle) * currentTailLength;

        ctx.save();

        // Further optimized meteor tail with even fewer segments
        const segments = 5; // Reduced from 8 for better performance
        const segmentLength = currentTailLength / segments;

        // Pre-calculate common values
        const cosAngle = Math.cos(meteor.angle);
        const sinAngle = Math.sin(meteor.angle);

        for (let i = 0; i < segments; i++) {
          const progress = i / segments;
          
          // Calculate positions for this segment
          const segmentStartX = meteor.x - cosAngle * segmentLength * i;
          const segmentStartY = meteor.y - sinAngle * segmentLength * i;
          const segmentEndX = meteor.x - cosAngle * segmentLength * (i + 1);
          const segmentEndY = meteor.y - sinAngle * segmentLength * (i + 1);

          // Simplified taper calculation
          const widthMultiplier = 1 - progress * 0.7;
          const segmentWidth = Math.max(0.4, currentSize * 1.8 * widthMultiplier);
          const segmentOpacity = currentOpacity * (1 - progress * 0.5);

          if (segmentOpacity < 0.03) continue;

          // Set stroke properties once per segment
          ctx.strokeStyle = meteor.color.replace("1)", `${segmentOpacity})`);
          ctx.lineWidth = segmentWidth;
          ctx.lineCap = "round";

          // Simplified glow effect - only for first 2 segments
          if (meteorGlow && i < 2 && segmentOpacity > 0.4) {
            ctx.shadowColor = meteor.color;
            ctx.shadowBlur = segmentWidth * 1.5;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.beginPath();
          ctx.moveTo(segmentStartX, segmentStartY);
          ctx.lineTo(segmentEndX, segmentEndY);
          ctx.stroke();
        }

        // Draw bright meteor head
        if (currentOpacity > 0.1) {
          // Reset shadow for head
          ctx.shadowBlur = 0;

          // Main bright core
          const headRadius = currentSize * 1.8;
          const headGradient = ctx.createRadialGradient(
            meteor.x,
            meteor.y,
            0,
            meteor.x,
            meteor.y,
            headRadius
          );

          const coreOpacity = Math.min(1, currentOpacity * 1.6);
          headGradient.addColorStop(0, `rgba(255, 255, 255, ${coreOpacity})`);
          headGradient.addColorStop(
            0.3,
            meteor.color.replace("1)", `${currentOpacity * 1.2})`)
          );
          headGradient.addColorStop(
            0.7,
            meteor.color.replace("1)", `${currentOpacity * 0.6})`)
          );
          headGradient.addColorStop(1, meteor.color.replace("1)", "0)"));

          ctx.fillStyle = headGradient;
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, headRadius, 0, Math.PI * 2);
          ctx.fill();

          // Add bright inner core
          if (currentOpacity > 0.4) {
            const coreRadius = currentSize * 0.8;
            const coreGradient = ctx.createRadialGradient(
              meteor.x,
              meteor.y,
              0,
              meteor.x,
              meteor.y,
              coreRadius
            );

            coreGradient.addColorStop(
              0,
              `rgba(255, 255, 255, ${Math.min(1, currentOpacity * 2)})`
            );
            coreGradient.addColorStop(
              0.5,
              `rgba(255, 255, 255, ${currentOpacity * 0.8})`
            );
            coreGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.fillStyle = coreGradient;
            ctx.beginPath();
            ctx.arc(meteor.x, meteor.y, coreRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Further reduced sparkle frequency
        if (Math.random() < 0.004 * currentOpacity && currentOpacity > 0.5) {
          const sparkleDistance = currentSize * 4;
          const sparkleAngle = Math.random() * Math.PI * 2;
          const sparkleX = meteor.x + Math.cos(sparkleAngle) * sparkleDistance;
          const sparkleY = meteor.y + Math.sin(sparkleAngle) * sparkleDistance;
          const sparkleSize = currentSize * 0.4;

          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });
    };

    let frameCount = 0;
    const render = () => {
      frameCount++;
      
      // Only draw background every 3rd frame for stars
      if (frameCount % 3 === 0) {
        drawBackground();
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      checkMeteorActivation();
      drawMeteors();
      animationFrameId = requestAnimationFrame(render);
    };

    const resizeHandler = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || window.innerWidth;
      canvas.height = rect.height || window.innerHeight;
      createStars();
      createMeteors();
    };

    resizeHandler();
    render();

    window.addEventListener("resize", resizeHandler);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [
    meteorCount,
    meteorColor,
    meteorGlow,
    colorVariation,
    starCount,
    showStars,
    maxSimultaneousMeteors,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        background: background,
      }}
      className={cn("w-full h-full", className)}
    />
  );
};
