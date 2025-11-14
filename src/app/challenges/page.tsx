import { getChallenges } from "@/lib/content";
import PageHeader from "@/components/ui/page-header";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { ChallengesList } from "@/components/challenges/challenges_list";
import { createSEO } from "@/lib/seo";

export const metadata = createSEO({
  title: "Challenges",
  description:
    "Coding challenges and solutions by Yuvrajsinh Gohil - Advent of Code, algorithms, and problem-solving.",
});

export default function ChallengesPage() {
  const challenges = getChallenges();

  return (
    <div className="min-h-screen">
      <MaxWidthWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
          <PageHeader
            title="Coding Challenges"
            description="My solutions to algorithmic puzzles and programming problems."
          />
          <ChallengesList challenges={challenges} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
