import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Njoroge Kiriro Advocates | Legal Counsel in Kenya",
  description:
    "Njoroge Kiriro Advocates is a Nairobi-based law firm delivering principled, results-driven legal counsel to individuals and businesses across Kenya.",
  keywords: [
    "law firm Kenya",
    "advocates Nairobi",
    "legal counsel Kenya",
    "Njoroge Kiriro",
  ],
  openGraph: {
    title: "Njoroge Kiriro Advocates",
    description: "Trusted legal counsel in Kenya.",
    url: "https://njorogekiriroadvocates.com",
    siteName: "Njoroge Kiriro Advocates",
    locale: "en_KE",
    type: "website",
  },
  icons: {
    icon: [
      // Dark mode browser tab — show white logo
      {
        url: "/favicon-white.ico",
        media: "(prefers-color-scheme: dark)",
        sizes: "any",
      },
      // Light mode browser tab — show dark logo
      {
        url: "/favicon-dark.ico",
        media: "(prefers-color-scheme: light)",
        sizes: "any",
      },
      // PNG fallbacks for browsers that prefer PNG
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="bg-warm-white text-charcoal antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}