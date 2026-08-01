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
  ChevronDown,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { TourCard } from "@/components/cards/tour-card";
import { BookingForm } from "@/components/forms/booking-form";
import { TourGallery } from "@/components/tours/tour-gallery";
import { RichText } from "@/components/ui/rich-text";
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

      <section className="py-12 sm:py-14 lg:py-20">
        <div className="container-px mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
          {/* Main */}
          <div className="min-w-0">
            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-surface p-4 sm:grid-cols-4 sm:gap-4 sm:p-5">
              <Fact icon={<Clock />} label="Duration" value={`${tour.durationDays}D / ${tour.durationNights}N`} />
              <Fact icon={<Users />} label="Group" value="Private" />
              <Fact icon={<Mountain />} label="Level" value={tour.difficulty} />
              <Fact icon={<Star />} label="Rating" value={`${tour.rating.toFixed(1)}/5`} />
            </div>

            {/* Mobile-only quick CTA (the full booking card sits lower on mobile) */}
            <a
              href="#book"
              className="mt-5 flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 lg:hidden"
            >
              <span>
                <span className="block text-xs text-muted">
                  {tour.price && tour.price > 0 ? "From" : "Pricing"}
                </span>
                <span className="font-heading text-lg font-semibold text-primary">
                  {tour.price && tour.price > 0
                    ? formatPrice(tour.price)
                    : "Price on request"}
                </span>
              </span>
              <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                Request to Book
              </span>
            </a>

            <div className="mt-10 max-w-none">
              <h2 className="font-heading text-2xl font-semibold">Overview</h2>
              {tour.description ? (
                <RichText html={tour.description} className="mt-3" />
              ) : (
                <p className="mt-3 leading-relaxed text-muted">
                  {tour.summary} This {tour.durationDays}-day{" "}
                  {tour.category.toLowerCase()} journey is designed to immerse you
                  in the very best of Sri Lanka.
                </p>
              )}
            </div>

            {/* Highlights */}
            <h2 className="mt-10 font-heading text-2xl font-semibold">Trip Highlights</h2>
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
            <h2 className="mt-12 font-heading text-2xl font-semibold">Day-by-Day Itinerary</h2>
            <div className="mt-6 space-y-3">
              {itinerary.map((d) => (
                <details
                  key={d.day}
                  open={d.day === 1}
                  className="group rounded-2xl border border-border bg-white [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-4 sm:p-5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-white">
                      {d.day}
                    </span>
                    <h3 className="flex-1 font-heading text-base font-semibold sm:text-lg">
                      Day {d.day}: {d.title}
                    </h3>
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="px-4 pb-4 pl-[3.75rem] text-sm text-muted sm:px-5 sm:pb-5 sm:pl-[4rem]">
                    {d.text}
                  </p>
                </details>
              ))}
            </div>

            {/* Inclusions / exclusions */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-heading text-lg font-semibold">What&apos;s included</h3>
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
                <h3 className="font-heading text-lg font-semibold">Not included</h3>
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

            {/* Tour gallery */}
            {tour.gallery && tour.gallery.length > 1 && (
              <div className="mt-12">
                <h2 className="font-heading text-2xl font-semibold">Tour Gallery</h2>
                <p className="mt-1 text-sm text-muted">
                  A glimpse of the places and experiences on this journey.
                </p>
                <div className="mt-5">
                  <TourGallery images={tour.gallery} title={tour.title} />
                </div>
              </div>
            )}
          </div>

          {/* Sticky booking sidebar */}
          <aside id="book" className="min-w-0 scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-end justify-between">
                <div>
                  {tour.price && tour.price > 0 ? (
                    <>
                      <span className="text-sm text-muted">From</span>
                      <p className="font-heading text-3xl font-semibold text-primary">
                        {formatPrice(tour.price)}
                      </p>
                      <span className="text-xs text-muted">per person</span>
                    </>
                  ) : (
                    <>
                      <p className="font-heading text-2xl font-semibold text-primary">
                        Price on request
                      </p>
                      <span className="text-xs text-muted">
                        Rates vary by season &amp; hotel choice
                      </span>
                    </>
                  )}
                </div>
                <span className="flex items-center gap-1 rounded-full bg-secondary/15 px-3 py-1 text-sm font-semibold text-[#8a5a00]">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  {tour.rating.toFixed(1)}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-surface p-3 text-sm text-muted">
                <CalendarDays className="h-4 w-4 text-primary" />
                Free tailor-made quote within 24 hours
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
        <div className="container-px mx-auto max-w-[90rem]">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
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
