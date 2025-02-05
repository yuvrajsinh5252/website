"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimate, stagger, useInView } from "motion/react";
import { useEffect, useRef } from "react";

export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
          y: 0,
        },
        {
          duration: 0.4,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [animate, isInView]);

  const renderWords = () => {
    return words.map((word, idx) => (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        key={`${word}-${idx}`}
        className={cn("inline-block", word.className)}
      >
        {word.text}
        {idx !== words.length - 1 ? "\u00A0" : ""}
      </motion.span>
    ));
  };

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-wrap items-center justify-center", className)}
    >
      <div ref={scope}>{renderWords()}</div>
    </motion.div>
  );
};
