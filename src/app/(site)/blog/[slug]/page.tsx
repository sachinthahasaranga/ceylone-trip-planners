import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, User } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { getPost, getPosts } from "@/lib/queries";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return { title: "Article not found" };
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: { type: "article", images: [p.image] },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();

  const related = (await getPosts()).filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        title={p.title}
        image={p.image}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: p.category }]}
      />

      <article className="py-14 lg:py-20">
        <div className="container-px mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-5 border-b border-border pb-6 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-primary" /> {p.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-primary" />
              {new Date(p.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" /> {p.readMinutes} min read
            </span>
          </div>

          <div className="prose prose-lg mt-8 max-w-none text-muted">
            <p className="text-lg leading-relaxed">{p.excerpt}</p>
            <p className="mt-6 leading-relaxed">
              Sri Lanka packs extraordinary variety into a compact island —
              ancient kingdoms, mist-wrapped tea country, wildlife-rich national
              parks and a coastline of golden beaches. In this guide we share the
              practical know-how and local insight that make the difference
              between a good trip and an unforgettable one.
            </p>
            <h2 className="mt-8 font-heading text-2xl font-bold text-text">
              Planning your journey
            </h2>
            <p className="mt-3 leading-relaxed">
              The key to a great Sri Lankan holiday is pacing. Distances look
              small on a map, but winding mountain roads mean travel takes
              longer than expected. We recommend basing yourself in a region for
              two or three nights rather than moving every day — it leaves room
              to slow down and truly experience each place.
            </p>
            <blockquote className="mt-6 border-l-4 border-primary bg-surface p-5 font-heading text-lg italic text-text">
              “Travel slowly, eat everything, and always say yes to a cup of
              Ceylon tea.”
            </blockquote>
            <p className="mt-6 leading-relaxed">
              Ready to experience it for yourself? Our team can craft a
              personalised itinerary around exactly the experiences you care
              about most.
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-primary p-8 text-center text-white">
            <h3 className="font-heading text-2xl font-bold">
              Plan your Sri Lanka trip with us
            </h3>
            <p className="mt-2 text-white/85">
              Free, tailor-made itineraries from local experts.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-block rounded-full bg-secondary px-7 py-3 font-semibold text-[#3a2a00] transition hover:brightness-105"
            >
              Start planning
            </Link>
          </div>
        </div>
      </article>

      <section className="bg-surface py-16">
        <div className="container-px mx-auto max-w-7xl">
          <h2 className="mb-8 font-heading text-2xl font-bold">Related articles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-border/60 transition hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={r.image} alt={r.title} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold leading-snug group-hover:text-primary">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
