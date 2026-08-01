import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
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
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/fav_icons/favicon.ico", sizes: "any" },
      { url: "/fav_icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/fav_icons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/fav_icons/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/fav_icons/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/fav_icons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/fav_icons/favicon.ico"],
  },
};

export const viewport = {
  themeColor: "#0e7c66",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
