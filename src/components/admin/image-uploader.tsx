"use client";

import Image from "next/image";
import { useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";

/**
 * Uploads directly to Cloudinary using a signed request from /api/cloudinary/sign.
 * Stores resulting secure_url(s) in a hidden input named `name` (comma-separated
 * when multiple), so it works inside a plain <form> submitted to a server action.
 */
export function ImageUploader({
  name,
  multiple = false,
  defaultValue = [],
  label = "Images",
}: {
  name: string;
  multiple?: boolean;
  defaultValue?: string[];
  label?: string;
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue.filter(Boolean));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError("");
    try {
      const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
      if (!signRes.ok) throw new Error("sign failed");
      const { signature, timestamp, apiKey, cloudName, folder } =
        await signRes.json();

      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("api_key", apiKey);
        fd.append("timestamp", String(timestamp));
        fd.append("signature", signature);
        fd.append("folder", folder);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: fd }
        );
        const data = await res.json();
        if (data.secure_url) uploaded.push(data.secure_url);
      }
      setUrls((prev) => (multiple ? [...prev, ...uploaded] : uploaded.slice(-1)));
    } catch {
      setError("Upload failed. Check your Cloudinary keys / connection.");
    } finally {
      setBusy(false);
    }
  }

  function remove(url: string) {
    setUrls((prev) => prev.filter((u) => u !== url));
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input type="hidden" name={name} value={urls.join(",")} />

      <div className="flex flex-wrap gap-3">
        {urls.map((url) => (
          <div key={url} className="group relative h-24 w-24 overflow-hidden rounded-lg border border-border">
            <Image src={url} alt="upload" fill sizes="96px" className="object-cover" />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {(multiple || urls.length === 0) && (
          <label className="grid h-24 w-24 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-border text-muted transition hover:border-primary hover:text-primary">
            {busy ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <UploadCloud className="h-6 w-6" />
            )}
            <input
              type="file"
              accept="image/*"
              multiple={multiple}
              className="hidden"
              onChange={(e) => upload(e.target.files)}
            />
          </label>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-accent">{error}</p>}
    </div>
  );
}
