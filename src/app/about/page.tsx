"use client"

import ContactUs from "@/components/contact";
import MagicLink from "@/components/magicLink";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";

export default function Home() {
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = Array.from(document.querySelectorAll('section')) as HTMLElement[];
      setSections(sectionElements);
    };

    handleScroll();

    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  useEffect(() => {
    if (sections.length > 0) {
      scrollToSection(currentIndex);
    }
  }, [sections, currentIndex]);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  const handleArrowDownClick = () => {
    if (currentIndex + 1 < sections.length) {
      scrollToSection(currentIndex + 1);
    }
  };

  return (
    <MaxWidthWrapper className="max-w-screen-lg">
      <section className="flex flex-col items-center justify-center h-screen" id="one">
        <div className="flex justify-center h-screen">
          <div className="flex flex-col gap-10 mt-44">
            <h1 className="text-5xl font-bold">About Me</h1>
            <div className="flex flex-col gap-5">
              <p className="text-lg">
                Hi, I’m Yuvrajsinh Gohil, a passionate and innovative software developer currently pursuing my B.Tech in Computer Science at <MagicLink href={"https://nirmauni.ac.in/"}>Nirma University</MagicLink> with a minor in Cyber Physical Systems. I specialize in full-stack web development and have a strong foundation in data structures, algorithms, and database management. My work focuses on creating efficient, scalable, and user-friendly applications using modern technologies.
              </p>

              <p className="text-lg">
                I thrive in challenging environments where I can solve real-world problems through code, whether it’s building AI-powered educational platforms, crafting intuitive user interfaces, or creating multiplayer gaming experiences. With a deep interest in AI/ML, I enjoy working on <MagicLink href={"/projects"}>projects</MagicLink> that push the boundaries of technology.
              </p>

              <p className="text-lg">
                In my spare time, I enjoy participating in hackathons, continuously improving my coding skills, and staying updated with the latest industry trends. I believe in lifelong learning and am always eager to take on new challenges.
              </p>
              <FaArrowDown
                onClick={handleArrowDownClick} style={{ display: currentIndex + 1 === sections.length ? 'none' : 'block' }}
                className="animate-bounce cursor-pointer text-4xl left-1/2 rounded-full bg-white p-2 text-black fixed bottom-0" />
            </div>
          </div>
        </div>
      </section>
      <section id="two">
        <ContactUs />
      </section>
    </MaxWidthWrapper >
  )
}