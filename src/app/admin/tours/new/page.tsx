import { AdminHeader } from "@/components/admin/form";
import { TourForm } from "@/components/admin/tour-form";

export default function NewTourPage() {
  return (
    <div>
      <AdminHeader title="Add tour package" back="/admin/tours" />
      <TourForm />
    </div>
  );
}
