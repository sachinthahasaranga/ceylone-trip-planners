import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const apiKey = process.env.MAILERSEND_API_KEY || "";

const mailerSend = new MailerSend({ apiKey });

const from = new Sender(
  process.env.MAIL_FROM_EMAIL || "noreply@example.com",
  process.env.MAIL_FROM_NAME || "Ceylon Trip Planners"
);

type SendArgs = {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail({ to, toName, subject, html, text }: SendArgs) {
  if (!apiKey) {
    console.warn("[mail] MAILERSEND_API_KEY not set — skipping send:", subject);
    return { skipped: true };
  }

  const recipients = [new Recipient(to, toName || to)];

  const emailParams = new EmailParams()
    .setFrom(from)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(html)
    .setText(text || html.replace(/<[^>]+>/g, " "));

  return mailerSend.email.send(emailParams);
}

export function baseTemplate(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f7f9f8;font-family:Arial,Helvetica,sans-serif;color:#14201d">
    <div style="max-width:560px;margin:0 auto;padding:24px">
      <div style="background:#0e7c66;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
        <h2 style="margin:0;font-size:20px">Ceylon Trip Planners</h2>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e3e9e7;border-top:none">
        <h3 style="margin-top:0">${title}</h3>
        ${body}
      </div>
      <p style="text-align:center;color:#5f6f6a;font-size:12px;margin-top:16px">
        © Ceylon Trip Planners · Discover the wonder of Sri Lanka
      </p>
    </div>
  </body></html>`;
}
