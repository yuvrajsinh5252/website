import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  keywords = siteConfig.keywords,
  image = "/og-image.png",
  ...props
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  [key: string]: any;
} = {}): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: "%s | Yuvrajsinh Gohil",
    },
    description,
    authors: [siteConfig.author],
    keywords,
    creator: siteConfig.author.name,
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@yuvrajsinhgohil",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    ...props,
  };
}
