import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User, Mail, CalendarDays, Package, Heart } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/ui/page-header";
import { SignOutButton } from "@/components/auth/signout-button";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "My Account" };

const statusStyles: Record<string, string> = {
  PENDING: "bg-secondary/20 text-[#8a5a00]",
  CONFIRMED: "bg-primary/15 text-primary",
  CANCELLED: "bg-accent/15 text-accent",
  COMPLETED: "bg-surface-2 text-muted",
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const bookings = session.user.email
    ? await prisma.booking.findMany({
        where: { email: session.user.email },
        orderBy: { createdAt: "desc" },
        include: { tour: true },
      })
    : [];

  return (
    <>
      <PageHeader
        title={`Welcome, ${session.user.name?.split(" ")[0] ?? "traveler"}`}
        subtitle="Manage your bookings and profile."
        crumbs={[{ label: "My Account" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="container-px mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[300px_1fr]">
          {/* Profile card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-[var(--shadow-card)]">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
                <User className="h-10 w-10" />
              </div>
              <h2 className="mt-4 font-heading text-xl font-semibold">
                {session.user.name}
              </h2>
              <p className="flex items-center justify-center gap-1.5 text-sm text-muted">
                <Mail className="h-4 w-4" /> {session.user.email}
              </p>
              <div className="mt-6 border-t border-border pt-5">
                <SignOutButton className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <StatCard icon={<Package />} value={bookings.length} label="Bookings" />
              <StatCard icon={<Heart />} value={0} label="Wishlist" />
            </div>
          </aside>

          {/* Bookings */}
          <div>
            <h2 className="font-heading text-2xl font-semibold">My Bookings</h2>
            {bookings.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
                <Package className="mx-auto h-12 w-12 text-muted/50" />
                <p className="mt-4 text-muted">
                  You don&apos;t have any bookings yet.
                </p>
                <Button href="/tours" className="mt-5">
                  Browse tours
                </Button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading text-lg font-semibold">
                          {b.tour?.title ?? "Custom enquiry"}
                        </h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            statusStyles[b.status] ?? ""
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                        <CalendarDays className="h-4 w-4" />
                        {b.travelDate
                          ? new Date(b.travelDate).toLocaleDateString()
                          : "Flexible dates"}{" "}
                        · {b.adults} adults, {b.children} children
                      </p>
                    </div>
                    <span className="text-xs text-muted">
                      Ref: {b.reference.slice(0, 8).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 text-center">
      <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      <p className="mt-2 font-heading text-xl font-semibold">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
