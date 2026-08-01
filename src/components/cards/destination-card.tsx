import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Destination } from "@/lib/data";
import { cn } from "@/lib/utils";

export function DestinationCard({
  destination,
  className,
}: {
  destination: Destination;
  className?: string;
}) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="relative h-full min-h-[280px] w-full">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-secondary">
          <MapPin className="h-3.5 w-3.5" />
          {destination.region}
        </span>
        <h3 className="font-heading text-2xl font-semibold text-white">
          {destination.name}
        </h3>
        <p className="mt-1 line-clamp-2 max-w-sm text-sm text-white/80">
          {destination.shortDesc}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          Explore <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
