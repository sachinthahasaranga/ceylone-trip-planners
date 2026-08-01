import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { LegalDoc, Section, List } from "@/components/legal/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Ceylon Trip Planners collects, uses, shares and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="Your privacy matters to us. Here's how we handle your information."
        crumbs={[{ label: "Privacy Policy" }]}
      />

      <LegalDoc
        updated="2 August 2026"
        intro="Ceylon Trip Planners (“we”, “us”, “our”) is committed to protecting your privacy. This Privacy Policy explains what personal information we collect when you use our website or book a tour with us, how we use and safeguard it, and the rights you have over it. By using our website or services, you agree to the practices described here."
      >
        <Section n={1} title="Who we are">
          <p>
            Ceylon Trip Planners is a travel and tour operator based in Sri
            Lanka. For any privacy-related questions or requests, contact us at:
          </p>
          <List
            items={[
              "Email: info@ceylontripplanners.com",
              "Phone: +94 71 275 8785",
              "Address: No 125, Winsant Park, Negombo, Sri Lanka",
            ]}
          />
        </Section>

        <Section n={2} title="Information we collect">
          <p>We collect information in the following ways:</p>
          <p className="font-medium text-text">Information you give us</p>
          <List
            items={[
              "Contact details such as your name, email address and phone number.",
              "Booking and enquiry details including travel dates, number of travellers, destinations, and any preferences or special requirements you share.",
              "Account information if you register — your name, email and a securely hashed password (we never store your password in plain text).",
              "Communications you send us through forms, chat, email or WhatsApp.",
            ]}
          />
          <p className="font-medium text-text">
            Information we collect automatically
          </p>
          <List
            items={[
              "Technical data such as your IP address, browser type, device information and pages visited.",
              "Usage data about how you interact with our website, collected through cookies and similar technologies.",
            ]}
          />
          <p className="font-medium text-text">Information from third parties</p>
          <List
            items={[
              "If you sign in with Google, we receive basic profile information (your name, email address and profile picture) as permitted by your Google account settings.",
            ]}
          />
        </Section>

        <Section n={3} title="How we use your information">
          <p>We use your personal information to:</p>
          <List
            items={[
              "Respond to your enquiries and prepare tailored travel proposals.",
              "Process, confirm and manage your bookings.",
              "Communicate with you about your trip, including confirmations, updates and support.",
              "Manage your account and, where relevant, your saved tours and booking history.",
              "Send you newsletters, offers and travel inspiration — only where you have subscribed or requested them (you can unsubscribe at any time).",
              "Improve our website, services and customer experience.",
              "Comply with legal, accounting and regulatory obligations, and prevent fraud or misuse.",
            ]}
          />
        </Section>

        <Section n={4} title="Legal bases for processing">
          <p>
            Where applicable, we rely on the following legal bases to process
            your personal information: your <strong>consent</strong> (for
            example, marketing emails); the <strong>performance of a contract</strong>{" "}
            (to arrange the travel services you request); our{" "}
            <strong>legitimate interests</strong> (to operate and improve our
            business); and <strong>legal obligations</strong> we are required to
            meet.
          </p>
        </Section>

        <Section n={5} title="How we share your information">
          <p>
            We do not sell your personal information. We share it only where
            necessary to deliver our services, including with:
          </p>
          <List
            items={[
              "Travel suppliers such as hotels, guides, transport providers and activity operators, so your trip can be arranged.",
              "Trusted service providers who help us run our website and business — including our hosting and database provider, our media provider (Cloudinary), and our email delivery provider (MailerSend).",
              "Payment processors, where an online payment is arranged, to handle transactions securely (we do not store your full card details ourselves).",
              "Authorities or advisors where required by law, or to protect our rights, safety or property.",
            ]}
          />
        </Section>

        <Section n={6} title="International data transfers">
          <p>
            Because we work with international suppliers and cloud service
            providers, your information may be processed in countries outside
            your own. Where this happens, we take reasonable steps to ensure your
            information continues to be protected in line with this policy.
          </p>
        </Section>

        <Section n={7} title="Cookies and tracking">
          <p>
            Our website uses cookies and similar technologies to make the site
            work, remember your preferences, and understand how it is used. You
            can control or disable cookies through your browser settings, though
            some features may not function properly if you do.
          </p>
        </Section>

        <Section n={8} title="Data retention">
          <p>
            We keep your personal information only for as long as necessary to
            provide our services, maintain your booking records, comply with
            legal and accounting requirements, and resolve any disputes. When it
            is no longer needed, we securely delete or anonymise it.
          </p>
        </Section>

        <Section n={9} title="Your rights">
          <p>
            Depending on your location, you may have the right to access,
            correct, update or delete your personal information; to object to or
            restrict certain processing; to withdraw consent; and to request a
            copy of the data you have provided. To exercise any of these rights,
            contact us at info@ceylontripplanners.com and we will respond within
            a reasonable timeframe.
          </p>
        </Section>

        <Section n={10} title="Security">
          <p>
            We use appropriate technical and organisational measures to protect
            your information, including encrypted connections, hashed passwords
            and restricted access. However, no method of transmission or storage
            is completely secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section n={11} title="Children's privacy">
          <p>
            Our website is not intended for children under 16, and we do not
            knowingly collect their personal information. Bookings involving
            children should be made by a parent or guardian.
          </p>
        </Section>

        <Section n={12} title="Third-party links">
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those sites, and
            we encourage you to review their policies.
          </p>
        </Section>

        <Section n={13} title="Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with an updated “Last updated” date. We
            encourage you to review it periodically.
          </p>
        </Section>

        <Section n={14} title="Contact us">
          <p>
            If you have any questions about this Privacy Policy or how we handle
            your information, please contact us at
            info@ceylontripplanners.com or +94 71 275 8785.
          </p>
        </Section>
      </LegalDoc>
    </>
  );
}
