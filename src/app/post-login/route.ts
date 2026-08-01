import { redirect } from "next/navigation";
import { auth } from "@/auth";

// After OAuth sign-in, send admins to the dashboard and others to their account.
export async function GET() {
  const session = await auth();
  redirect(session?.user?.role === "ADMIN" ? "/admin" : "/account");
}
