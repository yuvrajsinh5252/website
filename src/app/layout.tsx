import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/themes/provides";
import Navbar from "@/components/navbar/navbar";
import { Background } from "@/components/ui/background";
import { createSEO } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata = createSEO();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="af1b100f-9515-440f-9a17-f9a50a32eb6f"
        />
      </head>
      <body className={inter.className}>
        <Provider>
          <Background />
          <Navbar />
          <div className="z-30 relative">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
