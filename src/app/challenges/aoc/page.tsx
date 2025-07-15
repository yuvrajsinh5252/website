import { getCategoryList } from "@/lib/content";
import { Header } from "@/components/challenges/header";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Metadata } from "next";
import { AocList } from "@/components/challenges/aoc_lists";

const title = "Advent of Code";
const description =
  "My solutions and explanations for Advent of Code challenges.";

export const metadata: Metadata = {
  title: {
    template: "%s | Yuvrajsinh Gohil",
    default: title,
  },
  description,
  keywords: [
    "advent of code",
    "aoc",
    "yuvrajsinh gohil",
    "programming",
    "algorithms",
    "problem solving",
    "typescript",
    "competitive programming",
    "daily challenges",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://www.yuvrajsinh.me/challenges/aoc",
    siteName: "Yuvrajsinh Gohil",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@Yuvrajsinh_099",
  },
};

export default function AOCPage() {
  const categories = getCategoryList().filter(
    (category) => category.category === "aoc"
  );

  return (
    <div className="min-h-screen">
      <MaxWidthWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
          <Header title="Advent of Code" back={true} />
          <AocList categories={categories} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
