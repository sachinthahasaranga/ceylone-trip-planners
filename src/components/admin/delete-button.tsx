"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteRecord } from "@/app/admin/actions";

type Model =
  | "destination"
  | "tourPackage"
  | "blogPost"
  | "booking"
  | "enquiry"
  | "review";

export function DeleteButton({
  model,
  id,
  path,
  label = "Delete",
}: {
  model: Model;
  id: string;
  path: string;
  label?: string;
}) {
  const [pending, start] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Delete this item? This cannot be undone.")) {
          start(() => deleteRecord(model, id, path));
        }
      }}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-accent transition hover:bg-accent/10 disabled:opacity-50"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
      {label}
    </button>
  );
}
