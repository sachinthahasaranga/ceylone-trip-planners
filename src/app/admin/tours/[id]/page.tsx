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
  const [tour, categories] = await Promise.all([
    prisma.tourPackage.findUnique({ where: { id } }),
    prisma.category.findMany({ where: { type: "TOUR" }, orderBy: { name: "asc" } }),
  ]);
  if (!tour) notFound();

  return (
    <div>
      <AdminHeader title="Edit tour" back="/admin/tours" />
      <TourForm tour={tour} categories={categories} />
    </div>
  );
}
