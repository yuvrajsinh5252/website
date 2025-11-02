"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa6";

export function HeroAnimations() {
  const [showScrollButton, setShowScrollButton] = useState(true);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setShowScrollButton(false), 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showScrollButton && (
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 group"
          aria-label="Scroll down to about section"
        >
          <motion.div
            className="flex items-center gap-2 px-4 py-2"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaArrowDown
              size={14}
              className="text-gray-400 group-hover:text-white transition-colors duration-150"
            />
          </motion.div>
        </motion.button>
      )}
    </>
  );
}
