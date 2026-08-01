"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="h-12 w-full rounded-full border-0 bg-white px-5 text-sm text-text outline-none ring-2 ring-transparent focus:ring-secondary"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-[#3a2a00] transition hover:brightness-105 disabled:opacity-60"
        aria-label="Subscribe"
      >
        {state === "done" ? (
          <Check className="h-5 w-5" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </button>
    </form>
  );
}
