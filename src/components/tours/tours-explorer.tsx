"use client";

import { useMemo, useState } from "react";
import { TourCard } from "@/components/cards/tour-card";
import type { Tour } from "@/lib/data";

export function ToursExplorer({ tours }: { tours: Tour[] }) {
  const categories = useMemo(() => {
    const set = new Set(tours.map((t) => t.category).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [tours]);

  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? tours : tours.filter((t) => t.category === active);

  return (
    <>
      {/* Sticky filter bar (full-width, sticks under the navbar) */}
      <div className="sticky top-16 z-30 border-b border-border bg-white/95 backdrop-blur lg:top-20">
        <div className="container-px mx-auto max-w-[90rem]">
          <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  active === c
                    ? "bg-primary text-white shadow-[var(--shadow-soft)]"
                    : "bg-surface text-text/80 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-px mx-auto max-w-[90rem]">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-muted">
              No tours in this category yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
