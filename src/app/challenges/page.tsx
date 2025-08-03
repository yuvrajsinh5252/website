import { getChallenges } from "@/lib/content";
import { Header } from "@/components/challenges/header";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Metadata } from "next";
import { ChallengesList } from "@/components/challenges/challenges_list";

export const metadata: Metadata = {
  title: "Challenges",
  description:
    "Coding challenges and solutions by Yuvrajsinh Gohil - Advent of Code, algorithms, and problem-solving.",
  keywords: [
    "Yuvrajsinh Gohil challenges",
    "Yuvrajsinh Gohil coding",
    "Advent of Code solutions",
    "programming challenges",
  ],
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
