import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "Yuvrajsinh Gohil - Full-Stack Developer & Software Engineer",
  description = "Yuvrajsinh Gohil is a passionate Computer Science student at Nirma University, specializing in full-stack development, web technologies, and system design. Explore my projects, skills, and experience in React, Next.js, TypeScript, and more.",
  image = "/logo.png",
  keywords = "Yuvrajsinh Gohil, Yuvrajsinh, software developer, full-stack developer, web developer, Computer Science, Nirma University, React, Next.js, TypeScript, JavaScript, portfolio, projects, programming, tech, engineering student, hackathon winner, web development, system design",
  authors = [{ name: "Yuvrajsinh Gohil", url: "https://www.yuvrajsinh.me" }],
  url = "https://www.yuvrajsinh.me",
} = {}) {
  return {
    metadataBase: new URL("https://www.yuvrajsinh.me/"),
    title,
    description,
    keywords,
    authors,
    creator: "Yuvrajsinh Gohil",
    publisher: "Yuvrajsinh Gohil",
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
          alt: "Yuvrajsinh Gohil - Full-Stack Developer Portfolio",
        },
      ],
      type: "website",
      locale: "en_US",
      url,
      siteName: "Yuvrajsinh Gohil Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@Yuvrajsinh_099",
      site: "@Yuvrajsinh_099",
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
