import type { TourPackage } from "@prisma/client";
import { saveTour } from "@/app/admin/actions";
import {
  Field,
  Input,
  Textarea,
  Select,
  Toggle,
  Card,
  SubmitButton,
} from "@/components/admin/form";
import { ImageUploader } from "@/components/admin/image-uploader";

export function TourForm({ tour }: { tour?: TourPackage }) {
  const action = saveTour.bind(null, tour?.id ?? null);

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <Field label="Title">
            <Input name="title" defaultValue={tour?.title} required />
          </Field>
          <div className="mt-4">
            <Field label="Slug" hint="Leave blank to auto-generate">
              <Input name="slug" defaultValue={tour?.slug} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Summary">
              <Textarea name="summary" rows={2} defaultValue={tour?.summary ?? ""} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Description">
              <Textarea name="description" rows={6} defaultValue={tour?.description ?? ""} />
            </Field>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Inclusions" hint="One per line">
              <Textarea name="inclusions" rows={5} defaultValue={tour?.inclusions?.join("\n") ?? ""} />
            </Field>
            <Field label="Exclusions" hint="One per line">
              <Textarea name="exclusions" rows={5} defaultValue={tour?.exclusions?.join("\n") ?? ""} />
            </Field>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 font-heading text-lg font-bold">SEO</h3>
          <div className="space-y-4">
            <Field label="Meta title">
              <Input name="metaTitle" defaultValue={tour?.metaTitle ?? ""} />
            </Field>
            <Field label="Meta description">
              <Textarea name="metaDescription" rows={2} defaultValue={tour?.metaDescription ?? ""} />
            </Field>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <ImageUploader name="gallery" label="Tour images" multiple defaultValue={tour?.gallery ?? []} />
        </Card>

        <Card>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (USD)">
              <Input name="price" type="number" min={0} defaultValue={tour?.price ?? 0} required />
            </Field>
            <Field label="Difficulty">
              <Select name="difficulty" defaultValue={tour?.difficulty ?? "Easy"}>
                <option>Easy</option>
                <option>Moderate</option>
                <option>Challenging</option>
              </Select>
            </Field>
            <Field label="Days">
              <Input name="durationDays" type="number" min={1} defaultValue={tour?.durationDays ?? 1} required />
            </Field>
            <Field label="Nights">
              <Input name="durationNights" type="number" min={0} defaultValue={tour?.durationNights ?? 0} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Group size">
              <Input name="groupSize" defaultValue={tour?.groupSize ?? "Private"} />
            </Field>
          </div>
        </Card>

        <Card>
          <div className="space-y-3">
            <Toggle name="published" label="Published" defaultChecked={tour?.published ?? true} />
            <Toggle name="featured" label="Featured on homepage" defaultChecked={tour?.featured ?? false} />
          </div>
        </Card>

        <SubmitButton>Save tour</SubmitButton>
      </div>
    </form>
  );
}
