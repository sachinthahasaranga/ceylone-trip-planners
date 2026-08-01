"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

export function TourGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [full, setFull] = useState(false);

  const count = images.length;
  const go = useCallback(
    (dir: number) => setActive((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (!full) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setFull(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [full, go]);

  if (count === 0) return null;

  return (
    <div>
      {/* Main image */}
      <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:aspect-[16/9]">
        <Image
          src={images[active]}
          alt={`${title} photo ${active + 1}`}
          fill
          sizes="(max-width:1024px) 100vw, 66vw"
          className="object-cover"
          priority
        />

        {/* Expand */}
        <button
          onClick={() => setFull(true)}
          aria-label="View full screen"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
        >
          <Maximize2 className="h-4.5 w-4.5" />
        </button>

        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-text shadow transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-text shadow transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-2 transition sm:h-20 sm:w-28 ${
                i === active ? "ring-primary" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen */}
      {full && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setFull(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setFull(false)}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          {count > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous"
                className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next"
                className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[active]}
              alt={`${title} photo ${active + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-sm text-white/60">
            {active + 1} / {count}
          </p>
        </div>
      )}
    </div>
  );
}
