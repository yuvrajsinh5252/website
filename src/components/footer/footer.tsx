"use client";

import Link from "next/link";
import { SOCIAL_LINKS } from "@/config/social-links";
import { SiGithub, SiLinkedin, SiX, SiDiscord } from "react-icons/si";
import { FaEnvelope } from "react-icons/fa";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGithub: SiGithub,
  FaLinkedin: SiLinkedin,
  FaTwitter: SiX,
  FaDiscord: SiDiscord,
};

export default function Footer() {
  const email =
    SOCIAL_LINKS.find((s) => s.name === "Email")?.url?.replace("mailto:", "") ||
    "";
  const socials = SOCIAL_LINKS.filter((s) => s.name !== "Email");

  return (
    <footer className="mt-24">
      <div className="relative h-px w-full max-w-5xl mx-auto mb-8 opacity-70">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.35) 25%, rgba(139,92,246,0.35) 50%, rgba(6,182,212,0.35) 75%, rgba(6,182,212,0) 100%)",
            filter: "blur(0.3px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-blue-300 transition-colors text-base"
            >
              <FaEnvelope className="w-5 h-5" />
              <span>Contact</span>
            </a>
            <span className="text-gray-500">•</span>
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
