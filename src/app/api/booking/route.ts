import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail, baseTemplate } from "@/lib/mail";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  travelDate: z.string().optional(),
  adults: z.number().int().min(1).default(1),
  children: z.number().int().min(0).default(0),
  message: z.string().optional(),
  tourSlug: z.string().optional(),
  tourTitle: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());

    await prisma.booking.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        travelDate: data.travelDate ? new Date(data.travelDate) : null,
        adults: data.adults,
        children: data.children,
        message: data.message
          ? `[${data.tourTitle ?? data.tourSlug ?? "General"}] ${data.message}`
          : `Enquiry for ${data.tourTitle ?? data.tourSlug ?? "a tour"}`,
      },
    });

    // Confirmation to customer
    await sendEmail({
      to: data.email,
      toName: data.fullName,
      subject: "We received your booking enquiry — Ceylon Trip Planners",
      html: baseTemplate(
        `Thank you, ${data.fullName}!`,
        `<p>We've received your enquiry${
          data.tourTitle ? ` for <strong>${data.tourTitle}</strong>` : ""
        }.</p>
         <p>Our travel team will get back to you within 24 hours to confirm
         availability and craft your perfect itinerary.</p>
         <p style="margin-top:16px">Travellers: ${data.adults} adult(s), ${data.children} child(ren)</p>`
      ),
    });

    // Notify admin
    if (process.env.ADMIN_NOTIFY_EMAIL) {
      await sendEmail({
        to: process.env.ADMIN_NOTIFY_EMAIL,
        subject: `New booking enquiry: ${data.tourTitle ?? "General"}`,
        html: baseTemplate(
          "New booking enquiry",
          `<p><strong>${data.fullName}</strong> (${data.email}, ${
            data.phone ?? "no phone"
          })</p>
           <p>Tour: ${data.tourTitle ?? data.tourSlug ?? "—"}</p>
           <p>Date: ${data.travelDate ?? "flexible"}</p>
           <p>Travellers: ${data.adults} adults, ${data.children} children</p>
           <p>Message: ${data.message ?? "—"}</p>`
        ),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[booking]", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
