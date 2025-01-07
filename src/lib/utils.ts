import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata(): Metadata {
  return {
    metadataBase: new URL("https://www.yuvrajsinh.me"),
    title: {
      default: "Yuvrajsinh",
      template: `%s | Yuvrajsinh`,
    },
    openGraph: {
      description: "Yuvrajsinh's personal website",
      images: [
        {
          url: "/logo.png",
          alt: "Yuvrajsinh's personal website",
        },
      ],
    },
    keywords: [
      "Yuvrajsinh",
      "Yuvrajsinh5252",
      "developer portfolio",
      "personal website",
    ],
  };
}
