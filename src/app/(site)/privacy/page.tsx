import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" crumbs={[{ label: "Privacy" }]} />
      <section className="py-16">
        <div className="container-px mx-auto max-w-3xl space-y-5 text-muted">
          <p>
            This is placeholder legal content. Ceylon Trip Planners respects your
            privacy and is committed to protecting your personal data. This
            policy explains how we collect, use and safeguard your information.
          </p>
          <h2 className="font-heading text-xl font-bold text-text">Information we collect</h2>
          <p>
            We collect information you provide when making an enquiry or booking,
            including your name, email, phone number and travel preferences.
          </p>
          <h2 className="font-heading text-xl font-bold text-text">How we use it</h2>
          <p>
            Your information is used solely to respond to enquiries, arrange your
            travel and, with your consent, send you relevant offers. We never
            sell your data to third parties.
          </p>
          <p className="text-sm">Replace this with your finalised privacy policy before launch.</p>
        </div>
      </section>
    </>
  );
}
