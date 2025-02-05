"use client";

import { ContactUs } from "@/components/about/contact";
import { Intro } from "@/components/about/intro";
import { Skills } from "@/components/about/skills";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [sections, setSections] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const sectionElements = Array.from(
      document.querySelectorAll("section")
    ) as HTMLElement[];
    setSections(sectionElements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <MaxWidthWrapper className="px-4">
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {["introduction", "skills", "contact"].map((section, index) => (
            <motion.div
              key={section}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
                activeSection === section ? "bg-white scale-125" : "bg-gray-600"
              }`}
              onClick={() => scrollToSection(index)}
              viewport={{ once: true }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>
      </nav>

      <section
        className="min-h-screen flex flex-col justify-center max-sm:pt-24 relative"
        id="introduction"
      >
        <Intro activeSection={activeSection} fadeIn={fadeIn} />
      </section>

      <section
        className="min-h-screen flex flex-col justify-center relative"
        id="skills"
      >
        <Skills activeSection={activeSection} fadeIn={fadeIn} />
      </section>

      <section
        className="min-h-screen flex flex-col justify-center relative"
        id="contact"
      >
        <ContactUs activeSection={activeSection} fadeIn={fadeIn} />
      </section>
    </MaxWidthWrapper>
  );
}
