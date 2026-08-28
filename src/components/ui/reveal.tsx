import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number;
}

/**
 * Fades content up once it scrolls into view, replacing framer-motion's
 * `whileInView`. Toggles a data attribute rather than state so there is no
 * re-render and no hydration mismatch against the prerendered markup.
 */
export function Reveal({ children, className, threshold = 0.15 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => {
      node.dataset.visible = "true";
    };

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 translate-y-5 transition-[opacity,transform] duration-500 ease-out",
        "data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0",
        "motion-reduce:transition-none",
        className
      )}
    >
      {children}
    </div>
  );
}
