export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
  description?: string;
  username?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/yuvrajsinh5252",
    icon: "FaGithub",
    color: "#6366f1",
    description: "Open source projects",
    username: "@yuvrajsinh5252",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yuvrajsinh099",
    icon: "FaLinkedin",
    color: "#0ea5e9",
    description: "Professional network",
    username: "yuvrajsinh099",
  },
  {
    name: "Twitter",
    url: "https://x.com/Yuvrajsinh_099",
    icon: "FaTwitter",
    color: "#06b6d4",
    description: "Tech thoughts & updates",
    username: "@Yuvrajsinh_099",
  },
  {
    name: "Discord",
    url: "https://discord.com/users/1035138685689139311",
    icon: "FaDiscord",
    color: "#8b5cf6",
    description: "Gaming & community",
    username: "yuvrajsinh",
  },
  {
    name: "Email",
    url: "mailto:yuvrajsinh476@gmail.com",
    icon: "FaEnvelope",
  },
];
