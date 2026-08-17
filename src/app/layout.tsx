import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { Outfit, Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karamjeet Sony — Full Stack Developer",
  description:
    "Full Stack Developer building reliable backend systems and modern web products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/akira_expanded/Akira Expanded Demo.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${syne.variable} ${jetbrainsMono.variable}`}
      >
        <SmoothScrollProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
