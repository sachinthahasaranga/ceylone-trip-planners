"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton({
  className = "",
  label = "Sign out",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className={className || "inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"}
    >
      <LogOut className="h-4 w-4" /> {label}
    </button>
  );
}
