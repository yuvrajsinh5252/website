"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";

interface CursorState {
  isVisible: boolean;
  isExpanded: boolean;
  hoveredElement: DOMRect | null;
  borderRadius: string;
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isVisible: false,
    isExpanded: false,
    hoveredElement: null,
    borderRadius: "50%",
  });

  const hoveredElementRef = useRef<Element | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = {
    damping: 30,
    stiffness: 800,
    mass: 0.2,
    restDelta: 0.001,
  };

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const updateCursorFromElement = useCallback(
    (element: Element) => {
      const rect = element.getBoundingClientRect();
      const borderRadius =
        window.getComputedStyle(element).borderRadius || "8px";

      cursorX.set(rect.left + rect.width / 2);
      cursorY.set(rect.top + rect.height / 2);

      setCursorState((prev) => ({
        ...prev,
        isExpanded: true,
        hoveredElement: rect,
        borderRadius,
      }));
    },
    [cursorX, cursorY]
  );

  const cleanupObservers = useCallback(() => {
    resizeObserverRef.current?.disconnect();
    mutationObserverRef.current?.disconnect();
  }, []);

  const setupObservers = useCallback(
    (element: Element) => {
      cleanupObservers();

      resizeObserverRef.current = new ResizeObserver((entries) => {
        const entry = entries.find(
          (entry) => entry.target === hoveredElementRef.current
        );
        if (entry) updateCursorFromElement(entry.target);
      });

      mutationObserverRef.current = new MutationObserver((mutations) => {
        const shouldUpdate = mutations.some(
          (mutation) =>
            (mutation.type === "attributes" &&
              ["class", "style"].includes(mutation.attributeName || "")) ||
            mutation.type === "childList"
        );

        if (shouldUpdate && hoveredElementRef.current) {
          setTimeout(() => {
            if (hoveredElementRef.current) {
              updateCursorFromElement(hoveredElementRef.current);
            }
          }, 10);
        }
      });

      resizeObserverRef.current.observe(element);
      mutationObserverRef.current.observe(element, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ["class", "style"],
      });
    },
    [cleanupObservers, updateCursorFromElement]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const expandElement = (e.target as HTMLElement).closest(".expand-cursor");

      if (expandElement) {
        hoveredElementRef.current = expandElement;
        updateCursorFromElement(expandElement);
        setupObservers(expandElement);
      } else {
        hoveredElementRef.current = null;
        cleanupObservers();
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        setCursorState((prev) => ({
          ...prev,
          isExpanded: false,
          hoveredElement: null,
          borderRadius: "50%",
        }));
      }

      setCursorState((prev) => ({ ...prev, isVisible: true }));
    };

    const handleClick = () => {
      if (hoveredElementRef.current) {
        setTimeout(() => {
          if (hoveredElementRef.current) {
            updateCursorFromElement(hoveredElementRef.current);
          }
        }, 50);
      }
    };

    const handleMouseLeave = () => {
      hoveredElementRef.current = null;
      cleanupObservers();
      setCursorState((prev) => ({ ...prev, isVisible: false }));
    };

    const handleMouseEnter = () => {
      setCursorState((prev) => ({ ...prev, isVisible: true }));
    };

    const handleTouchStart = () => {
      setCursorState((prev) => ({ ...prev, isVisible: false }));
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("touchstart", handleTouchStart);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("touchstart", handleTouchStart);
      cleanupObservers();
    };
  }, [
    updateCursorFromElement,
    setupObservers,
    cleanupObservers,
    cursorX,
    cursorY,
  ]);

  const getCursorSize = () => {
    if (cursorState.isExpanded && cursorState.hoveredElement) {
      return {
        width: cursorState.hoveredElement.width,
        height: cursorState.hoveredElement.height,
      };
    }
    return { width: 12, height: 12 };
  };

  const cursorSize = getCursorSize();
  const { hoveredElement, isExpanded, borderRadius } = cursorState;

  return (
    <AnimatePresence mode="wait">
      {cursorState.isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            className="absolute will-change-transform"
            style={{
              border: "2px solid #3b82f6",
              backgroundColor: isExpanded
                ? "rgba(59, 130, 246, 0.08)"
                : "#3b82f6",
              borderRadius,
              mixBlendMode: "difference",
            }}
            animate={{
              ...cursorSize,
              x: isExpanded && hoveredElement ? -hoveredElement.width / 2 : -6,
              y: isExpanded && hoveredElement ? -hoveredElement.height / 2 : -6,
            }}
            transition={{
              type: "spring",
              damping: 35,
              stiffness: 900,
              mass: 0.1,
              restDelta: 0.001,
            }}
          />

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute will-change-transform"
                style={{
                  backgroundColor: "rgba(59, 130, 246, 0.04)",
                  borderRadius,
                  filter: "blur(1px)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  width: hoveredElement ? hoveredElement.width + 4 : 16,
                  height: hoveredElement ? hoveredElement.height + 4 : 16,
                  x: hoveredElement ? -(hoveredElement.width + 4) / 2 : -8,
                  y: hoveredElement ? -(hoveredElement.height + 4) / 2 : -8,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 600,
                  mass: 0.2,
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
