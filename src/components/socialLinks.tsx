import { Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/data/socialLink";
import { SiGithub } from "react-icons/si";

export default function SocialLinks() {
  return (
    <div className="flex gap-5 justify-center items-center">
      {SOCIAL_LINKS.map((social) => (
        <Link
          key={social.name}
          href={social.name === "Email" ? social.url : { pathname: social.url }}
          target="_blank"
          className="bg-gray-200 bg-opacity-5 p-2 rounded-lg"
        >
          {social.icon === "Github" && <SiGithub size={23} />}
          {social.icon === "Linkedin" && <Linkedin />}
          {social.icon === "Mail" && <Mail />}
          {social.icon === "Twitter" && <Twitter />}
        </Link>
      ))}
    </div>
  );
}
