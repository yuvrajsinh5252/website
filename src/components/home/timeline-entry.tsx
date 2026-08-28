import type { ReactNode } from "react";

interface TimelineEntryProps {
  logo?: string;
  /** Falls back to the first character when no logo is set. */
  fallbackLabel: string;
  alt: string;
  children: ReactNode;
}

export function TimelineEntry({
  logo,
  fallbackLabel,
  alt,
  children,
}: TimelineEntryProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden">
        {logo ? (
          <img
            src={logo}
            alt={alt}
            width={40}
            height={40}
            className="object-contain"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-blue-400 text-xs font-semibold">
            {fallbackLabel.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export function StatusPill({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green";
}) {
  return (
    <span
      className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
        tone === "green"
          ? "text-green-200 bg-green-500/20"
          : "text-blue-200 bg-blue-500/20"
      }`}
    >
      {children}
    </span>
  );
}
