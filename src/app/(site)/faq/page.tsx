import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about traveling to Sri Lanka with Ceylon Trip Planners.",
};

const faqs = [
  {
    q: "Do I need a visa to visit Sri Lanka?",
    a: "Most nationalities need an Electronic Travel Authorisation (ETA), which is quick and easy to apply for online before you travel. We're happy to guide you through the process.",
  },
  {
    q: "When is the best time to visit?",
    a: "Sri Lanka is a year-round destination thanks to two monsoon seasons affecting different coasts. Generally, December–March is best for the west/south and April–September for the east.",
  },
  {
    q: "Are your tours private or group?",
    a: "All our tours are private by default — just you and your travel companions with a dedicated guide and vehicle. We can arrange small-group departures on request.",
  },
  {
    q: "How do I book and pay?",
    a: "Simply send an enquiry through any tour page. We'll confirm availability and details by email, then arrange a secure deposit. No payment is taken online at the enquiry stage.",
  },
  {
    q: "Can you customise an itinerary for me?",
    a: "Absolutely — customisation is our specialty. Tell us your interests, dates and budget, and we'll craft a tailor-made itinerary free of charge.",
  },
  {
    q: "Is Sri Lanka safe for tourists?",
    a: "Yes. Sri Lanka is a welcoming and safe destination for travelers, including solo travelers and families. Our team is on call 24/7 throughout your trip.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before you travel."
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="py-16 lg:py-20">
        <div className="container-px mx-auto max-w-3xl">
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-border bg-white p-6 [&_summary::-webkit-details-marker]:hidden"
                open={i === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between font-heading text-lg font-bold">
                  {f.q}
                  <span className="ml-4 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-surface p-8 text-center">
            <h3 className="font-heading text-xl font-bold">Still have questions?</h3>
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
