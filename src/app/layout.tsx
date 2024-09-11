import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "next-themes";
import GrowingCircleAnimation from "@/components/theme/circle-grow-animation";
import { Cursor } from "@/components/cursor";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "My Website",
  description: "This is my portfolio website built using next.js 14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <GrowingCircleAnimation />
          <div className="relative mix-blend-difference">
            <Navbar />
            <Cursor />
            <div className="z-20">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
