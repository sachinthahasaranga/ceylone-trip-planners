import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata = { title: "Admin" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar userName={session.user.name} />
      <div className="lg:pl-64">
        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
