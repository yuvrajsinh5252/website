
"use client"
import { useRef } from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

export default function Tooltip({
  children,
  text,
}: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative group">
      {children}
      <span ref={tooltipRef} className="absolute hidden group-hover:block bg-slate-600 p-[3px] text-[10px] rounded-md -left-[45%] animate-popout -bottom-10">
        {text}
      </span>
    </div>
  );
}