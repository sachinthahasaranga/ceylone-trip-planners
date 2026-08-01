import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/form";
import { TourForm } from "@/components/admin/tour-form";

async function getCategories() {
  try {
    return await prisma.category.findMany({
      where: { type: "TOUR" },
      orderBy: { name: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function NewTourPage() {
  const categories = await getCategories();
  return (
    <div>
      <AdminHeader title="Add tour package" back="/admin/tours" />
      <TourForm categories={categories} />
    </div>
  );
}
