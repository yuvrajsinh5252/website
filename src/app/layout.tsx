import { Poppins } from "next/font/google";
import "./styles/globals.css";
import GrowingCircleAnimation from "@/components/theme/circle-grow-animation";
import { Cursor } from "@/components/theme/cursor";
import Navbar from "@/components/navbar/navbar";
import { constructMetadata } from "@/lib/utils";
import { Providers } from "@/components/theme/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/logo.png" />
      <body className={poppins.className}>
        <Providers>
          <GrowingCircleAnimation />
          <Navbar />
          <div className="dark:mix-blend-difference mix-blend-screen"><Cursor /></div>
          <div className="relative z-20 mix-blend-difference">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
