import { Github, Linkedin, Mail, Twitter, X } from "lucide-react";
import Link from "next/link";
import Tooltip from "./tooltip";

export default function SocialLinks() {
  return (
    <div className="flex gap-5 justify-center items-center">
      <Link href="https://github.com/yuvrajsinh5252" className="bg-gray-200 bg-opacity-5 p-2 rounded-lg">
        <Tooltip text="GitHub">
          <Github />
        </Tooltip>
      </Link>
      <Link href="https://www.linkedin.com/in/yuvrajsinh-gohil099" className="bg-gray-200 bg-opacity-5 p-2 rounded-lg">
        <Tooltip text="LinkedIn">
          <Linkedin />
        </Tooltip>
      </Link>
      <Link href="mailto:yuvrajsinh476@gmail.com" className="bg-gray-200 bg-opacity-5 p-2 rounded-lg">
        <Tooltip text="Email">
          <Mail />
        </Tooltip>
      </Link>
      <Link href="https://x.com/Yuvrajsinh_099" className="bg-gray-200 bg-opacity-5 p-2 rounded-lg">
        <Tooltip text="Twitter">
          <Twitter />
        </Tooltip>
      </Link>
    </div>
  );
}