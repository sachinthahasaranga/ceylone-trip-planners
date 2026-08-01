import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ToursExplorer } from "@/components/tours/tours-explorer";
import { getTours } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Sri Lanka Tour Packages",
  description:
    "Browse our curated Sri Lanka tour packages — wildlife safaris, cultural journeys, hill country escapes and beach holidays.",
};

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

      <ToursExplorer tours={tours} />
    </>
  );
}
