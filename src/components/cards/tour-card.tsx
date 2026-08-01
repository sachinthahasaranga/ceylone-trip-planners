import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Tour } from "@/lib/data";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(20,32,29,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
          {tour.category}
        </span>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
          {tour.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {tour.durationDays}D / {tour.durationNights}N
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {tour.difficulty}
          </span>
        </div>

        <h3 className="font-heading text-lg font-bold leading-snug text-text transition-colors group-hover:text-primary">
          {tour.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">
          {tour.summary}
        </p>

        <div className="mt-4 flex items-end justify-between border-t border-border/70 pt-4">
          <div>
            <span className="text-xs text-muted">From</span>
            <p className="font-heading text-xl font-bold text-primary">
              {formatPrice(tour.price)}
              <span className="text-xs font-normal text-muted"> /person</span>
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            View details
          </span>
        </div>
      </div>
    </Link>
  );
}
