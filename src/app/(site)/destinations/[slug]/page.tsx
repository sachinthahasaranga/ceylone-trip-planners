import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Calendar, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { TourCard } from "@/components/cards/tour-card";
import { RichText } from "@/components/ui/rich-text";
import { Button } from "@/components/ui/button";
import { getDestination, getDestinations } from "@/lib/queries";
import { getTours } from "@/lib/queries";

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDestination(slug);
  if (!d) return { title: "Destination not found" };
  return {
    title: d.name,
    description: d.shortDesc,
    openGraph: { images: [d.image] },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = await getDestination(slug);
  if (!d) notFound();

  const relatedTours = (await getTours()).slice(0, 3);

  return (
    <>
      <PageHeader
        title={d.name}
        subtitle={d.region}
        image={d.image}
        crumbs={[
          { label: "Destinations", href: "/destinations" },
          { label: d.name },
        ]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-px mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <MapPin className="h-4 w-4" /> {d.region}
            </span>
            <h2 className="mt-2 font-heading text-3xl font-semibold">About {d.name}</h2>
            {d.description ? (
              <RichText html={d.description} className="mt-4" />
            ) : (
              <p className="mt-4 leading-relaxed text-muted">{d.shortDesc}</p>
            )}

            <h3 className="mt-10 font-heading text-2xl font-semibold">Highlights</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {d.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-4"
                >
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/9]">
                <Image src={d.image} alt={d.name} fill sizes="100vw" className="object-cover" />
              </div>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-card)]">
              <h4 className="font-heading text-lg font-semibold">Good to know</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <Calendar className="h-4 w-4 shrink-0 text-primary" />
                  <span>Best time: year-round, mornings preferred</span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span>Region: {d.region}</span>
                </li>
              </ul>
              <Button href="/contact" className="mt-6 w-full">
                Plan a trip here
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <div className="container-px mx-auto max-w-[90rem]">
          <h2 className="mb-8 font-heading text-2xl font-semibold sm:text-3xl">
            Tours featuring {d.name}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
