"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  MapPin,
  Package,
  Newspaper,
  CalendarCheck,
  MessagesSquare,
  Star,
  Users,
  Settings,
  Palmtree,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@/components/auth/signout-button";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/destinations", label: "Destinations", icon: MapPin },
  { href: "/admin/tours", label: "Tour Packages", icon: Package },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessagesSquare },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ userName }: { userName?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile topbar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-white px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white">
            <Palmtree className="h-4 w-4" />
          </span>
          <span className="font-heading font-bold">Admin</span>
        </Link>
        <button onClick={() => setOpen((v) => !v)} className="p-2">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-white transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-2 border-b border-border px-6 py-5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white">
            <Palmtree className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="font-heading font-bold">Ceylon</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-primary">
              Admin Panel
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-white"
                    : "text-text/70 hover:bg-surface hover:text-primary"
                )}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <Link
            href="/"
            target="_blank"
            className="mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" /> View site
          </Link>
          <div className="rounded-lg bg-surface px-3 py-3">
            <p className="truncate text-sm font-semibold">{userName ?? "Admin"}</p>
            <SignOutButton className="mt-1 inline-flex items-center gap-1.5 text-xs text-accent hover:underline" />
          </div>
        </div>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}
    </>
  );
}
