import Image from "next/image";
import Link from "next/link";
import { Clock, Star, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Tour } from "@/lib/data";

export function TourCard({ tour }: { tour: Tour }) {
  const hasPrice = !!tour.price && tour.price > 0;

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group relative block overflow-hidden rounded-[1.75rem] shadow-[0_18px_40px_-22px_rgba(20,32,29,0.5)] transition-transform duration-300 hover:-translate-y-1.5"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        {/* Gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
      </div>

      {/* Top row: featured / price + rating */}
      <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
        <div className="flex flex-col items-start gap-2">
          {tour.featured && (
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-[#3a2a00] shadow-sm">
              Most Popular
            </span>
          )}
          {hasPrice && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
              From {formatPrice(tour.price!)}
            </span>
          )}
        </div>
        <span className="flex items-center gap-1 rounded-full bg-black/35 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
          {tour.rating.toFixed(1)}
        </span>
      </div>

      {/* Bottom content overlaid on the image */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          {tour.category}
        </span>
        <h3 className="mt-1.5 font-heading text-2xl font-semibold leading-tight drop-shadow-sm">
          {tour.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/85">
          <Clock className="h-4 w-4" />
          {tour.durationDays} Days &amp; {tour.durationNights} Nights
        </p>

        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-text transition-colors duration-300 group-hover:bg-secondary">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
