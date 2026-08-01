import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail, baseTemplate } from "@/lib/mail";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(4),
  answers: z.record(z.string(), z.string()).default({}),
});

const LABELS: Record<string, string> = {
  intent: "Looking for",
  interest: "Interested in",
  timing: "Travel timing",
  travelers: "Travelers",
};

export async function POST(req: Request) {
  try {
    const { name, email, phone, answers } = schema.parse(await req.json());

    const summaryLines = Object.entries(answers)
      .filter(([, v]) => v)
      .map(([k, v]) => `${LABELS[k] ?? k}: ${v}`);
    const summaryText = summaryLines.join("\n");

    // Save as an enquiry
    await prisma.enquiry.create({
      data: {
        name,
        email,
        phone,
        subject: "Chat enquiry",
        message: `New chat lead\n\n${summaryText}`,
      },
    });

    // Notify the business (info@…)
    const adminTo =
      process.env.ADMIN_NOTIFY_EMAIL || process.env.MAIL_FROM_EMAIL || "";
    if (adminTo) {
      await sendEmail({
        to: adminTo,
        subject: `New chat lead: ${name}`,
        html: baseTemplate(
          "New chat enquiry",
          `<p><strong>${name}</strong></p>
           <p>Email: <a href="mailto:${email}">${email}</a><br/>
           Phone: ${phone}</p>
           <h4 style="margin-bottom:4px">Their answers</h4>
           <ul>${summaryLines.map((l) => `<li>${l}</li>`).join("")}</ul>`
        ),
      });
    }

    // Confirmation to the customer
    await sendEmail({
      to: email,
      toName: name,
      subject: "Thanks for reaching out — Ceylon Trip Planners",
      html: baseTemplate(
        `Hi ${name}, thanks for getting in touch!`,
        `<p>We've received your details and one of our Sri Lanka travel experts
         will reach out shortly with tailored suggestions.</p>
         ${summaryText ? `<p style="color:#5f6f6a">You told us:</p><ul>${summaryLines
           .map((l) => `<li>${l}</li>`)
           .join("")}</ul>` : ""}
         <p>Warm regards,<br/>The Ceylon Trip Planners team</p>`
      ),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[chat-lead]", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
