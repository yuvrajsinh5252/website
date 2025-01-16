import { Poppins } from "next/font/google";
import "./styles/globals.css";
import GrowingCircleAnimation from "@/components/theme/circle-grow-animation";
import Navbar from "@/components/navbar/navbar";
import { constructMetadata } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
import CustomCursor from "@/components/ui/custom-cursor";
import AnimatedBackground from "@/components/ui/animated-background";

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
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="af1b100f-9515-440f-9a17-f9a50a32eb6f"
        ></script>
      </head>
      <link rel="icon" href="/logo.png" />
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GrowingCircleAnimation />
          <AnimatedBackground />
          <CustomCursor />
          <Navbar />
          <div className="relative z-20">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
