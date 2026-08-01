import { prisma } from "@/lib/prisma";
import { saveSettings } from "@/app/admin/actions";
import {
  AdminHeader,
  Field,
  Input,
  Textarea,
  Card,
  SubmitButton,
} from "@/components/admin/form";

async function getSettings() {
  try {
    return await prisma.siteSetting.findUnique({ where: { id: "default" } });
  } catch {
    return null;
  }
}

export default async function AdminSettingsPage() {
  const s = await getSettings();

  return (
    <div>
      <AdminHeader title="Site Settings" subtitle="Manage global site information." />

      <form action={saveSettings} className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-heading text-lg font-bold">General</h3>
          <div className="space-y-4">
            <Field label="Site name">
              <Input name="siteName" defaultValue={s?.siteName ?? "Ceylon Trip Planners"} />
            </Field>
            <Field label="Tagline">
              <Input name="tagline" defaultValue={s?.tagline ?? ""} />
            </Field>
            <Field label="Hero title">
              <Input name="heroTitle" defaultValue={s?.heroTitle ?? ""} />
            </Field>
            <Field label="Hero subtitle">
              <Textarea name="heroSubtitle" rows={2} defaultValue={s?.heroSubtitle ?? ""} />
            </Field>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 font-heading text-lg font-bold">Contact</h3>
          <div className="space-y-4">
            <Field label="Phone">
              <Input name="phone" defaultValue={s?.phone ?? ""} />
            </Field>
            <Field label="WhatsApp">
              <Input name="whatsapp" defaultValue={s?.whatsapp ?? ""} />
            </Field>
            <Field label="Email">
              <Input name="email" type="email" defaultValue={s?.email ?? ""} />
            </Field>
            <Field label="Address">
              <Textarea name="address" rows={2} defaultValue={s?.address ?? ""} />
            </Field>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 font-heading text-lg font-bold">Social</h3>
          <div className="space-y-4">
            <Field label="Facebook URL">
              <Input name="facebook" defaultValue={s?.facebook ?? ""} />
            </Field>
            <Field label="Instagram URL">
              <Input name="instagram" defaultValue={s?.instagram ?? ""} />
            </Field>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 font-heading text-lg font-bold">Default SEO</h3>
          <div className="space-y-4">
            <Field label="Meta title">
              <Input name="metaTitle" defaultValue={s?.metaTitle ?? ""} />
            </Field>
            <Field label="Meta description">
              <Textarea name="metaDescription" rows={3} defaultValue={s?.metaDescription ?? ""} />
            </Field>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <SubmitButton>Save settings</SubmitButton>
        </div>
      </form>
    </div>
  );
}
