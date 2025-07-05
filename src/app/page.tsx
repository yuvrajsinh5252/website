import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { HeroSection } from "@/components/home/hero-section";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper>
        <HeroSection />
        <AboutSection />
        <ContactSection />
      </MaxWidthWrapper>
    </main>
  );
}
