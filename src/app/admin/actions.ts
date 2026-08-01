"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { slugify } from "@/lib/utils";

async function assertAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
}

const str = (fd: FormData, k: string) => (fd.get(k) as string) || "";
const list = (fd: FormData, k: string) =>
  str(fd, k)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
const lines = (fd: FormData, k: string) =>
  str(fd, k)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
const bool = (fd: FormData, k: string) => fd.get(k) === "on";
const num = (fd: FormData, k: string) => Number(str(fd, k) || 0);

/* --------------------------------- Destinations -------------------------- */

export async function saveDestination(id: string | null, fd: FormData) {
  await assertAdmin();
  const name = str(fd, "name");
  const gallery = list(fd, "gallery");
  const slug = str(fd, "slug") || slugify(name);
  const data = {
    name,
    slug,
    region: str(fd, "region"),
    shortDesc: str(fd, "shortDesc"),
    description: str(fd, "description"),
    coverImage: str(fd, "coverImage") || gallery[0] || null,
    gallery,
    highlights: lines(fd, "highlights"),
    bestTime: str(fd, "bestTime"),
    featured: bool(fd, "featured"),
    published: bool(fd, "published"),
    metaTitle: str(fd, "metaTitle") || null,
    metaDescription: str(fd, "metaDescription") || null,
  };

  if (id) await prisma.destination.update({ where: { id }, data });
  else await prisma.destination.create({ data });

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  revalidatePath(`/destinations/${slug}`);
  revalidatePath("/");
  redirect("/admin/destinations");
}

/* ------------------------------------ Tours ------------------------------ */

export async function saveTour(id: string | null, fd: FormData) {
  await assertAdmin();
  const title = str(fd, "title");
  const gallery = list(fd, "gallery");
  const slug = str(fd, "slug") || slugify(title);
  const data = {
    title,
    slug,
    summary: str(fd, "summary"),
    description: str(fd, "description"),
    coverImage: str(fd, "coverImage") || gallery[0] || null,
    gallery,
    price: num(fd, "price"),
    durationDays: num(fd, "durationDays"),
    durationNights: num(fd, "durationNights"),
    difficulty: str(fd, "difficulty"),
    groupSize: str(fd, "groupSize"),
    categoryId: str(fd, "categoryId") || null,
    inclusions: lines(fd, "inclusions"),
    exclusions: lines(fd, "exclusions"),
    featured: bool(fd, "featured"),
    published: bool(fd, "published"),
    metaTitle: str(fd, "metaTitle") || null,
    metaDescription: str(fd, "metaDescription") || null,
  };

  if (id) await prisma.tourPackage.update({ where: { id }, data });
  else await prisma.tourPackage.create({ data });

  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  revalidatePath(`/tours/${slug}`);
  revalidatePath("/");
  redirect("/admin/tours");
}

/* ------------------------------------ Blog ------------------------------- */

export async function saveBlogPost(id: string | null, fd: FormData) {
  await assertAdmin();
  const title = str(fd, "title");
  const slug = str(fd, "slug") || slugify(title);
  const data = {
    title,
    slug,
    excerpt: str(fd, "excerpt"),
    content: str(fd, "content"),
    coverImage: str(fd, "coverImage") || null,
    author: str(fd, "author"),
    readMinutes: num(fd, "readMinutes") || 5,
    tags: list(fd, "tags"),
    featured: bool(fd, "featured"),
    published: bool(fd, "published"),
    metaTitle: str(fd, "metaTitle") || null,
    metaDescription: str(fd, "metaDescription") || null,
  };

  if (id) await prisma.blogPost.update({ where: { id }, data });
  else await prisma.blogPost.create({ data });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin/blog");
}

/* --------------------------------- Bookings ------------------------------ */

export async function updateBookingStatus(id: string, status: string) {
  await assertAdmin();
  await prisma.booking.update({
    where: { id },
    // @ts-expect-error status is a validated enum string
    data: { status },
  });
  revalidatePath("/admin/bookings");
}

/* --------------------------------- Enquiries ----------------------------- */

export async function toggleEnquiryRead(id: string, read: boolean) {
  await assertAdmin();
  await prisma.enquiry.update({ where: { id }, data: { read } });
  revalidatePath("/admin/enquiries");
}

/* ---------------------------------- Reviews ------------------------------ */

export async function updateReview(id: string, data: { approved?: boolean; featured?: boolean }) {
  await assertAdmin();
  await prisma.review.update({ where: { id }, data });
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

/* --------------------------------- Gallery ------------------------------- */

export async function addGalleryImages(fd: FormData) {
  await assertAdmin();
  const urls = list(fd, "urls");
  const caption = str(fd, "caption") || null;
  const category = str(fd, "category") || null;
  if (urls.length === 0) return;

  const start = await prisma.galleryImage.count();
  await prisma.galleryImage.createMany({
    data: urls.map((url, i) => ({ url, caption, category, order: start + i })),
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

/* --------------------------------- Generic delete ------------------------ */

type Model =
  | "destination"
  | "tourPackage"
  | "blogPost"
  | "booking"
  | "enquiry"
  | "review"
  | "galleryImage";

export async function deleteRecord(model: Model, id: string, path: string) {
  await assertAdmin();
  // @ts-expect-error dynamic model access
  await prisma[model].delete({ where: { id } });
  revalidatePath(path);
  // Refresh matching public pages
  const publicPath: Partial<Record<Model, string>> = {
    destination: "/destinations",
    tourPackage: "/tours",
    blogPost: "/blog",
    review: "/reviews",
    galleryImage: "/gallery",
  };
  if (publicPath[model]) revalidatePath(publicPath[model]!);
  revalidatePath("/");
}

/* --------------------------------- Settings ------------------------------ */

export async function saveSettings(fd: FormData) {
  await assertAdmin();
  const data = {
    siteName: str(fd, "siteName") || "Ceylon Trip Planners",
    tagline: str(fd, "tagline"),
    phone: str(fd, "phone"),
    whatsapp: str(fd, "whatsapp"),
    email: str(fd, "email"),
    address: str(fd, "address"),
    facebook: str(fd, "facebook"),
    instagram: str(fd, "instagram"),
    heroTitle: str(fd, "heroTitle"),
    heroSubtitle: str(fd, "heroSubtitle"),
    metaTitle: str(fd, "metaTitle"),
    metaDescription: str(fd, "metaDescription"),
  };
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    create: { id: "default", ...data },
    update: data,
  });
  revalidatePath("/admin/settings");
}
