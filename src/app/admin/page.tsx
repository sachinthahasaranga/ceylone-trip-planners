import Link from "next/link";
import {
  Package,
  MapPin,
  CalendarCheck,
  MessagesSquare,
  Newspaper,
  Users,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getCounts() {
  try {
    const [tours, destinations, bookings, enquiries, posts, subscribers, pending] =
      await Promise.all([
        prisma.tourPackage.count(),
        prisma.destination.count(),
        prisma.booking.count(),
        prisma.enquiry.count(),
        prisma.blogPost.count(),
        prisma.newsletterSubscriber.count(),
        prisma.booking.count({ where: { status: "PENDING" } }),
      ]);
    return { tours, destinations, bookings, enquiries, posts, subscribers, pending };
  } catch {
    return null;
  }
}

async function getRecentBookings() {
  try {
    return await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { tour: true },
    });
  } catch {
    return [];
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts();
  const recent = await getRecentBookings();

  const cards = [
    { label: "Tour Packages", value: counts?.tours ?? "—", icon: Package, href: "/admin/tours", color: "bg-primary" },
    { label: "Destinations", value: counts?.destinations ?? "—", icon: MapPin, href: "/admin/destinations", color: "bg-accent" },
    { label: "Bookings", value: counts?.bookings ?? "—", icon: CalendarCheck, href: "/admin/bookings", color: "bg-secondary" },
    { label: "Enquiries", value: counts?.enquiries ?? "—", icon: MessagesSquare, href: "/admin/enquiries", color: "bg-primary-light" },
    { label: "Blog Posts", value: counts?.posts ?? "—", icon: Newspaper, href: "/admin/blog", color: "bg-primary-dark" },
    { label: "Subscribers", value: counts?.subscribers ?? "—", icon: Users, href: "/admin/subscribers", color: "bg-accent" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
        <p className="text-muted">Overview of your travel business.</p>
      </div>

      {!counts && (
        <div className="mb-6 rounded-xl border border-secondary/40 bg-secondary/10 p-4 text-sm text-[#8a5a00]">
          Could not reach the database. Check <code>DATABASE_URL</code> in your{" "}
          <code>.env</code>, then run <code>npm run db:push</code> and{" "}
          <code>npm run db:seed</code>.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition hover:shadow-[var(--shadow-card)]"
          >
            <span className={`grid h-14 w-14 place-items-center rounded-xl text-white ${c.color}`}>
              <c.icon className="h-7 w-7" />
            </span>
            <div className="flex-1">
              <p className="font-heading text-2xl font-bold">{c.value}</p>
              <p className="text-sm text-muted">{c.label}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="mt-8 rounded-2xl border border-border bg-white">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-heading text-lg font-bold">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-muted">
            No bookings yet.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {recent.map((b) => (
              <div key={b.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium">{b.fullName}</p>
                  <p className="text-sm text-muted">
                    {b.tour?.title ?? "Custom enquiry"} · {b.email}
                  </p>
                </div>
                <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
