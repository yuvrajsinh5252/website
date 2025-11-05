import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/themes/provides";
import Navbar from "@/components/navbar/navbar";
import { Background } from "@/components/ui/background";
import Footer from "@/components/footer/footer";
import { createSEO } from "@/lib/seo";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata = createSEO();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
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
          <div className="z-30 relative">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
