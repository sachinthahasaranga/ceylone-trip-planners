import { Info } from "lucide-react";

export function LegalDoc({
  updated,
  intro,
  children,
}: {
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <article className="container-px mx-auto max-w-3xl py-14 lg:py-20">
      <p className="text-sm font-medium text-primary">Last updated: {updated}</p>
      <p className="mt-4 leading-relaxed text-muted">{intro}</p>

      <div className="mt-10 space-y-9">{children}</div>

      <div className="mt-12 flex gap-3 rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p>
          This document is a general template provided for convenience. It is not
          legal advice. Please have it reviewed and adapted by a qualified legal
          professional to ensure it complies with the laws applicable to your
          business before publishing it as your official policy.
        </p>
      </div>
    </article>
  );
}

export function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-heading text-xl font-semibold text-text sm:text-2xl">
        <span className="text-primary">{n}.</span> {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}
