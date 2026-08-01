/**
 * SEO helpers — site constants, JSON-LD structured data builders and a
 * <JsonLd> component. Keeps structured data consistent across pages.
 */

export const SITE = {
  name: "Ceylon Trip Planners",
  legalName: "Ceylon Trip Planners (Pvt) Ltd",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Bespoke Sri Lanka tours & holiday packages. Wildlife safaris, hill country, golden beaches and ancient culture — crafted by local experts.",
  phone: "+94712758785",
  email: "info@ceylontripplanners.com",
  logo: "/ceylonetripplanners_logo_black.webp",
  address: {
    street: "No 125, Winsant Park",
    locality: "Negombo",
    country: "LK",
  },
  // Add your real social profile URLs here (helps Google connect your brand):
  sameAs: [] as string[],
};

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE.url}${path}`);

/* -------------------------- Organization (sitewide) ---------------------- */

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: abs(SITE.logo),
    image: abs(SITE.logo),
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressCountry: SITE.address.country,
    },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
  };
}

/* ------------------------------ Breadcrumbs ------------------------------ */

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/* --------------------------------- Tour ---------------------------------- */

export function tourJsonLd(tour: {
  slug: string;
  title: string;
  summary: string;
  image: string;
  durationDays: number;
  category: string;
  price?: number | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary,
    image: abs(tour.image),
    url: abs(`/tours/${tour.slug}`),
    touristType: tour.category,
    provider: {
      "@type": "TravelAgency",
      name: SITE.name,
      url: SITE.url,
    },
    ...(tour.price && tour.price > 0
      ? {
          offers: {
            "@type": "Offer",
            price: tour.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

/* -------------------------------- Article -------------------------------- */

export function articleJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: abs(post.image),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: abs(SITE.logo) },
    },
    mainEntityOfPage: abs(`/blog/${post.slug}`),
  };
}

/* ---------------------------------- FAQ ---------------------------------- */

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
