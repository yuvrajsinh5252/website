import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import GrowingCircleAnimation from "@/components/theme/circle-grow-animation";
import { Cursor } from "@/components/theme/cursor";
import Navbar from "@/components/navbar/navbar";

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
          <Navbar />
          <div className="dark:mix-blend-difference mix-blend-screen"><Cursor /></div>
          <div className="relative z-20 mix-blend-difference">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
