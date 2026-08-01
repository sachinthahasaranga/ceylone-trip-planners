# Ceylon Trip Planners

A premium, fully responsive tourism website for Sri Lanka — built with Next.js 15, Tailwind CSS v4, Prisma + Neon (Postgres), Cloudinary, NextAuth v5 and MailerSend.

## Features

- **Public site** — Home, Destinations, Tours, Blog, Gallery, About, Contact, FAQ, Reviews (all responsive, editorial design)
- **Admin panel** (`/admin`) — full CRUD for Destinations, Tours, Blog, plus Bookings, Enquiries, Reviews, Subscribers and Site Settings
- **Auth** — Google login + email/password (NextAuth v5), role-based access (USER / ADMIN)
- **Booking enquiries** & contact forms with MailerSend email notifications
- **Media** — direct signed uploads to Cloudinary from the admin
- **SEO** — per-page metadata, dynamic `sitemap.xml` & `robots.txt`
- **Design tokens** — colors & fonts defined once as CSS variables in `src/app/globals.css`

## Getting started

```bash
npm install          # install dependencies
npm run db:push      # sync Prisma schema to the database
npm run db:seed      # seed sample content + admin user
npm run dev          # start dev server at http://localhost:3000
```

### Default admin login (from seed)

- URL: `http://localhost:3000/login`
- Email: `admin@ceylontripplanners.com`
- Password: `Admin@123`

Then visit `/admin`. **Change this password before going live.**

## Environment variables

Copy `.env.example` to `.env` and fill in values. Keys already configured: `DATABASE_URL` (Neon), Cloudinary. Still needed for full functionality:

| Key | Purpose |
|-----|---------|
| `AUTH_SECRET` | run `openssl rand -base64 32` |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth (Google Cloud Console → OAuth credentials, redirect URI `http://localhost:3000/api/auth/callback/google`) |
| `MAILERSEND_API_KEY` | transactional email (contact/booking confirmations) |

### Cloudinary upload

Admin image uploads use **signed** uploads — no preset needed; the keys in `.env` are enough.

## Design system

Change the site's entire look from `src/app/globals.css`:

```css
--color-primary: #0e7c66;   /* brand green */
--color-secondary: #f4a300; /* gold */
--font-heading / --font-body
```

## Tech notes

- Public pages read from the database and **fall back to bundled demo data** (`src/lib/data.ts`) when the DB is empty — so the site always renders.
- Content added in the admin panel appears on the public site automatically.
- Route protection is enforced in `src/middleware.ts` (`/admin` = ADMIN only, `/account` = logged in).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run db:push` | Push schema to DB |
| `npm run db:seed` | Seed sample data |
| `npm run db:studio` | Open Prisma Studio |
