import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  Globe2,
  Users,
  Leaf,
  Landmark,
  PawPrint,
  Mountain,
  Waves,
  Heart,
  Compass,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Ceylon Trip Planners (Pvt) Ltd is a registered Sri Lankan travel company crafting bespoke, responsible journeys across the island.",
};

const values = [
  { icon: Globe2, title: "Local Roots", text: "Born and raised here — we share the Sri Lanka we love." },
  { icon: Leaf, title: "Responsible Travel", text: "Supporting local communities and protecting nature." },
  { icon: Award, title: "Service Excellence", text: "Rated 4.9/5 by thousands of travelers, year after year." },
  { icon: Users, title: "Personal Care", text: "A dedicated team — you're never just a booking." },
];

const specialities = [
  { icon: Landmark, title: "Culture & Heritage", text: "Ancient cities, sacred temples and UNESCO World Heritage sites." },
  { icon: PawPrint, title: "Wildlife & Safari", text: "Leopards, elephants and birdlife across the island's national parks." },
  { icon: Mountain, title: "Hill Country & Tea", text: "Misty peaks, tea estates and the world's most scenic train ride." },
  { icon: Waves, title: "Beaches & Coast", text: "Golden sands, whale watching and laid-back seaside towns." },
  { icon: Heart, title: "Honeymoons & Luxury", text: "Boutique stays and romantic experiences for special occasions." },
  { icon: Compass, title: "Tailor-Made Journeys", text: "Every itinerary designed around your pace, interests and budget." },
];

const trust = [
  { icon: ShieldCheck, title: "Registered company", text: "A registered Sri Lankan private limited company." },
  { icon: Leaf, title: "Responsible tourism", text: "Community-first, low-impact travel." },
  { icon: Wallet, title: "Transparent pricing", text: "Clear quotes, no hidden fees." },
  { icon: Users, title: "Local experts", text: "On-the-ground team and guides." },
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
        <div className="container-px mx-auto grid max-w-[90rem] items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80"
                alt="Sri Lanka hill country"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-primary px-8 py-6 text-white shadow-lg sm:-right-6">
              <p className="font-heading text-4xl font-semibold">12+</p>
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
              it home. What started as a small family operation has grown into a
              trusted team of guides, planners and storytellers.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Today,{" "}
              <strong className="text-text">Ceylon Trip Planners (Pvt) Ltd</strong>{" "}
              is a registered Sri Lankan travel company, but our approach hasn&apos;t
              changed. Every itinerary is still crafted by hand — shaped around
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
        <div className="container-px mx-auto grid max-w-[90rem] grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl font-semibold sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-[90rem]">
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
                <h3 className="mt-4 font-heading text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we specialise */}
      <section className="bg-surface py-16 lg:py-24">
        <div className="container-px mx-auto max-w-[90rem]">
          <SectionHeading
            eyebrow="Our expertise"
            title="Where we take you"
            subtitle="From ancient kingdoms to wild coastlines, we know every corner of the island."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specialities.map((s) => (
              <div
                key={s.title}
                className="flex gap-4 rounded-2xl border border-border bg-white p-6"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registered & trusted */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-[90rem]">
          <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-primary-dark p-8 text-white sm:p-10 lg:grid-cols-2 lg:p-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Registered &amp; trusted
              </span>
              <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
                Travel with a company you can rely on
              </h2>
              <p className="mt-4 leading-relaxed text-white/80">
                Ceylon Trip Planners (Pvt) Ltd is a registered Sri Lankan private
                limited company. We&apos;re committed to responsible, sustainable
                tourism — working with local guides, family-run stays and
                community partners — and to being fully transparent about what
                your trip includes, every step of the way.
              </p>
              <Button href="/contact" variant="secondary" className="mt-8">
                Start planning with us
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {trust.map((t) => (
                <div
                  key={t.title}
                  className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-[#3a2a00]">
                    <t.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
