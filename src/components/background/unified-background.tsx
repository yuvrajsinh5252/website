"use client";

import { useEffect, useRef, useMemo } from "react";
import { MeteorShowerEffect } from "./meteorShower";

interface GradientCache {
  darkRadial?: CanvasGradient;
  darkLinear?: CanvasGradient;
  nebula: Map<string, CanvasGradient>;
}

const TARGET_FPS = 60;
const FRAME_TIME = 1000 / TARGET_FPS;
const MAX_CACHE_SIZE = 50;

export function UnifiedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastFrameTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const gradientCacheRef = useRef<GradientCache>({ nebula: new Map() });

  const nebulaColors = useMemo(
    () => [
      "rgba(138,43,226,0.5)",
      "rgba(75,0,130,0.5)",
      "rgba(147,51,234,0.5)",
    ],
    []
  );

  const getOrCreateGradient = useMemo(
    () =>
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
            gradient.addColorStop(0, "rgba(15,16,22,1)");
            gradient.addColorStop(0.4, "rgba(26,27,46,0.95)");
            gradient.addColorStop(1, "rgba(44,42,69,0.9)");
            cache.darkRadial = gradient;
            return gradient;

          case "darkLinear":
            if (cache.darkLinear) return cache.darkLinear;
            gradient = ctx.createLinearGradient(0, 0, 0, params[0]);
            gradient.addColorStop(0, "rgba(15,16,22,0.8)");
            gradient.addColorStop(0.5, "rgba(26,27,46,0.6)");
            gradient.addColorStop(1, "rgba(44,42,69,0.8)");
            cache.darkLinear = gradient;
            return gradient;

          case "nebula":
            const roundedX = Math.round(params[0] / 50) * 50;
            const roundedY = Math.round(params[1] / 50) * 50;
            const roundedRadius = Math.round(params[2] / 25) * 25;
            const key = `${roundedX}_${roundedY}_${roundedRadius}_${params[3]}`;

            if (cache.nebula.has(key)) return cache.nebula.get(key)!;

            if (cache.nebula.size >= MAX_CACHE_SIZE) {
              const entries = Array.from(cache.nebula.entries());
              cache.nebula.clear();
              entries
                .slice(-Math.floor(MAX_CACHE_SIZE / 2))
                .forEach(([k, v]) => {
                  cache.nebula.set(k, v);
                });
            }

            gradient = ctx.createRadialGradient(
              roundedX,
              roundedY,
              0,
              roundedX,
              roundedY,
              roundedRadius
            );
            const baseOpacity = parseFloat(
              params[3].match(/[\d\.]+\)$/)?.[0].slice(0, -1) || "0.06"
            );
            gradient.addColorStop(0, params[3]);
            gradient.addColorStop(
              0.05,
              params[3].replace(
                /[\d\.]+\)$/,
                (baseOpacity * 0.9).toFixed(3) + ")"
              )
            );
            gradient.addColorStop(
              0.15,
              params[3].replace(
                /[\d\.]+\)$/,
                (baseOpacity * 0.7).toFixed(3) + ")"
              )
            );
            gradient.addColorStop(
              0.35,
              params[3].replace(
                /[\d\.]+\)$/,
                (baseOpacity * 0.4).toFixed(3) + ")"
              )
            );
            gradient.addColorStop(
              0.55,
              params[3].replace(
                /[\d\.]+\)$/,
                (baseOpacity * 0.2).toFixed(3) + ")"
              )
            );
            gradient.addColorStop(
              0.75,
              params[3].replace(
                /[\d\.]+\)$/,
                (baseOpacity * 0.08).toFixed(3) + ")"
              )
            );
            gradient.addColorStop(
              0.9,
              params[3].replace(
                /[\d\.]+\)$/,
                (baseOpacity * 0.02).toFixed(3) + ")"
              )
            );
            gradient.addColorStop(1, "rgba(0,0,0,0)");
            cache.nebula.set(key, gradient);
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

    const nebulaClouds: Array<{
      centerX: number;
      centerY: number;
      width: number;
      height: number;
      rotation: number;
      opacity: number;
      color: string;
      baseSize: number;
      subClouds: Array<{
        offsetX: number;
        offsetY: number;
        size: number;
        opacity: number;
        scaleX: number;
        scaleY: number;
      }>;
    }> = [];

    const createOffscreenCanvas = (): CanvasRenderingContext2D | null => {
      if (!offscreenCanvasRef.current) {
        offscreenCanvasRef.current = document.createElement("canvas");
      }
      offscreenCanvasRef.current.width = canvas.width;
      offscreenCanvasRef.current.height = canvas.height;
      return offscreenCanvasRef.current.getContext("2d");
    };

    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < 60; i++) {
        const size = Math.random() * 1.8 + 0.8;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.003 + 0.0015,
          pulsePhase: Math.random() * Math.PI * 2,
          baseGlow: size > 1.2 ? size * 2 : 0,
          category: size < 1.2 ? "small" : size < 1.6 ? "medium" : "large",
        });
      }
    };

    const createNebula = () => {
      nebulaClouds.length = 0;
      for (let i = 0; i < 4; i++) {
        const subCloudCount = Math.floor(Math.random() * 3) + 6;
        const subClouds = [];
        const baseSize = Math.min(canvas.width, canvas.height) * 0.2;
        const cloudWidth = baseSize * (Math.random() * 0.8 + 1.2);
        const cloudHeight = baseSize * (Math.random() * 0.6 + 0.8);

        for (let j = 0; j < subCloudCount; j++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * baseSize * 0.7;
          subClouds.push({
            offsetX: Math.cos(angle) * distance,
            offsetY: Math.sin(angle) * distance * 0.6,
            size: Math.random() * baseSize * 0.4 + baseSize * 0.2,
            opacity: Math.random() * 0.4 + 0.2,
            scaleX: Math.random() * 0.8 + 0.8,
            scaleY: Math.random() * 0.6 + 0.6,
          });
        }

        nebulaClouds.push({
          centerX: Math.random() * canvas.width,
          centerY: Math.random() * canvas.height,
          width: cloudWidth,
          height: cloudHeight,
          rotation: Math.random() * Math.PI * 2,
          opacity: Math.random() * 0.3 + 0.4,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          baseSize,
          subClouds,
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
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      const time = frameCountRef.current * 0.001;

      nebulaClouds.forEach((cloud) => {
        ctx.save();
        ctx.translate(cloud.centerX, cloud.centerY);
        ctx.rotate(cloud.rotation);

        cloud.subClouds.forEach((subCloud, index) => {
          const sizes = [subCloud.size * 2.2, subCloud.size * 1.5];
          const alphas = [0.08, 0.12];

          sizes.forEach((size, layerIndex) => {
            ctx.save();
            ctx.scale(subCloud.scaleX, subCloud.scaleY);
            ctx.rotate(
              (subCloud.offsetX + subCloud.offsetY) * 0.0008 + time * 0.1
            );

            const tentacles = 8 + layerIndex * 2;
            const angleStep = (Math.PI * 2) / tentacles;

            for (let i = 0; i < tentacles; i++) {
              const angle = i * angleStep;
              const wavePhase = angle * 3 + time + index;
              const radius1 = Math.sin(wavePhase) * 0.3;
              const radius2 = Math.sin(wavePhase * 2.7) * 0.2;
              const totalRadius = 0.6 + radius1 + radius2;

              const tentacleLength = size * totalRadius * 0.9;
              const tentacleX =
                subCloud.offsetX / subCloud.scaleX +
                Math.cos(angle) * tentacleLength;
              const tentacleY =
                subCloud.offsetY / subCloud.scaleY +
                Math.sin(angle) * tentacleLength * 0.7;
              const tentacleSize =
                size * (0.35 + Math.sin(wavePhase * 2) * 0.15);

              const nebula = getOrCreateGradient(
                ctx,
                "nebula",
                tentacleX,
                tentacleY,
                tentacleSize,
                cloud.color
              );

              ctx.globalAlpha =
                cloud.opacity *
                subCloud.opacity *
                alphas[layerIndex] *
                totalRadius;
              ctx.fillStyle = nebula;
              ctx.beginPath();
              ctx.arc(tentacleX, tentacleY, tentacleSize, 0, Math.PI * 2);
              ctx.fill();
            }

            const coreNebula = getOrCreateGradient(
              ctx,
              "nebula",
              subCloud.offsetX / subCloud.scaleX,
              subCloud.offsetY / subCloud.scaleY,
              size * 0.7,
              cloud.color
            );
            ctx.globalAlpha =
              cloud.opacity * subCloud.opacity * alphas[layerIndex] * 1.2;
            ctx.fillStyle = coreNebula;
            ctx.beginPath();
            ctx.arc(
              subCloud.offsetX / subCloud.scaleX,
              subCloud.offsetY / subCloud.scaleY,
              size * 0.5,
              0,
              Math.PI * 2
            );
            ctx.fill();

            ctx.restore();
          });
        });

        ctx.restore();
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
      stars.forEach((star) => starsByCategory[star.category].push(star));

      starsByCategory.small.forEach((star) => {
        ctx.globalAlpha = star.opacity * 0.8;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      [...starsByCategory.medium, ...starsByCategory.large].forEach((star) => {
        ctx.globalAlpha = star.opacity * 0.9;

        if (star.category === "large" && star.baseGlow > 0) {
          ctx.shadowColor = `rgba(255,255,255,${star.opacity * 0.3})`;
          ctx.shadowBlur = star.baseGlow;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (star.category === "large") {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = `rgba(255,255,255,${star.opacity * 0.4})`;
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

    const setupCanvas = () => {
      createStars();
      createNebula();
      const offscreenCtx = createOffscreenCanvas();
      if (offscreenCtx) renderBackgroundToOffscreen(offscreenCtx);
    };

    setupCanvas();
    animationRef.current = requestAnimationFrame(animate);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if (
          oldWidth === 0 ||
          oldHeight === 0 ||
          stars.length === 0 ||
          nebulaClouds.length === 0
        ) {
          createStars();
          createNebula();
          gradientCacheRef.current = { nebula: new Map() };
          const offscreenCtx = createOffscreenCanvas();
          if (offscreenCtx) renderBackgroundToOffscreen(offscreenCtx);
          return;
        }

        const scaleX = canvas.width / oldWidth;
        const scaleY = canvas.height / oldHeight;

        stars.forEach((star) => {
          star.x *= scaleX;
          star.y *= scaleY;
        });

        const uniformScale = Math.min(scaleX, scaleY);
        nebulaClouds.forEach((cloud) => {
          cloud.centerX *= scaleX;
          cloud.centerY *= scaleY;
          cloud.width *= uniformScale;
          cloud.height *= uniformScale;
          cloud.baseSize *= uniformScale;

          cloud.subClouds.forEach((subCloud) => {
            subCloud.offsetX *= uniformScale;
            subCloud.offsetY *= uniformScale;
            subCloud.size *= uniformScale;
          });
        });

        gradientCacheRef.current = { nebula: new Map() };
        const offscreenCtx = createOffscreenCanvas();
        if (offscreenCtx) renderBackgroundToOffscreen(offscreenCtx);
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);

      gradientCacheRef.current = { nebula: new Map() };

      if (offscreenCanvasRef.current) {
        offscreenCanvasRef.current = null;
      }
    };
  }, [nebulaColors, getOrCreateGradient]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 h-full w-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(15,16,22,0.8) 0%, rgba(26,27,46,0.9) 50%, rgba(44,42,69,0.95) 100%)",
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
