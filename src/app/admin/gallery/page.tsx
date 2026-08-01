import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { addGalleryImages } from "@/app/admin/actions";
import { AdminHeader, Field, Input, Card, SubmitButton } from "@/components/admin/form";
import { ImageUploader } from "@/components/admin/image-uploader";
import { DeleteButton } from "@/components/admin/delete-button";

async function getData() {
  try {
    return await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function AdminGalleryPage() {
  const items = await getData();

  return (
    <div>
      <AdminHeader title="Gallery" subtitle={`${items.length} image(s)`} />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Upload form */}
        <form action={addGalleryImages} className="lg:sticky lg:top-6 lg:self-start">
          <Card>
            <h3 className="mb-4 font-heading text-lg font-semibold">Add images</h3>
            <ImageUploader name="urls" label="Upload photos" multiple />
            <div className="mt-4 space-y-4">
              <Field label="Caption (optional)">
                <Input name="caption" placeholder="e.g. Sigiriya at sunrise" />
              </Field>
              <Field label="Category (optional)">
                <Input name="category" placeholder="e.g. Culture" />
              </Field>
            </div>
            <div className="mt-5">
              <SubmitButton>Add to gallery</SubmitButton>
            </div>
          </Card>
        </form>

        {/* Grid */}
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-muted">
            No images yet. Upload some using the form.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {items.map((g) => (
              <div key={g.id} className="group overflow-hidden rounded-xl border border-border bg-white">
                <div className="relative aspect-square">
                  <Image src={g.url} alt={g.caption ?? "gallery"} fill sizes="200px" className="object-cover" />
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="truncate text-xs text-muted">
                    {g.caption || g.category || "—"}
                  </span>
                  <DeleteButton model="galleryImage" id={g.id} path="/admin/gallery" label="" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
