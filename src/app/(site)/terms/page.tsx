import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { LegalDoc, Section, List } from "@/components/legal/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions that apply when you book a tour or use the services of Ceylon Trip Planners.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        subtitle="The terms that apply when you travel with Ceylon Trip Planners."
        crumbs={[{ label: "Terms & Conditions" }]}
      />

      <LegalDoc
        updated="2 August 2026"
        intro="These Terms & Conditions govern your use of the Ceylon Trip Planners website and the travel services we provide. By making an enquiry or booking with us, you confirm that you have read, understood and agree to these terms on behalf of yourself and all members of your travel party."
      >
        <Section n={1} title="Definitions">
          <List
            items={[
              "“We”, “us”, “our” means Ceylon Trip Planners.",
              "“You”, “traveller”, “client” means the person making the booking and all members of the travel party.",
              "“Tour” or “package” means the travel services, itinerary and arrangements we agree to provide.",
              "“Booking” means a confirmed reservation for a tour or service.",
            ]}
          />
        </Section>

        <Section n={2} title="Enquiries and bookings">
          <p>
            When you submit an enquiry, we prepare a proposed itinerary and quote
            based on the information you provide. An enquiry is not a confirmed
            booking. A booking is only confirmed once we have accepted it in
            writing (by email) and any required deposit has been received. Please
            check your confirmation carefully and tell us immediately if any
            details are incorrect.
          </p>
        </Section>

        <Section n={3} title="Prices and inclusions">
          <p>
            Because our tours are tailor-made and rates vary by season, hotel
            selection and availability, prices are confirmed individually for
            each booking and quoted in your written proposal. Unless stated
            otherwise, prices do not include international flights, visa fees,
            travel insurance, meals not specified in the itinerary, tips, and
            personal expenses. What is and isn't included is set out in your
            itinerary.
          </p>
        </Section>

        <Section n={4} title="Deposit and payment">
          <p>
            A deposit is normally required to confirm your booking, with the
            balance due before travel. The exact deposit amount, payment methods
            and due dates will be set out in your booking confirmation. Bookings
            made close to the departure date may require full payment at the time
            of booking. Failure to pay by the due date may result in cancellation
            of your booking.
          </p>
        </Section>

        <Section n={5} title="Changes by you">
          <p>
            If you wish to change your itinerary, travel dates or party after
            confirmation, we will do our best to accommodate you. Changes may
            incur additional costs or supplier charges, which will be advised
            before we proceed.
          </p>
        </Section>

        <Section n={6} title="Cancellations and refunds">
          <p>
            If you need to cancel, please notify us in writing as soon as
            possible. Cancellation charges depend on how far in advance you
            cancel and the terms of the suppliers involved (such as hotels and
            transport providers). The applicable cancellation terms will be
            provided with your booking confirmation. Some deposits, fees and
            supplier charges may be non-refundable.
          </p>
        </Section>

        <Section n={7} title="Changes or cancellation by us">
          <p>
            We plan every trip carefully, but occasionally we may need to make
            changes. If a significant change becomes necessary before travel, we
            will inform you promptly and offer a suitable alternative or, where
            appropriate, a refund of amounts paid for the affected services. We
            are not liable for changes or cancellations caused by events beyond
            our reasonable control (see “Force majeure”).
          </p>
        </Section>

        <Section n={8} title="Passports, visas and travel documents">
          <p>
            It is your responsibility to ensure you hold a valid passport, the
            correct visa or Electronic Travel Authorisation (ETA), and any other
            documents required for your trip. We are happy to provide general
            guidance, but we are not liable for any consequences arising from
            missing or incorrect travel documents.
          </p>
        </Section>

        <Section n={9} title="Health, insurance and fitness to travel">
          <List
            items={[
              "We strongly recommend that all travellers hold comprehensive travel insurance covering medical expenses, cancellation, and personal belongings.",
              "You are responsible for ensuring you meet any health and vaccination requirements for Sri Lanka.",
              "Please tell us in advance of any medical conditions, disabilities or dietary needs so we can advise on suitability and make reasonable arrangements.",
            ]}
          />
        </Section>

        <Section n={10} title="Your conduct and responsibilities">
          <p>
            You agree to behave responsibly, respect local laws, customs and the
            environment, and follow the reasonable instructions of your guide. We
            may decline to provide services to, or remove from a tour, anyone
            whose behaviour endangers others or seriously disrupts the trip,
            without refund.
          </p>
        </Section>

        <Section n={11} title="Liability">
          <p>
            We act as an organiser and arrange services provided by independent
            third-party suppliers. We take reasonable care in selecting reputable
            suppliers, but we are not liable for the acts, omissions or default
            of any supplier, nor for loss, injury, delay or damage that is not
            caused by our negligence. To the maximum extent permitted by law, our
            liability for any claim is limited to the value of the services you
            booked with us.
          </p>
        </Section>

        <Section n={12} title="Force majeure">
          <p>
            We are not responsible for any failure or delay in performing our
            obligations caused by events beyond our reasonable control, including
            but not limited to natural disasters, extreme weather, fire, flood,
            epidemics or pandemics, war, civil unrest, strikes, government action,
            or transport disruption.
          </p>
        </Section>

        <Section n={13} title="Complaints">
          <p>
            If a problem arises during your trip, please tell your guide or
            contact us immediately so we can try to resolve it while you are
            still travelling. If the matter cannot be resolved at the time,
            please write to us at info@ceylontripplanners.com within a reasonable
            period after your return so we can investigate.
          </p>
        </Section>

        <Section n={14} title="Intellectual property">
          <p>
            All content on this website — including text, images, logos and
            itineraries — is owned by or licensed to Ceylon Trip Planners and may
            not be copied or reused without our written permission.
          </p>
        </Section>

        <Section n={15} title="Governing law">
          <p>
            These Terms & Conditions are governed by the laws of Sri Lanka, and
            any disputes shall be subject to the jurisdiction of the courts of
            Sri Lanka.
          </p>
        </Section>

        <Section n={16} title="Contact us">
          <p>
            For any questions about these Terms & Conditions, please contact us
            at info@ceylontripplanners.com or +94 77 123 4567, or write to us at
            42 Galle Road, Colombo 03, Sri Lanka.
          </p>
        </Section>
      </LegalDoc>
    </>
  );
}
