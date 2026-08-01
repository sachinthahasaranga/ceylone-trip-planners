import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { galleryImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual journey through the beauty of Sri Lanka.",
};

export default function GalleryPage() {
  // Repeat images to create a fuller masonry grid for the demo
  const images = [...galleryImages, ...galleryImages];

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Postcards from paradise — moments captured across the island."
        crumbs={[{ label: "Gallery" }]}
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 lg:py-20">
        <div className="container-px mx-auto max-w-7xl">
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative block break-inside-avoid overflow-hidden rounded-xl"
              >
                <Image
                  src={src}
                  alt={`Sri Lanka gallery image ${i + 1}`}
                  width={800}
                  height={i % 3 === 0 ? 1000 : 700}
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
