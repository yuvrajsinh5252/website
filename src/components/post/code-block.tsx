import type { HTMLAttributes } from "react";

/**
 * Wraps MDX code fences. Highlighting itself is applied at build time by
 * rehype-highlight, so this only supplies the surrounding chrome.
 */
export function Pre({ children, ...props }: HTMLAttributes<HTMLPreElement>) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl my-6 not-prose">
      <pre {...props} className="!bg-transparent !m-0 !p-4 overflow-x-auto">
        {children}
      </pre>
    </div>
  );
}
