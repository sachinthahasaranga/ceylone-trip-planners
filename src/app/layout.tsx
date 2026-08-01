import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ceylon Trip Planners — Discover the Wonder of Sri Lanka",
    template: "%s | Ceylon Trip Planners",
  },
  description:
    "Bespoke Sri Lanka tours & holiday packages. Wildlife safaris, hill country, golden beaches and ancient culture — crafted by local experts.",
  keywords: [
    "Sri Lanka tours",
    "Ceylon travel",
    "Sri Lanka holiday packages",
    "Sri Lanka safari",
    "Sigiriya",
    "Ella",
    "tour operator Sri Lanka",
  ],
  openGraph: {
    type: "website",
    siteName: "Ceylon Trip Planners",
    title: "Ceylon Trip Planners — Discover the Wonder of Sri Lanka",
    description:
      "Bespoke Sri Lanka tours & holiday packages crafted by local experts.",
    url: siteUrl,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
