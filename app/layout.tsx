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
    url: "https://njorogekiriro.co.ke",
    siteName: "Njoroge Kiriro Advocates",
    locale: "en_KE",
    type: "website",
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