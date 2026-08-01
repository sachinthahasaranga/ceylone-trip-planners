import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { getGalleryImages } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual journey through the beauty of Sri Lanka.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Postcards from paradise — moments captured across the island."
        crumbs={[{ label: "Gallery" }]}
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 lg:py-20">
        <div className="container-px mx-auto max-w-[90rem]">
          {images.length === 0 ? (
            <p className="text-center text-muted">
              No gallery images yet. Add some from the admin panel.
            </p>
          ) : (
            <GalleryGrid images={images} />
          )}
        </div>
      </section>
    </>
  );
}
