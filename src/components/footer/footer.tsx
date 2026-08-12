"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SOCIAL_LINKS } from "@/config/social-links";
import { SiGithub, SiX, SiDiscord } from "react-icons/si";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { DoodleIconLink } from "@/components/ui/doodle-icon";

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

  const colors: Array<'red' | 'blue' | 'yellow' | 'green'> = ['red', 'blue', 'yellow', 'green', 'red'];
  const radii: Array<1 | 2 | 3> = [1, 2, 3, 1, 2];

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

            <div className="flex items-center gap-4 text-[12px]">
              {socials.map((social, idx) => {
                const Icon = iconMap[social.icon];
                if (!Icon) return null;
                return (
                  <DoodleIconLink
                    key={social.name}
                    href={social.url}
                    icon={Icon as any}
                    tooltip={social.name}
                    color={colors[idx % colors.length]}

                  />
                );
              })}
              <DoodleIconLink
                href={`mailto:${email}`}
                icon={FaEnvelope as any}
                tooltip="Email"
                color="green"

              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
