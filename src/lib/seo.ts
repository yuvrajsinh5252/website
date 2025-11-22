import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  publishedTime?: string;
  type?: "website" | "article";
}

export function createSEO({
  title,
  description = siteConfig.description,
  image,
  canonical,
  noIndex = false,
  publishedTime,
  type = "website",
}: SEOProps = {}): Metadata {
  const pageTitle = title ? `${title} - ${siteConfig.name}` : siteConfig.title;
  const pageImage = image
    ? image.startsWith("http")
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}/images/logo.png`;

  return {
    title: pageTitle,
    description,
    creator: siteConfig.name,
    openGraph: {
      title: pageTitle,
      description,
      url: canonical || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      type,
      locale: "en_US",
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [pageImage],
      creator: "@Yuvrajsinh_099",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    alternates: canonical ? { canonical } : undefined,
  };
}
