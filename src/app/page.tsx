import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { constructMetadata } from "@/lib/utils";
import { HeroSection } from "@/components/home/hero-section";
import { SkillsSection } from "@/components/home/skills-section";
import { ContactSection } from "@/components/home/contact-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { Metadata } from "next";
import { personSchema, websiteSchema } from "@/lib/schemas";
import { AboutSection } from "@/components/home/about-section";

export const metadata: Metadata = constructMetadata({
  title: "Yuvrajsinh Gohil - Full-Stack Developer & Software Engineer",
  description:
    "Yuvrajsinh Gohil is a passionate Computer Science student at Nirma University, specializing in full-stack development, web technologies, and system design. Explore my projects, skills, and experience in React, Next.js, TypeScript, and more.",
  keywords:
    "Yuvrajsinh Gohil, Yuvrajsinh, software developer, full-stack developer, web developer, Computer Science, Nirma University, React, Next.js, TypeScript, JavaScript, portfolio, projects, programming, tech, engineering student",
});

const structuredData = [personSchema, websiteSchema];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="relative w-full">
        <MaxWidthWrapper>
          <div className="flex flex-col">
            <div className="sr-only">
              <h1>
                Yuvrajsinh Gohil - Full-Stack Developer and Software Engineer
              </h1>
              <p>
                Yuvrajsinh Gohil is a passionate Computer Science B.Tech student
                at Nirma University with a minor in Cyber Physical Systems.
                Specializing in full-stack web development, he creates
                innovative solutions using modern technologies like React,
                Next.js, TypeScript, Node.js, and various databases. His
                expertise spans frontend development, backend systems, IoT
                projects, and system design.
              </p>
              <p>
                As an experienced developer, Yuvrajsinh has built multiple
                projects including WhispherDocs (AI-powered PDF interaction
                platform), Brilliant++ (educational technology platform),
                ChessGame (multiplayer chess with ELO rating), and various other
                innovative applications. He actively participates in hackathons
                and has secured notable positions including 2nd place at
                HackNUthon 5.0.
              </p>
              <p>
                Skills include: React, Next.js, TypeScript, JavaScript, Node.js,
                Python, C++, Rust, Go, Java, PostgreSQL, MongoDB, Docker, Git,
                Linux, Arduino, Raspberry Pi, ESP32, and more. Passionate about
                web development, automation, system design, and open source
                contributions.
              </p>
            </div>

            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
