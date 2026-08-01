import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail, baseTemplate } from "@/lib/mail";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());

    await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      },
    });

    if (process.env.ADMIN_NOTIFY_EMAIL) {
      await sendEmail({
        to: process.env.ADMIN_NOTIFY_EMAIL,
        subject: `New contact message: ${data.subject ?? "General enquiry"}`,
        html: baseTemplate(
          "New contact message",
          `<p><strong>${data.name}</strong> (${data.email}, ${data.phone ?? "no phone"})</p>
           <p>${data.message}</p>`
        ),
      });
    }

    await sendEmail({
      to: data.email,
      toName: data.name,
      subject: "Thanks for contacting Ceylon Trip Planners",
      html: baseTemplate(
        `Hi ${data.name},`,
        `<p>Thank you for reaching out. We've received your message and will
         reply within 24 hours.</p><p>Warm regards,<br/>The Ceylon Trip Planners team</p>`
      ),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
