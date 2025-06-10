import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/themes/provides";
import { constructMetadata } from "@/lib/utils";
import Navbar from "@/components/navbar/navbar";
import CustomCursor from "@/components/cursor/custom-cursor";
import { Background } from "@/components/background/background";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://yuvrajsinh.me" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="af1b100f-9515-440f-9a17-f9a50a32eb6f"
        ></script>
      </head>
      <body className={inter.className}>
        <Provider>
          <Background />
          <CustomCursor />
          <Navbar />
          <div className="z-30 relative">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
