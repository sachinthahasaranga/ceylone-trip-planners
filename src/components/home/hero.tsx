"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MapPin, Calendar, Wallet, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const bg =
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState("");

  function search(e: React.FormEvent) {
    e.preventDefault();
    const q = destination ? `?q=${encodeURIComponent(destination)}` : "";
    router.push(`/tours${q}`);
  }

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <Image
        src={bg}
        alt="Sigiriya Rock Fortress, Sri Lanka"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0a1a17]/90" />

      <div className="container-px relative mx-auto w-full max-w-[90rem] pt-28 pb-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            Rated 4.9/5 by 8,500+ travelers
          </span>

          <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
            Discover the Wonder of{" "}
            <span className="text-secondary">Sri Lanka</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Bespoke tours crafted by local experts — ancient cities, misty tea
            hills, wild safaris and golden beaches, all in one unforgettable
            island.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/tours" size="lg" variant="secondary">
              Explore Tours
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Plan a Custom Trip
            </Button>
          </div>
        </div>

        {/* Search bar */}
        <form
          onSubmit={search}
          className="mt-12 grid gap-3 rounded-2xl bg-white/95 p-4 shadow-[var(--shadow-card)] backdrop-blur md:mt-14 md:max-w-4xl md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:rounded-full md:p-3 md:pl-6"
        >
          <Field icon={<MapPin className="h-4 w-4" />} label="Destination">
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where to?"
              className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted"
            />
          </Field>
          <Field icon={<Calendar className="h-4 w-4" />} label="Duration" className="md:border-l md:border-border md:pl-4">
            <select className="w-full bg-transparent text-sm text-text outline-none">
              <option>Any length</option>
              <option>3–5 days</option>
              <option>6–8 days</option>
              <option>9+ days</option>
            </select>
          </Field>
          <Field icon={<Wallet className="h-4 w-4" />} label="Budget" className="md:border-l md:border-border md:pl-4">
            <select className="w-full bg-transparent text-sm text-text outline-none">
              <option>Any budget</option>
              <option>Under $700</option>
              <option>$700 – $1,200</option>
              <option>$1,200+</option>
            </select>
          </Field>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            <Search className="h-4 w-4" /> Search
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  icon,
  label,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex items-center gap-3 rounded-xl px-3 py-2 md:rounded-none md:py-1 ${className}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-wide text-muted">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}
