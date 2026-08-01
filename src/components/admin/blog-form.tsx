import type { BlogPost } from "@prisma/client";
import { saveBlogPost } from "@/app/admin/actions";
import {
  Field,
  Input,
  Textarea,
  Toggle,
  Card,
  SubmitButton,
} from "@/components/admin/form";
import { ImageUploader } from "@/components/admin/image-uploader";

export function BlogForm({ post }: { post?: BlogPost }) {
  const action = saveBlogPost.bind(null, post?.id ?? null);

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <Field label="Title">
            <Input name="title" defaultValue={post?.title} required />
          </Field>
          <div className="mt-4">
            <Field label="Slug" hint="Leave blank to auto-generate">
              <Input name="slug" defaultValue={post?.slug} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Excerpt">
              <Textarea name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Content" hint="Supports plain text / markdown">
              <Textarea name="content" rows={12} defaultValue={post?.content ?? ""} />
            </Field>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 font-heading text-lg font-bold">SEO</h3>
          <div className="space-y-4">
            <Field label="Meta title">
              <Input name="metaTitle" defaultValue={post?.metaTitle ?? ""} />
            </Field>
            <Field label="Meta description">
              <Textarea name="metaDescription" rows={2} defaultValue={post?.metaDescription ?? ""} />
            </Field>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <ImageUploader name="coverImage" label="Cover image" defaultValue={post?.coverImage ? [post.coverImage] : []} />
        </Card>
        <Card>
          <div className="space-y-4">
            <Field label="Author">
              <Input name="author" defaultValue={post?.author ?? ""} />
            </Field>
            <Field label="Read minutes">
              <Input name="readMinutes" type="number" min={1} defaultValue={post?.readMinutes ?? 5} />
            </Field>
            <Field label="Tags" hint="Comma-separated">
              <Input name="tags" defaultValue={post?.tags?.join(", ") ?? ""} />
            </Field>
          </div>
        </Card>
        <Card>
          <div className="space-y-3">
            <Toggle name="published" label="Published" defaultChecked={post?.published ?? true} />
            <Toggle name="featured" label="Featured" defaultChecked={post?.featured ?? false} />
          </div>
        </Card>
        <SubmitButton>Save post</SubmitButton>
      </div>
    </form>
  );
}
