"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/app/admin/actions";

const options = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

export function BookingStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [pending, start] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => start(() => updateBookingStatus(id, e.target.value))}
      className="rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-primary"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
