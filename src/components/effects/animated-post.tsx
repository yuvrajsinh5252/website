import { Children, ReactNode } from "react";

interface AnimatedPostProps {
  children: ReactNode;
}

const STAGGER_SECONDS = 0.15;

export function AnimatedPost({ children }: AnimatedPostProps) {
  return (
    <div className="w-full">
      {Children.map(children, (child, index) => (
        <div
          className="animate-fade-up"
          style={{ animationDelay: `${index * STAGGER_SECONDS}s` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
