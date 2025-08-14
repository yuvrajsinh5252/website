"use client";

import { useState } from "react";

export function ColorSwingBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group p-5 sm:p-6 rounded-xl bg-gray-800/40 backdrop-blur-xl hover:bg-blue-400/10 transition-colors duration-150 h-full relative overflow-hidden transform-gpu ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 p-0.5 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(45deg, rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.6), rgba(139, 92, 246, 0.4))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />
      <div className="absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      {children}
    </div>
  );
}
