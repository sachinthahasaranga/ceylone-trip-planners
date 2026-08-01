"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Palmtree } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tours" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
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
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between lg:h-20">
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
                "block font-heading text-lg font-bold",
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

        {/* CTA */}
        <div className="hidden items-center gap-3 lg:flex">
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
        <ul className="container-px mx-auto flex max-w-7xl flex-col py-3">
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
          <li className="mt-2 flex items-center gap-3 px-3">
            <Button href="/login" variant="outline" size="sm" className="flex-1 border-primary/40 text-primary">
              Login
            </Button>
            <Button href="/tours" size="sm" className="flex-1">
              Explore Tours
            </Button>
          </li>
          <li className="mt-3 flex items-center gap-2 px-3 text-sm text-muted">
            <Phone className="h-4 w-4 text-primary" /> +94 77 123 4567
          </li>
        </ul>
      </div>
    </header>
  );
}
