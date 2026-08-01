import type { Metadata } from "next";
import Image from "next/image";
import { Award, Globe2, Users, Leaf } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Ceylon Trip Planners is a local, award-winning travel company crafting bespoke journeys across Sri Lanka.",
};

const team = [
  { name: "Nadeesha Perera", role: "Founder & Lead Planner", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Ruwan Silva", role: "Head of Operations", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Ishara Fernando", role: "Senior Travel Guide", img: "https://randomuser.me/api/portraits/women/32.jpg" },
  { name: "Kasun Jayaweera", role: "Wildlife Specialist", img: "https://randomuser.me/api/portraits/men/22.jpg" },
];

const values = [
  { icon: Globe2, title: "Local Roots", text: "Born and raised here — we share the Sri Lanka we love." },
  { icon: Leaf, title: "Responsible Travel", text: "Supporting local communities and protecting nature." },
  { icon: Award, title: "Award-Winning", text: "Recognised for service excellence year after year." },
  { icon: Users, title: "Personal Care", text: "Small team, big attention — you're never just a booking." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Ceylon Trip Planners"
        subtitle="Local experts crafting unforgettable Sri Lankan journeys since 2012."
        crumbs={[{ label: "About" }]}
        image="https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=2000&q=80"
      />

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80"
                alt="Our team exploring Sri Lanka"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-primary px-8 py-6 text-white shadow-lg sm:-right-6">
              <p className="font-heading text-4xl font-bold">12+</p>
              <p className="text-sm text-white/80">Years of journeys</p>
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="A love letter to our island"
              className="mx-0"
            />
            <p className="mt-5 leading-relaxed text-muted">
              Ceylon Trip Planners began with a simple belief: that the best way
              to experience Sri Lanka is through the eyes of the people who call
              it home. What started as a small family operation has grown into an
              award-winning team of guides, planners and storytellers.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              We&apos;ve welcomed thousands of travelers from around the world,
              and every single itinerary is still crafted by hand — shaped around
              your interests, your pace and your sense of adventure. No
              cookie-cutter tours, no hidden fees, just honest, heartfelt travel.
            </p>
            <Button href="/contact" className="mt-8">
              Plan your journey
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-14 text-white">
        <div className="container-px mx-auto grid max-w-7xl grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl font-bold sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What we stand for"
            title="Our values"
            subtitle="The principles behind every trip we plan."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-white p-7 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-surface py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The people"
            title="Meet the team"
            subtitle="Passionate locals who make your journey seamless."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={m.img} alt={m.name} fill sizes="25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-heading text-lg font-bold">{m.name}</h3>
                  <p className="text-sm text-primary">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
