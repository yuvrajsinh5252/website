import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "WhispherDocs",
  description = "Enjoy the best of the web with WhisperDocs and get best knowledge out of pdf files.",
}: // noIndex = false,
{
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // images: [image],
      creator: "@yuvrajsinh",
    },
    // icons,
    // metadataBase: new URL("http://localhost:3000/"),
    // ...(noIndex && {
    //   robots: {
    //     index: false,
    //     follow: false,
    //   },
    // }),
  };
}
