import Link from "next/link";
import { HeroAnimations } from "./hero-animations";

export function HeroContent() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            <span className="text-gray-300 block text-[2rem] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">Hi, I&apos;m</span>
            <span className="mt-1 sm:mt-2 block bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent lg:text-6xl xl:text-7xl">
              Yuvrajsinh Gohil
            </span>
          </h1>
        </div>

        <p className="text-base leading-[1.6] sm:text-lg md:text-xl lg:text-2xl font-extralight sm:leading-relaxed text-gray-300/90 px-2 sm:px-2 max-w-[90%] sm:max-w-none mx-auto">
          Software Developer passionate about emerging technologies and crafting
          innovative digital solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-stretch sm:items-center pt-4 sm:pt-8 w-full sm:w-auto">
          <Link
            href="/projects"
            className="group relative flex items-center justify-center px-6 py-3 sm:px-9 sm:py-4 rounded-full
                     border border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/20
                     transition-all duration-200 shadow-[0_0_0_0_rgba(59,130,246,0.0)] hover:shadow-[0_0_30px_0_rgba(59,130,246,0.25)]
                     backdrop-blur-sm w-full sm:w-auto"
          >
            <span className="text-blue-200 group-hover:text-white transition-colors duration-200 font-medium text-sm sm:text-base">
              View My Work
            </span>
          </Link>

          <Link
            href="/posts"
            className="group relative flex items-center justify-center px-6 py-3 sm:px-9 sm:py-4 rounded-full
                     border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10
                     transition-all duration-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]
                     backdrop-blur-sm w-full sm:w-auto"
          >
            <span className="text-gray-200 group-hover:text-white transition-colors duration-200 font-medium text-sm sm:text-base">
              Read My Posts
            </span>
          </Link>
        </div>
      </div>

      <HeroAnimations />
    </div>
  );
}
