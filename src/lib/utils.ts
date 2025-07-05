import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
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
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Developer Portfolio`,
          type: "image/png",
        },
      ],
      type: "website",
      locale: "en_US",
      url,
      siteName: `${siteConfig.name} Developer Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: `@${siteConfig.links.twitter.split("/").pop()}`,
      site: `@${siteConfig.links.twitter.split("/").pop()}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
    category: "technology",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
  };
}
