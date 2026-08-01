import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/form";
import { DeleteButton } from "@/components/admin/delete-button";

async function getData() {
  try {
    return await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function AdminBlogPage() {
  const items = await getData();

  return (
    <div>
      <AdminHeader
        title="Blog"
        subtitle={`${items.length} post(s)`}
        action={
          <Link href="/admin/blog/new" className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark">
            <Plus className="h-4 w-4" /> Add post
          </Link>
        }
      />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
          <p className="text-muted">No posts yet.</p>
          <Link href="/admin/blog/new" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" /> Add post
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Post</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-16 overflow-hidden rounded-lg bg-surface">
                        {p.coverImage && <Image src={p.coverImage} alt={p.title} fill sizes="64px" className="object-cover" />}
                      </div>
                      <p className="font-medium">{p.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{p.author ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.published ? "bg-primary/15 text-primary" : "bg-surface-2 text-muted"}`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                      {p.featured && <Star className="h-4 w-4 fill-secondary text-secondary" />}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/blog/${p.id}`} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-primary hover:bg-primary/10">
                        <Pencil className="h-4 w-4" /> Edit
                      </Link>
                      <DeleteButton model="blogPost" id={p.id} path="/admin/blog" />
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
