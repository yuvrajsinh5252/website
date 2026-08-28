import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { DoodleIconLink } from "@/components/ui/doodle-icon";
import { HeroScrollButton } from "@/components/home/hero-scroll-button";

/** Staggers the CSS entrance animation without needing a JS animation library. */
const delay = (seconds: number) => ({ animationDelay: `${seconds}s` });

export function HeroContent() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="space-y-6 sm:space-y-10 max-w-5xl mx-auto relative z-10 w-full">
        <div className="space-y-2 sm:space-y-5">
          <h1 className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight sm:leading-tight">
            <span
              className="text-gray-300 block text-[1.5rem] sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl animate-fade-up"
              style={delay(0.1)}
            >
              Hey there, I&apos;m
            </span>
            <span
              className="mt-1 sm:mt-2 block bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent lg:text-6xl xl:text-7xl animate-fade-up"
              style={delay(0.25)}
            >
              Yuvrajsinh Gohil
            </span>
          </h1>
        </div>

        <p
          className="text-sm leading-[1.6] sm:text-base md:text-lg lg:text-xl font-extralight sm:leading-relaxed text-gray-300/90 px-2 sm:px-2 max-w-[90%] sm:max-w-none mx-auto animate-fade-up"
          style={delay(0.4)}
        >
          Software Developer passionate about emerging technologies and crafting
          innovative digital solutions.
        </p>

        <div
          className="flex flex-row gap-3 sm:gap-6 justify-center items-center pt-4 sm:pt-8 w-full sm:w-auto animate-fade-up"
          style={delay(0.55)}
        >
          <Link
            to="/projects"
            className="group relative flex items-center justify-center py-3 px-6 sm:px-9 sm:py-4 rounded-full
                       border border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/20
                       transition-all duration-200 shadow-[0_0_0_0_rgba(59,130,246,0.0)] hover:shadow-[0_0_30px_0_rgba(59,130,246,0.25)]
                       backdrop-blur-xs w-auto"
          >
            <span className="text-blue-200 group-hover:text-white transition-colors duration-200 font-medium text-sm sm:text-base">
              <span className="hidden sm:inline">View </span>My Work
            </span>
          </Link>

          <Link
            to="/posts"
            className="group relative flex items-center justify-center py-3 px-6 sm:px-9 sm:py-4 rounded-full
                       border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10
                       transition-all duration-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]
                       backdrop-blur-xs w-auto"
          >
            <span className="text-gray-200 group-hover:text-white transition-colors duration-200 font-medium text-sm sm:text-base">
              <span className="hidden sm:inline">Read </span>My Posts
            </span>
          </Link>
        </div>
      </div>

      <nav
        aria-label="Social profiles"
        className="mt-5 sm:mt-8 flex items-center justify-center gap-6 animate-fade-up"
        style={delay(0.7)}
      >
        <DoodleIconLink
          href={siteConfig.links.github}
          icon={FaGithub}
          label="GitHub profile"
          color="red"
        />
        <DoodleIconLink
          href={siteConfig.links.linkedin}
          icon={FaLinkedin}
          label="LinkedIn profile"
          color="blue"
        />
        <DoodleIconLink
          href={siteConfig.links.twitter}
          icon={FaXTwitter}
          label="X profile"
          color="yellow"
        />
      </nav>

      <HeroScrollButton />
    </div>
  );
}
