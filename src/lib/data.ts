/**
 * Static marketing config for the homepage (not database-managed content).
 * All real content — tours, destinations, blog, reviews, gallery — now lives
 * in the database and is fetched via `src/lib/queries.ts`.
 */

export type Destination = {
  slug: string;
  name: string;
  region: string;
  shortDesc: string;
  description?: string; // HTML
  image: string;
  highlights: string[];
  bestTime?: string;
  featured?: boolean;
  seo?: Seo;
};

export type Seo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  keywords?: string | null;
};

export type Tour = {
  slug: string;
  title: string;
  summary: string;
  description?: string; // HTML
  image: string;
  gallery?: string[];
  price: number;
  durationDays: number;
  durationNights: number;
  category: string;
  difficulty: string;
  rating: number;
  featured?: boolean;
  highlights: string[];
  seo?: Seo;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content?: string; // HTML
  image: string;
  author: string;
  date: string;
  category: string;
  readMinutes: number;
  seo?: Seo;
};

export type Testimonial = {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const experiences = [
  { name: "Wildlife Safaris", image: img("photo-1549366021-9f761d450615"), count: 12 },
  { name: "Beaches & Coast", image: img("photo-1507525428034-b723cf961d3e"), count: 18 },
  { name: "Culture & Heritage", image: img("photo-1588416936097-41850ab3d86d"), count: 21 },
  { name: "Hill Country", image: img("photo-1566296314736-6eaac1ca0cb9"), count: 15 },
  { name: "Adventure", image: img("photo-1602216056096-3b40cc0c9944"), count: 9 },
  { name: "Luxury & Honeymoon", image: img("photo-1512100356356-de1b84283e18"), count: 7 },
];

export const stats = [
  { value: "12+", label: "Years of Experience" },
  { value: "8,500+", label: "Happy Travelers" },
  { value: "50+", label: "Curated Tours" },
  { value: "4.9/5", label: "Average Rating" },
];
