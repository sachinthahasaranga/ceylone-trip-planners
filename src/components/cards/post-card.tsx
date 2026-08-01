import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Post } from "@/lib/data";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-border/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-24px_rgba(20,32,29,0.45)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2.5 text-xs font-medium text-muted">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted/50" />
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min
          </span>
        </div>

        <h3 className="mt-2.5 font-heading text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
