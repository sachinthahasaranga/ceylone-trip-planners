"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Menu,
  X,
  Phone,
  Palmtree,
  ChevronDown,
  LayoutDashboard,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavUser = { name: string | null; image: string | null; role: string } | null;

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tours" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ user }: { user: NavUser }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Solid header on non-home pages OR when scrolled
  const solid = scrolled || !isHome;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-white/95 backdrop-blur shadow-[0_2px_20px_-12px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      )}
    >
      <nav className="container-px mx-auto flex h-16 max-w-[90rem] items-center justify-between lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full transition-colors",
              solid ? "bg-primary text-white" : "bg-white/15 text-white backdrop-blur"
            )}
          >
            <Palmtree className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span
              className={cn(
                "block font-heading text-lg font-semibold",
                solid ? "text-text" : "text-white"
              )}
            >
              Ceylon
            </span>
            <span
              className={cn(
                "block text-[0.65rem] font-medium uppercase tracking-[0.25em]",
                solid ? "text-primary" : "text-secondary"
              )}
            >
              Trip Planners
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    solid
                      ? active
                        ? "text-primary"
                        : "text-text/80 hover:text-primary"
                      : active
                        ? "text-secondary"
                        : "text-white/90 hover:text-white"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA / user */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <UserMenu user={user} solid={solid} />
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  "text-sm font-medium transition-colors",
                  solid ? "text-text/80 hover:text-primary" : "text-white/90 hover:text-white"
                )}
              >
                Login
              </Link>
              <Button href="/tours" size="sm" variant={solid ? "primary" : "secondary"}>
                Explore Tours
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full lg:hidden",
            solid ? "text-text" : "text-white"
          )}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden bg-white lg:hidden",
          "transition-[max-height] duration-300 ease-in-out",
          open ? "max-h-[560px] border-t" : "max-h-0"
        )}
      >
        <ul className="container-px mx-auto flex max-w-[90rem] flex-col py-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "block rounded-lg px-3 py-3 text-base font-medium",
                  pathname === l.href
                    ? "bg-primary/10 text-primary"
                    : "text-text/80 hover:bg-surface"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
          {user ? (
            <>
              <li className="mt-2 flex items-center gap-3 border-t border-border px-3 pt-3">
                <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-primary/10 text-primary">
                  {user.image ? (
                    <Image src={user.image} alt="" width={36} height={36} className="h-9 w-9 object-cover" />
                  ) : (
                    <UserIcon className="h-4 w-4" />
                  )}
                </span>
                <span className="text-sm font-semibold">{user.name ?? "My account"}</span>
              </li>
              {user.role === "ADMIN" && (
                <li>
                  <Link href="/admin" className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-primary hover:bg-surface">
                    <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link href="/account" className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-text/80 hover:bg-surface">
                  <UserIcon className="h-4 w-4" /> My Account
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-base font-medium text-accent hover:bg-surface"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </li>
            </>
          ) : (
            <li className="mt-2 flex items-center gap-3 px-3">
              <Button href="/login" variant="outline" size="sm" className="flex-1 border-primary/40 text-primary">
                Login
              </Button>
              <Button href="/tours" size="sm" className="flex-1">
                Explore Tours
              </Button>
            </li>
          )}
          <li className="mt-3 flex items-center gap-2 px-3 text-sm text-muted">
            <Phone className="h-4 w-4 text-primary" /> +94 77 123 4567
          </li>
        </ul>
      </div>
    </header>
  );
}

function UserMenu({
  user,
  solid,
}: {
  user: NonNullable<NavUser>;
  solid: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const first = user.name?.split(" ")[0] ?? "Account";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-medium transition-colors",
          solid
            ? "bg-surface text-text hover:bg-surface-2"
            : "bg-white/15 text-white backdrop-blur hover:bg-white/25"
        )}
      >
        <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-primary text-white">
          {user.image ? (
            <Image src={user.image} alt="" width={32} height={32} className="h-8 w-8 object-cover" />
          ) : (
            <UserIcon className="h-4 w-4" />
          )}
        </span>
        {first}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-white py-1.5 shadow-[var(--shadow-card)]">
          <div className="border-b border-border px-4 py-2.5">
            <p className="text-sm font-semibold text-text">{user.name}</p>
            <p className="text-xs text-muted">
              {user.role === "ADMIN" ? "Administrator" : "Traveler"}
            </p>
          </div>
          {user.role === "ADMIN" && (
            <Link href="/admin" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text hover:bg-surface">
              <LayoutDashboard className="h-4 w-4 text-primary" /> Admin Dashboard
            </Link>
          )}
          <Link href="/account" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text hover:bg-surface">
            <UserIcon className="h-4 w-4 text-primary" /> My Account
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-accent hover:bg-surface"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
