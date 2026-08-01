import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/form";
import { BookingStatusSelect } from "@/components/admin/booking-status";
import { DeleteButton } from "@/components/admin/delete-button";

async function getData() {
  try {
    return await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: { tour: true },
    });
  } catch {
    return [];
  }
}

export default async function AdminBookingsPage() {
  const items = await getData();

  return (
    <div>
      <AdminHeader title="Bookings" subtitle={`${items.length} enquiry/booking(s)`} />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-muted">
          No bookings yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-border bg-surface text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Tour</th>
                <th className="px-4 py-3">Travel date</th>
                <th className="px-4 py-3">Pax</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{b.fullName}</p>
                    <p className="text-xs text-muted">{b.email}</p>
                    {b.phone && <p className="text-xs text-muted">{b.phone}</p>}
                  </td>
                  <td className="px-4 py-3 text-muted">{b.tour?.title ?? "Custom"}</td>
                  <td className="px-4 py-3 text-muted">
                    {b.travelDate ? new Date(b.travelDate).toLocaleDateString() : "Flexible"}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {b.adults}A / {b.children}C
                  </td>
                  <td className="px-4 py-3">
                    <BookingStatusSelect id={b.id} status={b.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DeleteButton model="booking" id={b.id} path="/admin/bookings" label="" />
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
