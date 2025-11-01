import { AboutSection } from "@/components/home/about-section";
import { HeroSection } from "@/components/home/hero-section";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { createSEO } from "@/lib/seo";

export const metadata = createSEO({
  title: "Home",
  description:
    "Computer Science student at Nirma University passionate about emerging technologies. Explore my projects, blog posts, and coding challenges.",
});

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper>
        <HeroSection />
        <AboutSection />
      </MaxWidthWrapper>
    </main>
  );
}
