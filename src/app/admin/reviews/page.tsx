import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/form";
import { ReviewActions } from "@/components/admin/review-actions";
import { DeleteButton } from "@/components/admin/delete-button";

async function getData() {
  try {
    return await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function AdminReviewsPage() {
  const items = await getData();

  return (
    <div>
      <AdminHeader title="Reviews" subtitle={`${items.length} review(s)`} />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-muted">
          No reviews yet. Reviews submitted by customers will appear here for approval.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{r.authorName}</p>
                  {r.location && <p className="text-xs text-muted">{r.location}</p>}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{r.content}</p>
              <div className="mt-4 flex items-center justify-between">
                <ReviewActions id={r.id} approved={r.approved} featured={r.featured} />
                <DeleteButton model="review" id={r.id} path="/admin/reviews" label="" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
