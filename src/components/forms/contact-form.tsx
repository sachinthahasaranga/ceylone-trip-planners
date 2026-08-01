"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setState(res.ok ? "done" : "error");
      if (res.ok)
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setState("error");
    }
  }

  const input =
    "h-12 w-full rounded-lg border border-border bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  if (state === "done") {
    return (
      <div className="rounded-2xl bg-primary/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 font-heading text-xl font-semibold text-primary">
          Message sent!
        </h3>
        <p className="mt-2 text-muted">
          Thanks for reaching out. We&apos;ll reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input required placeholder="Your name" className={input} value={form.name} onChange={(e) => set("name", e.target.value)} />
        <input required type="email" placeholder="Email address" className={input} value={form.email} onChange={(e) => set("email", e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input placeholder="Phone (optional)" className={input} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        <input placeholder="Subject" className={input} value={form.subject} onChange={(e) => set("subject", e.target.value)} />
      </div>
      <textarea
        required
        rows={5}
        placeholder="Tell us about your dream trip…"
        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        value={form.message}
        onChange={(e) => set("message", e.target.value)}
      />
      {state === "error" && (
        <p className="text-sm text-accent">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
