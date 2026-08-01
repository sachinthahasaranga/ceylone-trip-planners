import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ceylon Trip Planners to plan your perfect Sri Lanka holiday.",
};

const info = [
  { icon: MapPin, label: "Visit us", value: "42 Galle Road, Colombo 03, Sri Lanka" },
  { icon: Phone, label: "Call us", value: "+94 77 123 4567", href: "tel:+94771234567" },
  { icon: Mail, label: "Email us", value: "info@ceylontripplanners.com", href: "mailto:info@ceylontripplanners.com" },
  { icon: Clock, label: "Office hours", value: "Mon–Sat, 9am – 6pm (GMT+5:30)" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        subtitle="Let's start planning your Sri Lankan adventure together."
        crumbs={[{ label: "Contact" }]}
        image="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Info */}
          <div>
            <h2 className="font-heading text-3xl font-semibold">Talk to a local expert</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Whether you have a question or you&apos;re ready to plan, we&apos;d
              love to hear from you. Reach out and a real person will get back to
              you within 24 hours.
            </p>

            <div className="mt-8 space-y-5">
              {info.map((i) => (
                <div key={i.label} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <i.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{i.label}</p>
                    {i.href ? (
                      <a href={i.href} className="text-muted hover:text-primary">
                        {i.value}
                      </a>
                    ) : (
                      <p className="text-muted">{i.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:brightness-105"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
            <h3 className="mb-6 font-heading text-2xl font-semibold">Send us a message</h3>
            <ContactForm />
          </div>
        </div>

        {/* Map */}
        <div className="container-px mx-auto mt-16 max-w-[90rem]">
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Ceylon Trip Planners location"
              src="https://www.google.com/maps?q=Colombo,Sri+Lanka&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              className="w-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
