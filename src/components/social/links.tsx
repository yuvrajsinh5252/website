import { SOCIAL_LINKS } from "@/data/social-links";
import { Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function SocialLinks() {
  return (
    <div className="flex gap-5 justify-center items-center">
      {SOCIAL_LINKS.map((social) => (
        <Link
          key={social.name}
          href={social.name === "Email" ? social.url : { pathname: social.url }}
          target="_blank"
          className="p-2 rounded-lg"
        >
          {social.icon === "Github" && <SiGithub size={23} />}
          {social.icon === "Linkedin" && <SiLinkedin size={23} />}
          {social.icon === "Mail" && <Mail />}
          {social.icon === "Twitter" && <Twitter />}
        </Link>
      ))}
    </div>
  );
}
