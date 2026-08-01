import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/form";
import { DestinationForm } from "@/components/admin/destination-form";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await prisma.destination.findUnique({ where: { id } });
  if (!destination) notFound();

  return (
    <div>
      <AdminHeader title="Edit destination" back="/admin/destinations" />
      <DestinationForm destination={destination} />
    </div>
  );
}
