import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "Yuvrajsinh's Portfolio",
  description = "Welcome to my portfolio website. I'm a software developer specializing in web development and modern technologies.",
  image = "/logo.png",
  keywords = "yuvrajsinh, software developer, web development, portfolio, full-stack developer",
  authors = [{ name: "Yuvrajsinh" }],
} = {}) {
  return {
    metadataBase: new URL("https://www.yuvrajsinh.me/"),
    title,
    description,
    keywords,
    authors,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}
