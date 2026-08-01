import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/form";
import { DeleteButton } from "@/components/admin/delete-button";

async function getData() {
  try {
    return await prisma.destination.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function AdminDestinationsPage() {
  const items = await getData();

  return (
    <div>
      <AdminHeader
        title="Destinations"
        subtitle={`${items.length} destination(s)`}
        action={
          <Link
            href="/admin/destinations/new"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" /> Add destination
          </Link>
        }
      />

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 overflow-hidden rounded-lg bg-surface">
                        {d.coverImage && (
                          <Image src={d.coverImage} alt={d.name} fill sizes="44px" className="object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{d.name}</p>
                        <p className="text-xs text-muted">/{d.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{d.region ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${d.published ? "bg-primary/15 text-primary" : "bg-surface-2 text-muted"}`}>
                        {d.published ? "Published" : "Draft"}
                      </span>
                      {d.featured && <Star className="h-4 w-4 fill-secondary text-secondary" />}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/destinations/${d.id}`} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-primary hover:bg-primary/10">
                        <Pencil className="h-4 w-4" /> Edit
                      </Link>
                      <DeleteButton model="destination" id={d.id} path="/admin/destinations" />
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

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
      <p className="text-muted">No destinations yet. Add your first one.</p>
      <Link href="/admin/destinations/new" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white">
        <Plus className="h-4 w-4" /> Add destination
      </Link>
    </div>
  );
}
