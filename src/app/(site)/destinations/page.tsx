import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { DestinationCard } from "@/components/cards/destination-card";
import { getDestinations } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Destinations in Sri Lanka",
  description:
    "Explore the best destinations in Sri Lanka — from Sigiriya and Kandy to Ella, Galle and the wild south.",
  alternates: { canonical: "/destinations" },
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  return (
    <>
      <PageHeader
        title="Destinations"
        subtitle="The places that make Sri Lanka unforgettable."
        crumbs={[{ label: "Destinations" }]}
        image="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-16 lg:py-20">
        <div className="container-px mx-auto max-w-[90rem]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} className="min-h-[340px]" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
