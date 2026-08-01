import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { AdminHeader } from "@/components/admin/form";
import { DeleteButton } from "@/components/admin/delete-button";

async function getData() {
  try {
    return await prisma.tourPackage.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function AdminToursPage() {
  const items = await getData();

  return (
    <div>
      <AdminHeader
        title="Tour Packages"
        subtitle={`${items.length} package(s)`}
        action={
          <Link href="/admin/tours/new" className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark">
            <Plus className="h-4 w-4" /> Add tour
          </Link>
        }
      />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
          <p className="text-muted">No tours yet. Create your first package.</p>
          <Link href="/admin/tours/new" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" /> Add tour
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Tour</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 overflow-hidden rounded-lg bg-surface">
                        {t.coverImage && <Image src={t.coverImage} alt={t.title} fill sizes="44px" className="object-cover" />}
                      </div>
                      <div>
                        <p className="font-medium">{t.title}</p>
                        <p className="text-xs text-muted">/{t.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-primary">{formatPrice(t.price)}</td>
                  <td className="px-4 py-3 text-muted">{t.durationDays}D / {t.durationNights}N</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.published ? "bg-primary/15 text-primary" : "bg-surface-2 text-muted"}`}>
                        {t.published ? "Published" : "Draft"}
                      </span>
                      {t.featured && <Star className="h-4 w-4 fill-secondary text-secondary" />}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/tours/${t.id}`} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-primary hover:bg-primary/10">
                        <Pencil className="h-4 w-4" /> Edit
                      </Link>
                      <DeleteButton model="tourPackage" id={t.id} path="/admin/tours" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
