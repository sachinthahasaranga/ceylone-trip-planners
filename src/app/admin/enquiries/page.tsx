import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/form";
import { EnquiryReadToggle } from "@/components/admin/enquiry-actions";
import { DeleteButton } from "@/components/admin/delete-button";

async function getData() {
  try {
    return await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function AdminEnquiriesPage() {
  const items = await getData();

  return (
    <div>
      <AdminHeader title="Enquiries" subtitle={`${items.length} message(s)`} />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-muted">
          No enquiries yet.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((e) => (
            <div
              key={e.id}
              className={`rounded-2xl border bg-white p-5 ${
                e.read ? "border-border" : "border-primary/40"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-lg font-semibold">{e.name}</h3>
                    {!e.read && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[0.6rem] font-semibold uppercase text-white">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted">
                    <a href={`mailto:${e.email}`} className="hover:text-primary">
                      {e.email}
                    </a>
                    {e.phone && ` · ${e.phone}`}
                  </p>
                  {e.subject && (
                    <p className="mt-1 text-sm font-medium">Re: {e.subject}</p>
                  )}
                </div>
                <span className="text-xs text-muted">
                  {new Date(e.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-3 rounded-lg bg-surface p-3 text-sm text-muted">
                {e.message}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <EnquiryReadToggle id={e.id} read={e.read} />
                <a
                  href={`mailto:${e.email}?subject=Re: ${e.subject ?? "Your enquiry"}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Reply by email
                </a>
                <DeleteButton model="enquiry" id={e.id} path="/admin/enquiries" label="" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
