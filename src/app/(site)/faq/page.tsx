import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { getFaqs } from "@/lib/queries";

export const metadata: Metadata = {
  title: "FAQ — Sri Lanka Travel Questions",
  description:
    "Frequently asked questions about traveling to Sri Lanka with Ceylon Trip Planners — visas, best time to visit, bookings and more.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <>
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before you travel."
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="py-16 lg:py-20">
        <div className="container-px mx-auto max-w-3xl">
          {faqs.length === 0 ? (
            <p className="text-center text-muted">No FAQs yet.</p>
          ) : (
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-border bg-white p-6 [&_summary::-webkit-details-marker]:hidden"
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer items-center justify-between font-heading text-lg font-semibold">
                    {f.question}
                    <span className="ml-4 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted">{f.answer}</p>
                </details>
              ))}
            </div>
          )}

          <div className="mt-12 rounded-2xl bg-surface p-8 text-center">
            <h3 className="font-heading text-xl font-semibold">Still have questions?</h3>
            <p className="mt-2 text-muted">
              Our friendly team is here to help you plan the perfect trip.
            </p>
            <Button href="/contact" className="mt-5">
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
