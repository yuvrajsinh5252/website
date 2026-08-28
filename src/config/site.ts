import { SITE_META } from "./site-meta";

export const siteConfig = {
  name: SITE_META.name,
  url: import.meta.env.VITE_SITE_URL ?? SITE_META.defaultUrl,
  title: SITE_META.title,
  description: SITE_META.description,
  links: {
    twitter: "https://twitter.com/Yuvrajsinh_099",
    github: "https://github.com/yuvrajsinh5252",
    linkedin: "https://www.linkedin.com/in/yuvrajsinh099/",
  },
  author: {
    name: "Yuvrajsinh Gohil",
    url: "https://github.com/yuvrajsinh5252",
  },
};

export type SiteConfig = typeof siteConfig;
