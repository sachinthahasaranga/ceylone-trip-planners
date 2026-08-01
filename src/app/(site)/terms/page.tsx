import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms & Conditions" crumbs={[{ label: "Terms" }]} />
      <section className="py-16">
        <div className="container-px mx-auto max-w-3xl space-y-5 text-muted">
          <p>
            This is placeholder legal content. By booking a tour with Ceylon Trip
            Planners you agree to the following terms and conditions.
          </p>
          <h2 className="font-heading text-xl font-semibold text-text">Bookings & payments</h2>
          <p>
            A deposit is required to confirm your booking. Full payment terms
            will be provided at the time of confirmation.
          </p>
          <h2 className="font-heading text-xl font-semibold text-text">Cancellations</h2>
          <p>
            Free cancellation is available up to 30 days before travel. Cancellation
            terms closer to departure will be outlined in your booking confirmation.
          </p>
          <p className="text-sm">Replace this with your finalised terms before launch.</p>
        </div>
      </section>
    </>
  );
}
