import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

import {
  Outfit,
  Space_Grotesk,
  Syne,
  JetBrains_Mono,
} from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://karamjeetsony.akarta.tech"),

  title: "Karamjeet Sony | Software Engineer",

  description:
    "Karamjeet Sony is a Software Engineer focused on backend engineering, distributed systems, scalable systems, and competitive programming.",

  alternates: {
    canonical: "https://karamjeetsony.akarta.tech",
  },

  openGraph: {
    title: "Karamjeet Sony | Software Engineer",
    description:
      "Portfolio of Karamjeet Sony, Software Engineer.",
    url: "https://karamjeetsony.akarta.tech",
    siteName: "Karamjeet Sony",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Karamjeet Sony | Software Engineer",
    description:
      "Portfolio of Karamjeet Sony, Software Engineer.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

          <PageTransition>
            {children}
          </PageTransition>

          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
