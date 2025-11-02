import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface SEOProps {
  title?: string;
  description?: string;
  images?: string[];
  canonical?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  type?: "website" | "article" | "profile";
}

export function createSEO(options: SEOProps = {}): Metadata {
  const {
    title,
    description = siteConfig.description,
    images = [],
    canonical,
    noIndex = false,
    publishedTime,
    modifiedTime,
    author = siteConfig.author.name,
    type = "website",
  } = options;

  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

  const defaultImage = `${siteConfig.url}/images/logo.png`;
  const metaImages =
    images.length > 0
      ? images.map((img) => ({
          url: img.startsWith("http") ? img : `${siteConfig.url}${img}`,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        }))
      : [
          {
            url: defaultImage,
            width: 1200,
            height: 630,
            alt: siteConfig.name,
          },
        ];

  const metadata: Metadata = {
    title: fullTitle,
    description,
    authors: [{ name: author, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      locale: "en_US",
      url: canonical || siteConfig.url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: metaImages,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: metaImages,
      creator: "@Yuvrajsinh_099",
      site: "@Yuvrajsinh_099",
    },
    icons: {
      icon: defaultImage,
      shortcut: defaultImage,
      apple: defaultImage,
    },
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
  };

  return metadata;
}
