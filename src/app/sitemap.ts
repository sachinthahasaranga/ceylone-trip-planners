import type { MetadataRoute } from "next";
import { destinations, tours, posts } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticPages = [
    "",
    "/destinations",
    "/tours",
    "/blog",
    "/gallery",
    "/about",
    "/contact",
    "/faq",
    "/reviews",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const dynamic = [
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...tours.map((t) => `/tours/${t.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...dynamic];
}
