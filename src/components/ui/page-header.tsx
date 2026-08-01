import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export function PageHeader({
  title,
  subtitle,
  image = "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=2000&q=80",
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  image?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden pt-20">
      <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a17]/90 via-black/40 to-black/30" />
      <div className="container-px relative mx-auto w-full max-w-[90rem] pb-12">
        <nav className="mb-3 flex items-center gap-1.5 text-sm text-white/70">
          <Link href="/" className="hover:text-secondary">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-4 w-4" />
              {c.href ? (
                <Link href={c.href} className="hover:text-secondary">
                  {c.label}
                </Link>
              ) : (
                <span className="text-secondary">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="max-w-3xl font-heading text-4xl font-semibold text-white text-balance sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-lg text-white/85">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
