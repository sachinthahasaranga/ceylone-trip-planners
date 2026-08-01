import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PostCard } from "@/components/cards/post-card";
import { getPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Travel Blog",
  description:
    "Sri Lanka travel tips, guides and inspiration from the Ceylon Trip Planners team.",
  alternates: { canonical: "/blog" },
};

const categories = ["All", "Travel Tips", "Guides", "Food & Culture", "Wildlife"];

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        title="Travel Journal"
        subtitle="Tips, guides and stories to inspire your Sri Lanka adventure."
        crumbs={[{ label: "Blog" }]}
        image="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 lg:py-20">
        <div className="container-px mx-auto max-w-[90rem]">
          {/* Featured */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid gap-6 overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-border/60 md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:aspect-auto">
              <Image src={featured.image} alt={featured.title} fill sizes="50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Featured · {featured.category}
              </span>
              <h2 className="mt-3 font-heading text-2xl font-semibold leading-snug group-hover:text-primary sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-muted">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          {/* Categories */}
          <div className="no-scrollbar mt-12 flex gap-2 overflow-x-auto pb-2">
            {categories.map((c, i) => (
              <button
                key={c}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  i === 0
                    ? "bg-primary text-white"
                    : "bg-surface text-text/80 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {rest.concat(posts).slice(0, 6).map((p, i) => (
              <PostCard key={`${p.slug}-${i}`} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
