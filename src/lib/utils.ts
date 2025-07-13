import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  keywords = siteConfig.keywords,
  authors = [{ name: siteConfig.author, url: siteConfig.url }],
  url = siteConfig.url,
} = {}) {
  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords,
    authors,
    creator: siteConfig.author,
    publisher: siteConfig.author,
    alternates: {
      canonical: url,
    },
    verification: {
      google: "your-google-verification-code",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
}
