// @ts-ignore
import "./globals.css";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Metadata, Viewport } from "next";
import { Provider } from "@/components/themes/provides";
import { Background } from "@/components/ui/background";
import { createSEO } from "@/lib/seo";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createSEO(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: ["Yuvrajsinh Gohil", "Yuvrajsinh"],
    url: siteConfig.url,
  };

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Umami Analytics */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="5f8aac11-e83a-4377-bc92-692cdd083bf6"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-V3LWL9X6ZG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V3LWL9X6ZG');
          `}
        </Script>

        <Provider>
          <Background />
          <Navbar />
          <main className="z-30 relative">{children}</main>
          <div className="z-30 relative">
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
