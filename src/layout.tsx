import { Outlet } from "react-router-dom";
import { Head } from "vite-react-ssg";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Background } from "@/components/ui/background";
import { Analytics } from "@/components/analytics/analytics";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { siteConfig } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  alternateName: ["Yuvrajsinh Gohil", "Yuvrajsinh"],
  url: siteConfig.url,
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ],
  },
};

export function Layout() {
  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <ScrollToTop />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <Analytics />
      <Background />
      <Navbar />

      <main id="main-content" className="z-30 relative">
        <Outlet />
      </main>

      <div className="z-30 relative">
        <Footer />
      </div>
    </>
  );
}
