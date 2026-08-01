# Ceylon Trip Planners — Full Implementation Plan

> Status: Draft for review (Plan 1)
> Locked decisions: Auth = Google + Email/Password (hashed) · Booking = Enquiry/request flow (no online payment) · Design = Elegant editorial (Playfair headings + Inter body, emerald/gold palette)

---

## 1. Tech Stack (final)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router, Server Components) | SSR/SSG for SEO, fast |
| Styling | **Tailwind CSS v4** + CSS variables (design tokens) | Global colors/fonts requirement |
| UI kit | **shadcn/ui** (Radix + Tailwind, free) + **Framer Motion** | Premium, accessible, animatable |
| ORM | **Prisma** | Chosen |
| Database | **Neon** (Postgres, serverless) | Chosen |
| Media | **Cloudinary** (images + video) | Chosen |
| Auth | **Auth.js (NextAuth v5)** — Google + Email/Password credentials | Google login + customer login |
| Email | **MailerSend** (transactional API) | Booking confirmations, contact, OTP |
| Forms/validation | **React Hook Form + Zod** | Type-safe, shared client/server schemas |
| Data fetching | Server Actions + Route Handlers | Simpler than a separate API layer |
| Deployment | **Vercel** | Native Next.js |

---

## 2. Pages (Public Site)

| # | Route | Purpose |
|---|---|---|
| 1 | `/` | Home / Landing |
| 2 | `/destinations` | All places/destinations grid + filters |
| 3 | `/destinations/[slug]` | Single destination detail |
| 4 | `/tours` (or `/packages`) | All tour packages + filters (price, days, type) |
| 5 | `/tours/[slug]` | Single tour package detail + booking |
| 6 | `/blog` | Blog listing + categories |
| 7 | `/blog/[slug]` | Single blog article |
| 8 | `/about` | About us / story / team |
| 9 | `/contact` | Contact form + map + info |
| 10 | `/gallery` | Photo/video gallery (Cloudinary) |
| 11 | `/faq` | Frequently asked questions |
| 12 | `/book/[tourSlug]` | Booking / enquiry flow |
| 13 | `/reviews` (optional) | Testimonials |
| 14 | `/login`, `/register` | Customer auth (Google + email) |
| 15 | `/account` | Customer dashboard (bookings, profile, wishlist) |
| 16 | `/privacy`, `/terms` | Legal |
| 17 | `sitemap.xml`, `robots.txt` | Auto-generated SEO |

Admin (protected `/admin/*`) — see section 4.

---

## 3. Sections per Page

### Home `/`
- Sticky navbar (transparent → solid on scroll)
- Hero: full-screen video/image slider, headline, search bar (destination / days / budget), CTA
- Trust bar (years, happy travelers, tours, rating)
- Featured Destinations (cards, hover zoom)
- Popular Tour Packages (price, duration, rating, "Book now")
- "Why choose us" (icon feature grid)
- How it works (3–4 steps)
- Experiences / categories (Wildlife, Beaches, Culture, Hill Country, Adventure)
- Testimonials carousel
- Featured blog posts
- Gallery preview strip
- Newsletter signup (MailerSend)
- CTA banner ("Plan your custom trip")
- Rich footer (links, contact, socials, payment/trust badges)

### Destinations list
Hero, filter/search sidebar, card grid, pagination, CTA.

### Destination detail
Image gallery, overview, highlights, best time to visit, things to do, map, related tours, related blogs, enquiry CTA.

### Tours list
Filters (category, duration, price range, difficulty), sort, cards, pagination.

### Tour detail
Image/video gallery, price + duration badge, overview, **day-by-day itinerary (accordion)**, inclusions/exclusions, map, gallery, reviews, sticky booking card (date picker, travelers, price calc), FAQ, related tours.

### Blog list
Featured post, category tabs, search, card grid.

### Blog detail
Cover, author, reading time, TOC, body (rich content), share buttons, related posts, comment/CTA.

### About
Story, mission, timeline, team grid, stats, partners.

### Contact
Form (name/email/phone/message → MailerSend), office info, Google map, socials, WhatsApp button.

### Gallery
Masonry, lightbox, image/video filter tabs.

### Account
My bookings (status), profile edit, wishlist, saved enquiries.

---

## 4. Admin Panel — Features & Functions

Protected under `/admin`, role-gated (`ADMIN`). Sidebar layout, data tables, forms with Cloudinary uploads.

### Modules (full CRUD each)

| Module | Functions |
|---|---|
| **Dashboard** | Stats (bookings, enquiries, users, revenue), recent activity, charts |
| **Destinations** | Add/edit/delete, images (Cloudinary), highlights, map coords, SEO fields, publish toggle, featured toggle |
| **Tour Packages** | Add/edit/delete, price, duration, category, **itinerary builder (day-by-day)**, inclusions/exclusions, gallery, link to destinations, SEO, featured/publish |
| **Blog** | Rich text editor, cover image, category/tags, author, SEO, draft/publish/schedule |
| **Categories & Tags** | Manage for tours + blogs |
| **Bookings** | View, filter, change status (pending/confirmed/cancelled), send email to customer |
| **Enquiries / Contact messages** | View, mark read, reply via email |
| **Reviews / Testimonials** | Approve/reject, feature |
| **Gallery / Media** | Cloudinary media library, upload, delete |
| **Users / Customers** | List, view, role management, block |
| **Newsletter subscribers** | List, export CSV |
| **FAQ** | Add/edit/reorder |
| **Site Settings** | Contact info, socials, hero content, homepage featured selection, SEO defaults, colors/logo |
| **SEO Manager** | Per-page meta title/description, OG image, keywords |

### Admin features
Search + filters + pagination on every table, image/video upload widget (Cloudinary signed uploads), form validation (Zod), toast notifications, confirm dialogs on delete, slug auto-generation, draft vs publish, timestamps, mobile-responsive.

---

## 5. SEO Handling

- **Next.js Metadata API** — `generateMetadata()` per dynamic page pulling title/description/OG from DB.
- Per-entity SEO fields in DB (`metaTitle`, `metaDescription`, `ogImage`, `keywords`, `canonical`) editable in admin.
- **JSON-LD structured data**: `TouristTrip`/`Product` for tours, `Article` for blog, `Organization` + `BreadcrumbList` sitewide.
- Auto **`sitemap.xml`** (`app/sitemap.ts`) and **`robots.txt`**.
- Open Graph + Twitter cards; Cloudinary-optimized OG images.
- Semantic HTML, `next/image` (lazy, responsive, required alt text), fast Core Web Vitals via SSG/ISR.
- Clean slugs, canonical URLs, `hreflang`-ready.

---

## 6. Design System — Global Colors & Fonts

Defined once as **CSS variables** in `globals.css` + mapped into Tailwind theme, so changing a variable restyles the whole site.

```css
:root {
  --color-primary: #0E7C66;      /* Ceylon emerald/teal */
  --color-primary-dark: #0A5C4B;
  --color-secondary: #F4A300;    /* warm gold */
  --color-accent: #E85D2A;       /* sunset */
  --color-bg: #FFFFFF;
  --color-surface: #F7F9F8;
  --color-text: #1A2421;
  --color-muted: #6B7A75;
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --radius: 0.75rem;
}
```

Fonts loaded via `next/font`. All components reference tokens (`bg-primary`, `font-heading`) — no hardcoded colors. Exact palette is a placeholder; finalize with brand.

---

## 7. Environment Variables (`.env`)

```env
# Database
DATABASE_URL=                # Neon pooled
DIRECT_URL=                  # Neon direct (migrations)

# Auth
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
NEXTAUTH_URL=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

# Email
MAILERSEND_API_KEY=
MAIL_FROM_EMAIL=
MAIL_FROM_NAME=
ADMIN_NOTIFY_EMAIL=

# Site
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
```

---

## 8. Database Models (Prisma — high level)

`User` (role, googleId, password hash), `Account`/`Session` (Auth.js), `Destination`, `TourPackage`, `ItineraryDay`, `Category`, `Tag`, `BlogPost`, `Booking`, `Enquiry`, `Review`, `Media`, `FAQ`, `NewsletterSubscriber`, `SiteSetting`, `SeoMeta`.

Each content model includes: slug + SEO fields + `published`/`featured` + timestamps.

---

## 9. Build Phases

1. **Setup** — Next.js + Tailwind + shadcn, design tokens, folder structure, `.env`, Prisma + Neon connection.
2. **Schema** — Prisma models, migrations, seed data.
3. **Auth** — Auth.js Google + credentials, roles, protected routes, account pages.
4. **Public UI** — layout/nav/footer, Home, then Destinations, Tours, Blog, static pages.
5. **Media** — Cloudinary signed upload util + widget.
6. **Admin panel** — layout, dashboard, all CRUD modules.
7. **Booking + Email** — booking flow, MailerSend templates (confirmation, enquiry, contact, newsletter).
8. **SEO** — metadata, JSON-LD, sitemap, robots.
9. **Polish** — animations, responsive QA, performance, deploy to Vercel.

---

## 10. Open Items to Confirm Before Building

1. **Accounts/keys ready?** Do you already have Neon, Cloudinary, Google OAuth, and MailerSend accounts/keys — or build against `.env.example` placeholders with a setup guide?
2. **Start point:** Begin coding Phase 1 (scaffold) now, or review full Prisma schema + folder structure first?
