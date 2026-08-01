"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Calendar, Wallet, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

type Slide =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string };

const slides: Slide[] = [
  { type: "image", src: img("photo-1588416936097-41850ab3d86d"), alt: "Sigiriya Rock Fortress" },
  { type: "image", src: img("photo-1566296314736-6eaac1ca0cb9"), alt: "Hill country tea estates" },
  { type: "video", src: "/Sri-lanka.mp4", alt: "Scenes of Sri Lanka" },
  { type: "image", src: img("photo-1507525428034-b723cf961d3e"), alt: "Southern beaches" },
  { type: "image", src: img("photo-1549366021-9f761d450615"), alt: "Wildlife safari" },
];

const IMAGE_DURATION = 6000; // ms per image
const VIDEO_MAX = 16000; // fallback cap if the video doesn't fire 'ended'

export function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const next = () => setActive((i) => (i + 1) % slides.length);

  // Auto-advance: images on a timer, the video when it ends (with a cap).
  useEffect(() => {
    const slide = slides[active];
    const video = videoRef.current;

    if (slide.type === "video") {
      if (video) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      }
      const cap = setTimeout(next, VIDEO_MAX);
      return () => clearTimeout(cap);
    }

    if (video) video.pause();
    const t = setTimeout(next, IMAGE_DURATION);
    return () => clearTimeout(t);
  }, [active]);

  function search(e: React.FormEvent) {
    e.preventDefault();
    const q = destination ? `?q=${encodeURIComponent(destination)}` : "";
    router.push(`/tours${q}`);
  }

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
              i === active ? "opacity-100" : "opacity-0"
            )}
          >
            {s.type === "image" ? (
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                src={s.src}
                muted
                playsInline
                preload="metadata"
                aria-label={s.alt}
                onEnded={next}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0a1a17]/90" />

      <div className="container-px relative z-10 mx-auto w-full max-w-[90rem] pt-28 pb-24">
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

      {/* Slide indicators */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show ${s.alt}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
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
