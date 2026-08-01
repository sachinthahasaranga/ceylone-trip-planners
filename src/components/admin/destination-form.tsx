import type { Destination } from "@prisma/client";
import { saveDestination } from "@/app/admin/actions";
import {
  Field,
  Input,
  Textarea,
  Toggle,
  Card,
  SubmitButton,
} from "@/components/admin/form";
import { ImageUploader } from "@/components/admin/image-uploader";

export function DestinationForm({ destination }: { destination?: Destination }) {
  const action = saveDestination.bind(null, destination?.id ?? null);

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <Input name="name" defaultValue={destination?.name} required />
            </Field>
            <Field label="Region">
              <Input
                name="region"
                defaultValue={destination?.region ?? ""}
                placeholder="e.g. Hill Country"
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Slug" hint="Leave blank to auto-generate from the name">
              <Input name="slug" defaultValue={destination?.slug} placeholder="sigiriya" />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Short description">
              <Textarea name="shortDesc" rows={2} defaultValue={destination?.shortDesc ?? ""} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Full description">
              <Textarea name="description" rows={6} defaultValue={destination?.description ?? ""} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Highlights" hint="One per line">
              <Textarea
                name="highlights"
                rows={4}
                defaultValue={destination?.highlights?.join("\n") ?? ""}
                placeholder={"Lion's Paw entrance\nAncient frescoes"}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Best time to visit">
              <Input name="bestTime" defaultValue={destination?.bestTime ?? ""} />
            </Field>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 font-heading text-lg font-bold">SEO</h3>
          <div className="space-y-4">
            <Field label="Meta title">
              <Input name="metaTitle" defaultValue={destination?.metaTitle ?? ""} />
            </Field>
            <Field label="Meta description">
              <Textarea name="metaDescription" rows={2} defaultValue={destination?.metaDescription ?? ""} />
            </Field>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <ImageUploader
            name="gallery"
            label="Gallery images"
            multiple
            defaultValue={destination?.gallery ?? []}
          />
          <p className="mt-3 text-xs text-muted">
            The first image is used as the cover.
          </p>
        </Card>

        <Card>
          <div className="space-y-3">
            <Toggle name="published" label="Published" defaultChecked={destination?.published ?? true} />
            <Toggle name="featured" label="Featured on homepage" defaultChecked={destination?.featured ?? false} />
          </div>
        </Card>

        <SubmitButton>Save destination</SubmitButton>
      </div>
    </form>
  );
}
