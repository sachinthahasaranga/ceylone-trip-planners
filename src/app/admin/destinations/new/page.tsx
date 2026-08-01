import { AdminHeader } from "@/components/admin/form";
import { DestinationForm } from "@/components/admin/destination-form";

export default function NewDestinationPage() {
  return (
    <div>
      <AdminHeader title="Add destination" back="/admin/destinations" />
      <DestinationForm />
    </div>
  );
}
