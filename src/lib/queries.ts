import { prisma } from "@/lib/prisma";
import * as dummy from "@/lib/data";
import type { Tour, Destination, Post } from "@/lib/data";

/**
 * Data-access layer for public pages.
 * Reads from the database; falls back to bundled dummy data when the DB is
 * empty or unreachable, so the site always renders something sensible.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

function tourFromDb(t: any): Tour {
  return {
    slug: t.slug,
    title: t.title,
    summary: t.summary ?? "",
    image:
      t.coverImage ||
      t.gallery?.[0] ||
      "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=1200&q=80",
    price: t.price,
    durationDays: t.durationDays,
    durationNights: t.durationNights ?? Math.max(0, t.durationDays - 1),
    category: t.category?.name ?? "Tour",
    difficulty: t.difficulty ?? "Easy",
    rating: t.rating ?? 5,
    featured: t.featured,
    highlights:
      t.highlights?.length ? t.highlights : (t.inclusions ?? []).slice(0, 3),
  };
}

function destinationFromDb(d: any): Destination {
  return {
    slug: d.slug,
    name: d.name,
    region: d.region ?? "Sri Lanka",
    shortDesc: d.shortDesc ?? "",
    image:
      d.coverImage ||
      d.gallery?.[0] ||
      "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=1200&q=80",
    highlights: d.highlights ?? [],
    featured: d.featured,
  };
}

function postFromDb(p: any): Post {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    image:
      p.coverImage ||
      "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80",
    author: p.author ?? "Ceylon Trip Planners",
    date: (p.publishedAt ?? p.createdAt ?? new Date()).toISOString(),
    category: p.tags?.[0] ?? "Travel",
    readMinutes: p.readMinutes ?? 5,
  };
}

/* --------------------------------- Tours --------------------------------- */

export async function getTours(): Promise<Tour[]> {
  try {
    const rows = await prisma.tourPackage.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    if (rows.length) return rows.map(tourFromDb);
  } catch {}
  return dummy.tours;
}

export async function getTour(slug: string): Promise<Tour | null> {
  try {
    const t = await prisma.tourPackage.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (t) return tourFromDb(t);
  } catch {}
  return dummy.tours.find((x) => x.slug === slug) ?? null;
}

/* ------------------------------ Destinations ----------------------------- */

export async function getDestinations(): Promise<Destination[]> {
  try {
    const rows = await prisma.destination.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    if (rows.length) return rows.map(destinationFromDb);
  } catch {}
  return dummy.destinations;
}

export async function getDestination(slug: string): Promise<Destination | null> {
  try {
    const d = await prisma.destination.findUnique({ where: { slug } });
    if (d) return destinationFromDb(d);
  } catch {}
  return dummy.destinations.find((x) => x.slug === slug) ?? null;
}

/* ---------------------------------- Blog --------------------------------- */

export async function getPosts(): Promise<Post[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    if (rows.length) return rows.map(postFromDb);
  } catch {}
  return dummy.posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const p = await prisma.blogPost.findUnique({ where: { slug } });
    if (p) return postFromDb(p);
  } catch {}
  return dummy.posts.find((x) => x.slug === slug) ?? null;
}
