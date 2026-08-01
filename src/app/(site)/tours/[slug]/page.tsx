import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Clock,
  Users,
  Mountain,
  Star,
  Check,
  X,
  MapPin,
  CalendarDays,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { TourCard } from "@/components/cards/tour-card";
import { BookingForm } from "@/components/forms/booking-form";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { getTour, getTours } from "@/lib/queries";

export async function generateStaticParams() {
  const tours = await getTours();
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) return { title: "Tour not found" };
  return {
    title: tour.title,
    description: tour.summary,
    openGraph: { images: [tour.image] },
  };
}

const inclusions = [
  "Airport transfers & private A/C vehicle",
  "English-speaking chauffeur guide",
  "Handpicked boutique accommodation",
  "Daily breakfast & selected meals",
  "All entrance fees & activities listed",
  "Bottled water & local SIM card",
];
const exclusions = [
  "International flights",
  "Visa fees (ETA)",
  "Travel insurance",
  "Lunch & dinner unless specified",
  "Personal expenses & tips",
];

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) notFound();

  const allTours = await getTours();
  const related = allTours.filter((t) => t.slug !== tour.slug).slice(0, 3);

  const itinerary = Array.from({ length: tour.durationDays }).map((_, i) => ({
    day: i + 1,
    title:
      i === 0
        ? "Arrival & welcome"
        : i === tour.durationDays - 1
          ? "Departure"
          : `Exploring ${tour.highlights[i % tour.highlights.length]}`,
    text: "Enjoy a thoughtfully paced day with your private guide, blending iconic highlights with hidden local gems, comfortable travel and time to relax.",
  }));

  return (
    <>
      <PageHeader
        title={tour.title}
        subtitle={tour.summary}
        image={tour.image}
        crumbs={[{ label: "Tours", href: "/tours" }, { label: tour.title }]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-px mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main */}
          <div>
            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-surface p-5 sm:grid-cols-4">
              <Fact icon={<Clock />} label="Duration" value={`${tour.durationDays}D / ${tour.durationNights}N`} />
              <Fact icon={<Users />} label="Group" value="Private" />
              <Fact icon={<Mountain />} label="Level" value={tour.difficulty} />
              <Fact icon={<Star />} label="Rating" value={`${tour.rating.toFixed(1)}/5`} />
            </div>

            <div className="prose mt-10 max-w-none">
              <h2 className="font-heading text-2xl font-bold">Overview</h2>
              <p className="mt-3 leading-relaxed text-muted">
                {tour.summary} This {tour.durationDays}-day {tour.category.toLowerCase()} journey
                is designed to immerse you in the very best of Sri Lanka. Travel
                in comfort with a private guide, stay in characterful boutique
                properties and experience a seamless blend of iconic sights and
                authentic local moments — all at a relaxed, unhurried pace.
              </p>
            </div>

            {/* Highlights */}
            <h2 className="mt-10 font-heading text-2xl font-bold">Trip Highlights</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {tour.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3 rounded-xl border border-border bg-white p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{h}</span>
                </div>
              ))}
            </div>

            {/* Itinerary */}
            <h2 className="mt-12 font-heading text-2xl font-bold">Day-by-Day Itinerary</h2>
            <div className="mt-6 space-y-4">
              {itinerary.map((d) => (
                <div key={d.day} className="relative rounded-2xl border border-border bg-white p-6 pl-16">
                  <span className="absolute left-5 top-6 grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-white">
                    {d.day}
                  </span>
                  <h3 className="font-heading text-lg font-bold">
                    Day {d.day}: {d.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted">{d.text}</p>
                </div>
              ))}
            </div>

            {/* Inclusions / exclusions */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-heading text-lg font-bold">What&apos;s included</h3>
                <ul className="mt-4 space-y-2.5">
                  {inclusions.map((x) => (
                    <li key={x} className="flex gap-3 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-heading text-lg font-bold">Not included</h3>
                <ul className="mt-4 space-y-2.5">
                  {exclusions.map((x) => (
                    <li key={x} className="flex gap-3 text-sm text-muted">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sticky booking sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-sm text-muted">From</span>
                  <p className="font-heading text-3xl font-bold text-primary">
                    {formatPrice(tour.price)}
                  </p>
                  <span className="text-xs text-muted">per person</span>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-secondary/15 px-3 py-1 text-sm font-semibold text-[#8a5a00]">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  {tour.rating.toFixed(1)}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-surface p-3 text-sm text-muted">
                <CalendarDays className="h-4 w-4 text-primary" />
                Free cancellation up to 30 days before travel
              </div>

              <div className="mt-6">
                <BookingForm tourSlug={tour.slug} tourTitle={tour.title} price={tour.price} />
              </div>

              <p className="mt-4 text-center text-xs text-muted">
                No payment now — we&apos;ll confirm availability & details by email.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              You may also like
            </h2>
            <Button href="/tours" variant="ghost">
              All tours
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-primary shadow-sm">
        {icon}
      </span>
      <span>
        <span className="block text-xs text-muted">{label}</span>
        <span className="block text-sm font-semibold">{value}</span>
      </span>
    </div>
  );
}
