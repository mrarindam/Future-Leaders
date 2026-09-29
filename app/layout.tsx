import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Future Leaders — Web3 Growth & Community Agency",
  description:
    "Future Leaders helps Web3 projects grow through KOL marketing, community management, partnerships, social & growth marketing, and technical services.",
  keywords: [
    "Web3 Agency",
    "Crypto Marketing",
    "KOL Marketing",
    "Discord Management",
    "Web3 Community",
    "Social & Growth Marketing",
    "Future Leaders",
  ],
  authors: [{ name: "Future Leaders Team" }],
  openGraph: {
    title: "Future Leaders — Web3 Growth & Community Agency",
    description:
      "Future Leaders helps Web3 projects grow through KOL marketing, community management, partnerships, social & growth marketing, and technical services.",
    url: "https://futureleaders.io",
    siteName: "Future Leaders",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Leaders — Web3 Growth & Community Agency",
    description:
      "Future Leaders helps Web3 projects grow through KOL marketing, community management, partnerships, social & growth marketing, and technical services.",
    creator: "@futureleaders",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} font-sans`}>
      <body className="antialiased selection:bg-purple-100 selection:text-purple-900">
        {children}
      </body>
    </html>
  );
}
