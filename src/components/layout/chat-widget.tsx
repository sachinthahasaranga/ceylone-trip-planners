"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Palmtree,
  Check,
  Loader2,
} from "lucide-react";

type Msg = { from: "bot" | "user"; text: string };

type Step =
  | { key: string; question: string; options: string[]; input?: never }
  | { key: string; question: string; input: "text" | "email" | "tel"; options?: never };

// Guided flow. Option steps qualify the lead; input steps collect contact info.
const FLOW: Step[] = [
  {
    key: "intent",
    question:
      "Hi there! 👋 I'm here to help you plan your perfect Sri Lanka trip. What can I help you with?",
    options: [
      "Browse tour packages",
      "Plan a custom trip",
      "Ask about a destination",
      "Pricing & availability",
    ],
  },
  {
    key: "interest",
    question: "Lovely! Which experiences excite you most?",
    options: [
      "Wildlife & Safari",
      "Beaches & Coast",
      "Culture & Heritage",
      "Hill Country & Tea",
      "Honeymoon & Luxury",
    ],
  },
  {
    key: "timing",
    question: "When are you hoping to travel?",
    options: ["Within a month", "1–3 months", "3–6 months", "Just exploring"],
  },
  {
    key: "travelers",
    question: "And who's travelling?",
    options: ["Solo", "Couple", "Family", "Group (5+)"],
  },
  {
    key: "name",
    question:
      "Perfect — our travel expert will put together some ideas for you. What's your name?",
    input: "text",
  },
  {
    key: "email",
    question: "Thanks {name}! What's the best email to send your suggestions to?",
    input: "email",
  },
  {
    key: "phone",
    question: "Great. And a contact number (with country code) so we can reach you?",
    input: "tel",
  },
];

const WHATSAPP = "https://wa.me/94771234567";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const current = FLOW[step];
  const finished = step >= FLOW.length;

  // Seed the first bot message when opened the first time
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: "bot", text: FLOW[0].question }]);
    }
  }, [open, messages.length]);

  // Auto-scroll to the newest message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  function fill(template: string, data: Record<string, string>) {
    return template.replace(/\{(\w+)\}/g, (_, k) => data[k] ?? "");
  }

  function pushNext(nextStep: number, data: Record<string, string>) {
    if (nextStep < FLOW.length) {
      setMessages((m) => [
        ...m,
        { from: "bot", text: fill(FLOW[nextStep].question, data) },
      ]);
      setStep(nextStep);
    } else {
      setStep(nextStep);
      submit(data);
    }
  }

  function answer(value: string) {
    if (!value.trim() || !current) return;
    const data = { ...answers, [current.key]: value.trim() };
    setAnswers(data);
    setMessages((m) => [...m, { from: "user", text: value.trim() }]);
    setInput("");
    setTimeout(() => pushNext(step + 1, data), 250);
  }

  async function submit(data: Record<string, string>) {
    setStatus("sending");
    try {
      const res = await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          answers: {
            intent: data.intent ?? "",
            interest: data.interest ?? "",
            timing: data.timing ?? "",
            travelers: data.travelers ?? "",
          },
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStep(0);
    setMessages([{ from: "bot", text: FLOW[0].question }]);
    setAnswers({});
    setInput("");
    setStatus("idle");
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110"
      >
        {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[70vh] max-h-[560px] w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary px-4 py-3.5 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
              <Palmtree className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="font-semibold leading-tight">Ceylon Trip Planners</p>
              <p className="flex items-center gap-1.5 text-xs text-white/80">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                Typically replies within minutes
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 hover:bg-white/15">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.from === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-white"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-sm text-text shadow-sm"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}

            {status === "sending" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-sm text-muted shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending your details…
                </div>
              </div>
            )}

            {status === "done" && (
              <div className="rounded-2xl bg-primary/10 p-4 text-center">
                <Check className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-sm font-semibold text-primary">All set! 🎉</p>
                <p className="mt-1 text-sm text-muted">
                  Thank you — our team will be in touch very soon.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Chat on WhatsApp
                  </a>
                  <button onClick={reset} className="text-xs text-muted hover:text-primary">
                    Start a new chat
                  </button>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="rounded-xl bg-accent/10 p-3 text-center text-sm text-accent">
                Something went wrong.{" "}
                <button onClick={() => submit(answers)} className="font-semibold underline">
                  Try again
                </button>
              </div>
            )}
          </div>

          {/* Input area */}
          {!finished && current && (
            <div className="border-t border-border bg-white p-3">
              {current.options ? (
                <div className="flex flex-wrap gap-2">
                  {current.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => answer(opt)}
                      className="rounded-full border border-primary/30 bg-primary/5 px-3.5 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    answer(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    autoFocus
                    type={current.input}
                    required
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      current.key === "name"
                        ? "Type your name…"
                        : current.key === "email"
                          ? "you@email.com"
                          : "+94 77 123 4567"
                    }
                    className="h-11 flex-1 rounded-full border border-border bg-surface px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    aria-label="Send"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-white transition hover:bg-primary-dark"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
