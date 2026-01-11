import { AboutContent } from "@/components/home/about";
import { HeroContent } from "@/components/home/hero";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { createSEO } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createSEO({
  description: siteConfig.description,
  canonical: siteConfig.url,
});

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper>
        <HeroContent />
        <AboutContent />
      </MaxWidthWrapper>
    </main>
  );
}
