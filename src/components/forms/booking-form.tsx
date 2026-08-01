"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export function BookingForm({
  tourSlug,
  tourTitle,
  price,
}: {
  tourSlug: string;
  tourTitle: string;
  price: number;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelDate: "",
    adults: 2,
    children: 0,
    message: "",
  });

  const set = (k: string, v: string | number) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tourSlug, tourTitle }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-xl bg-primary/10 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
        <h4 className="mt-3 font-heading text-lg font-semibold text-primary">
          Enquiry sent!
        </h4>
        <p className="mt-1 text-sm text-muted">
          Thank you. Our team will email you within 24 hours to confirm details.
        </p>
      </div>
    );
  }

  const input =
    "h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        required
        placeholder="Full name"
        className={input}
        value={form.fullName}
        onChange={(e) => set("fullName", e.target.value)}
      />
      <input
        required
        type="email"
        placeholder="Email address"
        className={input}
        value={form.email}
        onChange={(e) => set("email", e.target.value)}
      />
      <input
        placeholder="Phone / WhatsApp"
        className={input}
        value={form.phone}
        onChange={(e) => set("phone", e.target.value)}
      />
      <label className="block text-xs font-medium text-muted">
        Preferred travel date
        <input
          type="date"
          className={`${input} mt-1`}
          value={form.travelDate}
          onChange={(e) => set("travelDate", e.target.value)}
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-xs font-medium text-muted">
          Adults
          <input
            type="number"
            min={1}
            className={`${input} mt-1`}
            value={form.adults}
            onChange={(e) => set("adults", Number(e.target.value))}
          />
        </label>
        <label className="block text-xs font-medium text-muted">
          Children
          <input
            type="number"
            min={0}
            className={`${input} mt-1`}
            value={form.children}
            onChange={(e) => set("children", Number(e.target.value))}
          />
        </label>
      </div>
      <textarea
        placeholder="Anything special you'd like? (optional)"
        rows={3}
        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        value={form.message}
        onChange={(e) => set("message", e.target.value)}
      />

      {state === "error" && (
        <p className="text-sm text-accent">
          Something went wrong. Please try again or WhatsApp us.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending…
          </>
        ) : (
          "Request to Book"
        )}
      </button>
    </form>
  );
}
