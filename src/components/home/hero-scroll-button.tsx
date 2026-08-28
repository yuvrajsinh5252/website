import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";

export function HeroScrollButton() {
  const [showScrollButton, setShowScrollButton] = useState(true);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    window.scrollTo({
      top: aboutSection.getBoundingClientRect().top + window.scrollY - 60,
      behavior: "smooth",
    });
    setTimeout(() => setShowScrollButton(false), 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setShowScrollButton(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showScrollButton) return null;

  return (
    <button
      type="button"
      onClick={scrollToAbout}
      className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 group animate-fade-in"
      aria-label="Scroll down to about section"
    >
      <span className="flex items-center gap-2 px-4 py-2 motion-safe:animate-bounce">
        <FaArrowDown
          size={16}
          className="text-gray-400 group-hover:text-white transition-colors duration-150"
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
