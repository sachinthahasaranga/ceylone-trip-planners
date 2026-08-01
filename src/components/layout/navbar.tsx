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

  // rAF-based so it works reliably with smooth-scroll (Lenis), which can
  // bypass native scroll events. Reads the live scroll position each frame.
  useEffect(() => {
    let raf = 0;
    let last = -1;
    const tick = () => {
      const now = window.scrollY > 24 ? 1 : 0;
      if (now !== last) {
        last = now;
        setScrolled(now === 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Solid header on non-home pages OR when scrolled
  const solid = scrolled || !isHome;

  return (
    <>
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
        <Link href="/" aria-label="Ceylon Trip Planners" className="relative flex items-center">
          <Image
            src="/ceylonetripplanners_logo_long_white.webp"
            alt="Ceylon Trip Planners"
            width={900}
            height={250}
            priority
            className={cn(
              "h-11 w-auto transition-opacity duration-300 lg:h-14",
              solid ? "opacity-0" : "opacity-100"
            )}
          />
          <Image
            src="/ceylonetripplanners_logo_long_black.webp"
            alt=""
            aria-hidden
            width={900}
            height={234}
            className={cn(
              "absolute left-0 top-1/2 h-11 w-auto -translate-y-1/2 transition-opacity duration-300 lg:h-14",
              solid ? "opacity-100" : "opacity-0"
            )}
          />
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
    </header>

      {/* Mobile drawer — slides in from the left, brand green.
          Rendered OUTSIDE <header> because the header's backdrop-blur would
          otherwise become the containing block and clamp this fixed panel. */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[55] bg-black/50 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
        className="fixed inset-y-0 left-0 z-[60] flex w-[82%] max-w-[340px] flex-col bg-gradient-to-b from-primary to-primary-dark text-white shadow-2xl transition-transform duration-300 ease-out lg:hidden"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
          <Link href="/" onClick={() => setOpen(false)} aria-label="Ceylon Trip Planners">
            <Image
              src="/ceylonetripplanners_logo_long_white.webp"
              alt="Ceylon Trip Planners"
              width={900}
              height={250}
              className="h-10 w-auto"
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      active
                        ? "bg-white/15 text-white"
                        : "text-white/85 hover:bg-white/10"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 border-t border-white/15 pt-4">
            {user ? (
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-4 py-2">
                  <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-white/15">
                    {user.image ? (
                      <Image src={user.image} alt="" width={36} height={36} className="h-9 w-9 object-cover" />
                    ) : (
                      <UserIcon className="h-4 w-4" />
                    )}
                  </span>
                  <span className="text-sm font-semibold">{user.name ?? "My account"}</span>
                </div>
                {user.role === "ADMIN" && (
                  <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10">
                    <LayoutDashboard className="h-4 w-4 text-secondary" /> Admin Dashboard
                  </Link>
                )}
                <Link href="/account" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10">
                  <UserIcon className="h-4 w-4 text-secondary" /> My Account
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-white/90 hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 text-secondary" /> Sign out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 px-1">
                <Button href="/tours" variant="secondary" className="w-full">
                  Explore Tours
                </Button>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/40 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Contact footer */}
        <div className="border-t border-white/15 px-5 py-4 text-sm text-white/85">
          <a href="tel:+94771234567" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-secondary" /> +94 77 123 4567
          </a>
        </div>
      </aside>
    </>
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
