import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/form";
import { TourForm } from "@/components/admin/tour-form";

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = await prisma.tourPackage.findUnique({ where: { id } });
  if (!tour) notFound();

  return (
    <div>
      <AdminHeader title="Edit tour" back="/admin/tours" />
      <TourForm tour={tour} />
    </div>
  );
}
