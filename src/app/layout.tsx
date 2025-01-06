import { Poppins } from "next/font/google";
import "./styles/globals.css";
import GrowingCircleAnimation from "@/components/theme/circle-grow-animation";
import Navbar from "@/components/navbar/navbar";
import { constructMetadata } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GrowingCircleAnimation />
          <Navbar />
          <div className="relative z-20 mix-blend-difference">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
