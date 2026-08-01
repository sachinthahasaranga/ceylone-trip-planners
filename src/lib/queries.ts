import { prisma } from "@/lib/prisma";
import type { Tour, Destination, Post, Testimonial } from "@/lib/data";

/**
 * Data-access layer for public pages — reads exclusively from the database.
 * Run `npm run db:seed` to populate content.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=1200&q=80";

function tourFromDb(t: any): Tour {
  return {
    slug: t.slug,
    title: t.title,
    summary: t.summary ?? "",
    description: t.description ?? "",
    image: t.coverImage || t.gallery?.[0] || FALLBACK_IMG,
    gallery: t.gallery ?? [],
    price: t.price,
    durationDays: t.durationDays,
    durationNights: t.durationNights ?? Math.max(0, t.durationDays - 1),
    category: t.category?.name ?? "Tour",
    difficulty: t.difficulty ?? "Easy",
    rating: t.rating ?? 5,
    featured: t.featured,
    highlights: t.highlights?.length ? t.highlights : (t.inclusions ?? []).slice(0, 3),
    seo: seoFrom(t),
  };
}

function seoFrom(r: any) {
  return {
    metaTitle: r.metaTitle ?? null,
    metaDescription: r.metaDescription ?? null,
    ogImage: r.ogImage ?? null,
    keywords: r.keywords ?? null,
  };
}

function destinationFromDb(d: any): Destination {
  return {
    slug: d.slug,
    name: d.name,
    region: d.region ?? "Sri Lanka",
    shortDesc: d.shortDesc ?? "",
    description: d.description ?? "",
    image: d.coverImage || d.gallery?.[0] || FALLBACK_IMG,
    highlights: d.highlights ?? [],
    bestTime: d.bestTime ?? "",
    featured: d.featured,
    seo: seoFrom(d),
  };
}

function postFromDb(p: any): Post {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    content: p.content ?? "",
    image: p.coverImage || FALLBACK_IMG,
    author: p.author ?? "Ceylon Trip Planners",
    date: (p.publishedAt ?? p.createdAt ?? new Date()).toISOString(),
    category: p.tags?.[0] ?? "Travel",
    readMinutes: p.readMinutes ?? 5,
    seo: seoFrom(p),
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
    return rows.map(tourFromDb);
  } catch {
    return [];
  }
}

export async function getTour(slug: string): Promise<Tour | null> {
  try {
    const t = await prisma.tourPackage.findUnique({
      where: { slug },
      include: { category: true },
    });
    return t ? tourFromDb(t) : null;
  } catch {
    return null;
  }
}

/* ------------------------------ Destinations ----------------------------- */

export async function getDestinations(): Promise<Destination[]> {
  try {
    const rows = await prisma.destination.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(destinationFromDb);
  } catch {
    return [];
  }
}

export async function getDestination(slug: string): Promise<Destination | null> {
  try {
    const d = await prisma.destination.findUnique({ where: { slug } });
    return d ? destinationFromDb(d) : null;
  } catch {
    return null;
  }
}

/* ---------------------------------- Blog --------------------------------- */

export async function getPosts(): Promise<Post[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    return rows.map(postFromDb);
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const p = await prisma.blogPost.findUnique({ where: { slug } });
    return p ? postFromDb(p) : null;
  } catch {
    return null;
  }
}

/* ------------------------------ Testimonials ----------------------------- */

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const rows = await prisma.review.findMany({
      where: { approved: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 12,
    });
    return rows.map((r) => ({
      name: r.authorName,
      location: r.location ?? "",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        r.authorName
      )}&backgroundColor=0e7c66`,
      rating: r.rating,
      text: r.content,
    }));
  } catch {
    return [];
  }
}

/* ---------------------------------- FAQ ---------------------------------- */

export type FaqItem = { question: string; answer: string };

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const rows = await prisma.faq.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map((f) => ({ question: f.question, answer: f.answer }));
  } catch {
    return [];
  }
}

/* -------------------------------- Gallery -------------------------------- */

export type GalleryItem = { url: string; caption: string; category: string };

export async function getGalleryImages(): Promise<GalleryItem[]> {
  try {
    const rows = await prisma.galleryImage.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map((g) => ({
      url: g.url,
      caption: g.caption ?? "",
      category: g.category ?? "Sri Lanka",
    }));
  } catch {
    return [];
  }
}
