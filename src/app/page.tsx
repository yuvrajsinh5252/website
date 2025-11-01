import { AboutSection } from "@/components/home/about-section";
import { HeroSection } from "@/components/home/hero-section";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { createSEO } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createSEO({
  title: "Home",
  description: siteConfig.description,
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
