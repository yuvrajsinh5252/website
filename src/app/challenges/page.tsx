import { getChallenges } from "@/lib/content";
import { Header } from "@/components/challenges/header";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Metadata } from "next";
import { ChallengesList } from "@/components/challenges/challenges_list";

const title = "Coding Challenges";
const description =
  "My journey through coding challenges including Advent of Code solutions, explanations, and insights.";

export const metadata: Metadata = {
  title: {
    template: "%s | Yuvrajsinh Gohil",
    default: title,
  },
  description,
  keywords: [
    "coding challenges",
    "advent of code",
    "aoc",
    "yuvrajsinh gohil",
    "programming",
    "algorithms",
    "problem solving",
    "typescript",
    "competitive programming",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://www.yuvrajsinh.me/challenges",
    siteName: "Yuvrajsinh Gohil",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@Yuvrajsinh_099",
  },
};

export default function ChallengesPage() {
  const challenges = getChallenges();

  return (
    <div className="min-h-screen">
      <MaxWidthWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
          <Header title="Coding Challenges" back={false} />
          <ChallengesList challenges={challenges} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
