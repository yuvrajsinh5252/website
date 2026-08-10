import { getCategoryList } from "@/lib/content";
import PageHeader from "@/components/ui/page-header";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { AocList } from "@/components/challenges/aoc_lists";
import { createSEO } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createSEO({
  title: "Advent of Code",
  description: "My solutions and explanations for Advent of Code challenges.",
  canonical: `${siteConfig.url}/challenges/aoc`,
});

export default function AOCPage() {
  const categories = getCategoryList().filter(
    (category) => category.category === "aoc"
  );

  return (
    <div className="min-h-screen">
      <MaxWidthWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
          <PageHeader title="Advent of Code" backHref="/challenges" />
          <AocList categories={categories} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
