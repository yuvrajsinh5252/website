"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SOCIAL_LINKS } from "@/config/social-links";
import { SiGithub, SiX, SiDiscord } from "react-icons/si";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/config/site";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGithub: SiGithub,
  FaLinkedin,
  FaTwitter: SiX,
  FaDiscord: SiDiscord,
};

export default function Footer() {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";
  const email =
    SOCIAL_LINKS.find((s) => s.name === "Email")?.url?.replace("mailto:", "") ||
    "";
  const socials = SOCIAL_LINKS.filter((s) => s.name !== "Email");

  return (
    <footer className="mt-auto border-t border-white/5">
      <div
        className={`mx-auto w-full ${
          isProjectsPage
            ? "max-w-6xl px-4 sm:px-6 md:px-8"
            : "max-w-screen-lg px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20"
        }`}
      >
        <div
          className={`py-8 ${
            isProjectsPage ? "" : "px-4 sm:px-6 md:px-8"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <Link href="/" className="text-lg font-bold text-white">
                {siteConfig.name}
              </Link>
              <p className="text-gray-400 text-sm mt-1">Software Developer</p>
            </div>

            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                    aria-label={social.name}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </Link>
                );
              })}
              <a
                href={`mailto:${email}`}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                aria-label="Email"
              >
                <FaEnvelope className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
