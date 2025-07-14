import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: "%s | Yuvrajsinh Gohil",
    },
    description: siteConfig.description,
    authors: [siteConfig.author],
    keywords: siteConfig.keywords,
    creator: siteConfig.author.name,
    alternates: {
      canonical: siteConfig.url,
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
