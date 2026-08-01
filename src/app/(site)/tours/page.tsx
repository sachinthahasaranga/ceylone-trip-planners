import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { TourCard } from "@/components/cards/tour-card";
import { getTours } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Sri Lanka Tour Packages",
  description:
    "Browse our curated Sri Lanka tour packages — wildlife safaris, cultural journeys, hill country escapes and beach holidays.",
};

const categories = ["All", "Cultural", "Wildlife", "Beach", "Nature", "Luxury"];

export default async function ToursPage() {
  const tours = await getTours();
  return (
    <>
      <PageHeader
        title="Tour Packages"
        subtitle="Curated journeys across Sri Lanka — or tailor any trip to your taste."
        crumbs={[{ label: "Tours" }]}
        image="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 lg:py-20">
        <div className="container-px mx-auto max-w-[90rem]">
          {/* Filter chips (visual; wiring comes with DB) */}
          <div className="no-scrollbar mb-10 flex gap-2 overflow-x-auto pb-2">
            {categories.map((c, i) => (
              <button
                key={c}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  i === 0
                    ? "bg-primary text-white"
                    : "bg-surface text-text/80 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
