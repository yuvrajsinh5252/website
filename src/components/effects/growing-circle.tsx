"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const debounce = (callback: any, delay = 250) => {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay);
  };
};

const throttle = (callback: any, limit = 250) => {
  let wait = false;
  return () => {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
};

const COLORS = {
  white: "#FFFFFF",
  midnightBlack: "#18181B",
};

const RADIUS_GROWTH_PER_MS = 0.025;
const GROWTH_FUNCTION_EXPONENTIAL = 2.9;
const PIXEL_SCALING_FACTOR = 0.4;

const circleCenterCoordinates = {
  x: null,
  y: null,

  resetMouseState: () => {
    circleCenterCoordinates.x = null;
    circleCenterCoordinates.y = null;
  },
};

const m = {
  ctx: null as any,
  isDark: null as any,
  radiusMultiplier: null as any,
  maxRadiusMultiplier: null as any,
  timeAtPreviousDraw: null as any,
  height: null as any,
  width: null as any,

  createMachine: (ctx: any, isDark: any) => {
    m.ctx = ctx;
    m.isDark = isDark;
    m.height = Math.max(window.screen.height, window.innerHeight);
    m.width = Math.max(window.screen.width, window.innerWidth);
    m.maxRadiusMultiplier =
      Math.max(m.width, m.height) ** (1.0 / GROWTH_FUNCTION_EXPONENTIAL);
    m.timeAtPreviousDraw = Date.now();

    const { width, height } = m.ctx.canvas.getBoundingClientRect();
    if (m.ctx.canvas.width !== width || m.ctx.canvas.height !== height) {
      const { devicePixelRatio: originalRatio = 1 } = window;
      const lowerResolutionRatio = originalRatio * PIXEL_SCALING_FACTOR;
      m.ctx.canvas.width = width * lowerResolutionRatio;
      m.ctx.canvas.height = height * lowerResolutionRatio;
      m.ctx.scale(lowerResolutionRatio, lowerResolutionRatio);
    }

    if (
      circleCenterCoordinates.x == null ||
      circleCenterCoordinates.y == null
    ) {
      m.radiusMultiplier = isDark ? 0 : m.maxRadiusMultiplier;
    }

    return m.start;
  },
  start: () => (m.isDark ? m.shrinkCircle : m.growCircle),

  growCircle: () => {
    m.radiusMultiplier +=
      RADIUS_GROWTH_PER_MS * Math.max(1, Date.now() - m.timeAtPreviousDraw);
    return m.verifyCircleBounds;
  },

  shrinkCircle: () => {
    m.radiusMultiplier -=
      RADIUS_GROWTH_PER_MS * Math.max(1, Date.now() - m.timeAtPreviousDraw);
    return m.verifyCircleBounds;
  },

  verifyCircleBounds: () => {
    if (
      (m.radiusMultiplier <= 0 && m.isDark) ||
      (m.radiusMultiplier >= m.maxRadiusMultiplier && !m.isDark)
    ) {
      const gradient =
        m.width > 600
          ? m.ctx.createRadialGradient(m.width / 2, 0, 0, m.width / 2, 0, 0)
          : m.ctx.createRadialGradient(m.width, 0, 0, m.width, 0, 0);
      gradient.addColorStop(0, "#2d3748");
      gradient.addColorStop(1, "#000000");
      m.ctx.fillStyle = m.isDark ? gradient : COLORS.white;

      m.ctx.fillRect(0, 0, m.width, m.height);
      m.radiusMultiplier = m.isDark ? 0 : m.maxRadiusMultiplier;
      return null;
    }

    m.ctx.clearRect(0, 0, m.width, m.height);
    return m.drawCircle;
  },

  drawCircle: () => {
    m.ctx.fillStyle = COLORS.white;
    m.ctx.beginPath();
    m.ctx.arc(
      circleCenterCoordinates.x,
      circleCenterCoordinates.y,
      m.radiusMultiplier ** GROWTH_FUNCTION_EXPONENTIAL,
      0,
      2 * Math.PI
    );
    m.ctx.fill();

    m.timeAtPreviousDraw = Date.now();

    return new Promise((rtn) => {
      const returnAfterAnimating = () => {
        rtn(m.start);
      };
      window.requestAnimationFrame(returnAfterAnimating);
    });
  },
};

export function CircleAnimation() {
  const { resolvedTheme: theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    let stateMachine: any = m.createMachine(
      ctx,
      theme === "dark" ? true : false
    );
    let isStateMachinePowered = true;

    const stateMachineRunner = async () => {
      if (stateMachine !== null && isStateMachinePowered) {
        stateMachine = await stateMachine();
        stateMachineRunner();
      }
    };

    stateMachineRunner();

    const handleClick = (event: any) => {
      circleCenterCoordinates.x = event.detail.x;
      circleCenterCoordinates.y = event.detail.y;
    };

    const handleResize = () => {
      circleCenterCoordinates.resetMouseState();
      stateMachine = m.createMachine(ctx, theme === "dark" ? true : false);
      stateMachineRunner();
    };

    window.addEventListener("darkModeToggle", handleClick);
    window.addEventListener("resize", throttle(debounce(handleResize)), false);
    return () => {
      isStateMachinePowered = false;
      window.removeEventListener("darkModeToggle", handleClick);
      window.removeEventListener(
        "resize",
        throttle(debounce(handleResize)),
        false
      );
    };
  }, [theme]);

  return (
    <canvas
      className={`w-[100vw] h-[100vh] max-sm:w-[150vw] max-sm:h-[150vh] dark:bg-gradient-to-b dark:from-blue-700/15 dark:to-black sm:dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] fixed top-0 left-0 z-10`}
      ref={canvasRef}
    />
  );
}
