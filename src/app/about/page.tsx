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

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    if (sections.length > 0) {
      scrollToSection(currentIndex);
    }
  }, [sections, currentIndex]);

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
                Hey, I&lsquo;m Yuvrajsinh! I&lsquo;m a 3rd-year student currently pursuing my B.Tech in Computer Science at <MagicLink href={"https://nirmauni.ac.in/"}>Nirma University</MagicLink>, with a minor in Cyber Physical Systems. I have a passion for creating innovative solutions that make a difference in people's lives.
              </p>

              <p className="text-lg">
                In addition to developing software, I have a keen interest in designing PCB circuits and creating models of larger systems. This passion for hardware and integration is one of the reasons I chose Cyber Physical Systems as my minor.
                You can check out my projects here <MagicLink href={"https://www.youtube.com/@yuvrajsinh472/videos"}>@Yuvrajsinh</MagicLink> I enjoy exploring the intersection of software and hardware, which allows me to bring innovative ideas to life.
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