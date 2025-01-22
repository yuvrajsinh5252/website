import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/themes/provides";
import { constructMetadata } from "@/lib/utils";
import Navbar from "@/components/navbar/navbar";
import { CircleAnimation } from "@/components/effects/growing-circle";
import { Background } from "@/components/effects/background";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Provider>
          <CircleAnimation />
          <Background />
          <Navbar />
          <div className="z-20 relative">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
