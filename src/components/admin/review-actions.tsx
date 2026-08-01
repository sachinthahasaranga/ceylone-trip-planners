"use client";

import { useTransition } from "react";
import { updateReview } from "@/app/admin/actions";

export function ReviewActions({
  id,
  approved,
  featured,
}: {
  id: string;
  approved: boolean;
  featured: boolean;
}) {
  const [pending, start] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        disabled={pending}
        onClick={() => start(() => updateReview(id, { approved: !approved }))}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
          approved ? "bg-primary/15 text-primary" : "bg-surface-2 text-muted"
        }`}
      >
        {approved ? "Approved" : "Approve"}
      </button>
      <button
        disabled={pending}
        onClick={() => start(() => updateReview(id, { featured: !featured }))}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
          featured ? "bg-secondary/20 text-[#8a5a00]" : "bg-surface-2 text-muted"
        }`}
      >
        {featured ? "Featured" : "Feature"}
      </button>
    </div>
  );
}
