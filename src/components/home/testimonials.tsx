"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [i, setI] = useState(0);

  if (!testimonials.length) return null;
  const t = testimonials[i];

  const go = (dir: number) =>
    setI((prev) => (prev + dir + testimonials.length) % testimonials.length);

  return (
    <section className="bg-primary-dark py-20 text-white lg:py-28">
      <div className="container-px mx-auto max-w-[90rem]">
        <SectionHeading
          light
          eyebrow="Testimonials"
          title="Loved by travelers worldwide"
          subtitle="Real stories from guests who explored Sri Lanka with us."
        />

        <div className="relative mx-auto mt-12 max-w-3xl text-center">
          <Quote className="mx-auto h-12 w-12 text-secondary/50" />
          <p className="mt-6 font-heading text-xl leading-relaxed text-white sm:text-2xl">
            “{t.text}”
          </p>

          <div className="mt-4 flex justify-center gap-1">
            {Array.from({ length: t.rating }).map((_, k) => (
              <Star key={k} className="h-5 w-5 fill-secondary text-secondary" />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Image
              src={t.avatar}
              alt={t.name}
              width={52}
              height={52}
              className="h-13 w-13 rounded-full object-cover ring-2 ring-secondary"
            />
            <div className="text-left">
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-white/70">{t.location}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30 transition hover:bg-white hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Go to slide ${k + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    k === i ? "w-6 bg-secondary" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30 transition hover:bg-white hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
