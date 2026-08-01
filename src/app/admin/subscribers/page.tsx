import { Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/form";

async function getData() {
  try {
    return await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminSubscribersPage() {
  const items = await getData();

  return (
    <div>
      <AdminHeader
        title="Newsletter Subscribers"
        subtitle={`${items.length} subscriber(s)`}
      />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-muted">
          No subscribers yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 font-medium">
                      <Mail className="h-4 w-4 text-primary" /> {s.email}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(s.createdAt).toLocaleDateString()}
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
