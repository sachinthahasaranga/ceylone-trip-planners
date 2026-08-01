import type { Metadata } from "next";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { getTestimonials } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Traveler Reviews",
  description: "Read what our guests say about traveling Sri Lanka with us.",
};

export default async function ReviewsPage() {
  const all = await getTestimonials();

  return (
    <>
      <PageHeader
        title="Traveler Reviews"
        subtitle="Real stories from guests who explored Sri Lanka with us."
        crumbs={[{ label: "Reviews" }]}
      />
      <section className="py-16 lg:py-20">
        <div className="container-px mx-auto max-w-[90rem]">
          {all.length === 0 ? (
            <p className="text-center text-muted">No reviews yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {all.map((t, i) => (
                <div key={i} className="rounded-2xl border border-border bg-white p-7 shadow-[var(--shadow-card)]">
                  <Quote className="h-8 w-8 text-primary/30" />
                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="mt-3 leading-relaxed text-muted">“{t.text}”</p>
                  <div className="mt-5 flex items-center gap-3">
                    <Image src={t.avatar} alt={t.name} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
