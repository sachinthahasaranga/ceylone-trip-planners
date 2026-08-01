import { AdminHeader } from "@/components/admin/form";
import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPage() {
  return (
    <div>
      <AdminHeader title="Add blog post" back="/admin/blog" />
      <BlogForm />
    </div>
  );
}
