
"use client"

import { ThemeProvider } from "next-themes";
import { useTransform, motion, useScroll, useSpring } from 'framer-motion';
import SmoothScroll from "../smooth-scroll";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const contentHeight = document.documentElement.scrollHeight;
  const y = useTransform(smoothProgress, value => {
    return value * -(contentHeight - window.innerHeight);
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </ThemeProvider>
  );
}