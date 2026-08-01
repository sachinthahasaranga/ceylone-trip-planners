import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Map,
  Headphones,
  Search,
  CalendarCheck,
  Plane,
  Star,
} from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Testimonials } from "@/components/home/testimonials";
import { TourCard } from "@/components/cards/tour-card";
import { DestinationCard } from "@/components/cards/destination-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { experiences, galleryImages, stats } from "@/lib/data";
import { getDestinations, getTours, getPosts } from "@/lib/queries";

export default async function HomePage() {
  const [destinations, tours, posts] = await Promise.all([
    getDestinations(),
    getTours(),
    getPosts(),
  ]);
  const featuredDestinations =
    destinations.filter((d) => d.featured).slice(0, 4).length > 0
      ? destinations.filter((d) => d.featured).slice(0, 4)
      : destinations.slice(0, 4);
  const featuredTours =
    tours.filter((t) => t.featured).slice(0, 3).length > 0
      ? tours.filter((t) => t.featured).slice(0, 3)
      : tours.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Trust bar */}
      <section className="border-b border-border bg-white">
        <div className="container-px mx-auto grid max-w-7xl grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured destinations */}
      <section className="py-20 lg:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Where to go"
              title="Featured Destinations"
              subtitle="Handpicked places that capture the soul of the island."
              className="mx-0"
            />
            <Button href="/destinations" variant="ghost" className="shrink-0">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featuredDestinations.map((d, idx) => (
              <DestinationCard
                key={d.slug}
                destination={d}
                className={idx === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Curated by interest"
            title="Travel by Experience"
            subtitle="Whatever moves you — wildlife, culture, coastline or adventure — we have a journey for it."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {experiences.map((e) => (
              <Link
                key={e.name}
                href="/tours"
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={e.image}
                    alt={e.name}
                    fill
                    sizes="(max-width:768px) 50vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="font-heading text-sm font-bold leading-tight">
                    {e.name}
                  </p>
                  <p className="text-xs text-white/70">{e.count} tours</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular tours */}
      <section className="py-20 lg:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Best sellers"
              title="Popular Tour Packages"
              subtitle="Our most-loved itineraries, ready to book or tailor to you."
              className="mx-0"
            />
            <Button href="/tours" variant="ghost" className="shrink-0">
              All packages <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden bg-[#0a1a17] py-20 text-white lg:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            light
            eyebrow="Why Ceylon Trip Planners"
            title="Travel with people who know the island"
            subtitle="Local expertise, honest pricing and care at every step of your journey."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Map,
                title: "Local Experts",
                text: "Born-and-raised guides who reveal the Sri Lanka guidebooks miss.",
              },
              {
                icon: HeartHandshake,
                title: "Tailor-Made",
                text: "Every itinerary shaped around your pace, interests and budget.",
              },
              {
                icon: ShieldCheck,
                title: "Trusted & Safe",
                text: "Licensed, insured and rated 4.9/5 by thousands of travelers.",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                text: "A real person on call throughout your entire trip.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10 transition-colors hover:bg-white/10"
              >
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-secondary text-[#3a2a00]">
                  <f.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-white/70">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Simple & stress-free"
            title="How It Works"
            subtitle="Three easy steps from dream to departure."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Search,
                step: "01",
                title: "Discover",
                text: "Browse tours or tell us your dream trip and interests.",
              },
              {
                icon: CalendarCheck,
                step: "02",
                title: "Customise & Book",
                text: "We tailor the itinerary, confirm details and lock your dates.",
              },
              {
                icon: Plane,
                step: "03",
                title: "Travel & Enjoy",
                text: "Meet your guide and explore — we handle everything else.",
              },
            ].map((s) => (
              <div key={s.step} className="relative text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
                  <s.icon className="h-9 w-9" />
                </div>
                <span className="mt-4 block font-heading text-sm font-bold tracking-widest text-secondary">
                  STEP {s.step}
                </span>
                <h3 className="mt-1 font-heading text-xl font-bold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Blog preview */}
      <section className="py-20 lg:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Travel journal"
              title="Stories & Travel Tips"
              subtitle="Inspiration and practical advice for your Sri Lanka adventure."
              className="mx-0"
            />
            <Button href="/blog" variant="ghost" className="shrink-0">
              Read the blog <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-border/60 transition hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary">
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted">
                    {new Date(p.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {p.readMinutes} min read
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Postcards"
            title="Moments from Sri Lanka"
            subtitle="A glimpse of the beauty that awaits."
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {galleryImages.slice(0, 8).map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl ${
                  i === 0 || i === 5 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`Sri Lanka gallery ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/gallery" variant="primary">
              View full gallery
            </Button>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden py-24">
        <Image
          src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=2000&q=80"
          alt="Sri Lanka hill country"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/85" />
        <div className="container-px relative mx-auto max-w-3xl text-center text-white">
          <Star className="mx-auto h-8 w-8 fill-secondary text-secondary" />
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ready to plan your dream Sri Lanka trip?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Tell us what you love and we&apos;ll craft a personalised itinerary,
            free of charge. No obligation, just possibilities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg" variant="secondary">
              Start Planning Free
            </Button>
            <Button href="/tours" size="lg" variant="outline">
              Browse Tours
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
