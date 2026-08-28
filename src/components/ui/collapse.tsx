import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CollapseProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Animates to content height without measuring it, by transitioning a grid
 * row between 0fr and 1fr. Replaces framer-motion's `height: auto` trick.
 */
export function Collapse({ open, children, className }: CollapseProps) {
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
