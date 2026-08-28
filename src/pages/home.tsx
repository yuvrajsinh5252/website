import { AboutContent } from "@/components/home/about";
import { HeroContent } from "@/components/home/hero";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Seo } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export function HomePage() {
  return (
    <>
      <Seo description={siteConfig.description} canonical={siteConfig.url} />
      <MaxWidthWrapper>
        <HeroContent />
        <AboutContent />
      </MaxWidthWrapper>
    </>
  );
}
