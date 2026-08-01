"use client";

import { useTransition } from "react";
import { Check, Mail } from "lucide-react";
import { toggleEnquiryRead } from "@/app/admin/actions";

export function EnquiryReadToggle({ id, read }: { id: string; read: boolean }) {
  const [pending, start] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() => start(() => toggleEnquiryRead(id, !read))}
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
        read
          ? "bg-surface-2 text-muted hover:bg-surface"
          : "bg-primary/15 text-primary hover:bg-primary/25"
      }`}
    >
      {read ? <Mail className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
      {read ? "Mark unread" : "Mark read"}
    </button>
  );
}
