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
