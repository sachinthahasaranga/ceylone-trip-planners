import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { GoogleButton } from "@/components/auth/google-button";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-muted">Sign in to continue your journey.</p>

      <div className="mt-8">
        <GoogleButton />
      </div>

      <div className="my-6 flex items-center gap-4 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        OR
        <span className="h-px flex-1 bg-border" />
      </div>

      <LoginForm />

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
