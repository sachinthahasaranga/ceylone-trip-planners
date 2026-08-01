import Link from "next/link";
import {
  Palmtree,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const explore = [
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tour Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Travel Blog" },
];

const company = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/reviews", label: "Reviews" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a1a17] text-white/80">
      {/* Newsletter band */}
      <div className="container-px mx-auto max-w-[90rem]">
        <div className="-mb-10 translate-y-[-2.5rem] rounded-2xl bg-primary px-6 py-8 shadow-[var(--shadow-card)] sm:px-10 md:flex md:items-center md:justify-between">
          <div className="max-w-md">
            <h3 className="font-heading text-2xl text-white">
              Get travel inspiration in your inbox
            </h3>
            <p className="mt-1 text-sm text-white/80">
              Join our newsletter for Sri Lanka tips, offers and new tours.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:w-[380px]">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="container-px mx-auto max-w-[90rem] pt-24 pb-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white">
                <Palmtree className="h-5 w-5" />
              </span>
              <span className="font-heading text-xl font-semibold text-white">
                Ceylon Trip Planners
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              A local, award-winning travel company crafting bespoke journeys
              across Sri Lanka — from misty tea hills to golden southern beaches.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-primary"
                  aria-label="social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold text-white">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-secondary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold text-white">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-secondary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold text-white">
              Get in touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span>42 Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <a href="tel:+94771234567">+94 77 123 4567</a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <a href="mailto:info@ceylontripplanners.com">
                  info@ceylontripplanners.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Ceylon Trip Planners. All rights reserved.</p>
          <ul className="flex gap-5">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
