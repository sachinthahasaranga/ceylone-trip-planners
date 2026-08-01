"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

// SunEditor touches `window` on import, so load it client-side only.
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
  loading: () => (
    <div className="grid h-40 place-items-center rounded-lg border border-border bg-surface text-sm text-muted">
      Loading editor…
    </div>
  ),
});

type UploadHandler = (response: unknown) => void;

/**
 * Rich-text (WYSIWYG) editor that outputs HTML.
 * The HTML is mirrored into a hidden <input> so it submits with the
 * surrounding <form> to a server action, exactly like a normal field.
 * Inline images are uploaded to Cloudinary (not stored as base64).
 */
export function RichTextEditor({
  name,
  defaultValue = "",
  height = "340px",
  placeholder = "Write here…",
}: {
  name: string;
  defaultValue?: string;
  height?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  // Must return synchronously; the upload runs in the background and calls
  // uploadHandler when done. Returning false prevents base64 embedding.
  function onImageUploadBefore(
    files: File[],
    _info: object,
    uploadHandler: UploadHandler
  ) {
    (async () => {
      try {
        const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
        if (!signRes.ok) throw new Error("Could not sign upload");
        const { signature, timestamp, apiKey, cloudName, folder } =
          await signRes.json();

        const file = files[0];
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
        uploadHandler({
          result: [{ url: data.secure_url, name: file.name, size: file.size }],
        });
      } catch (err) {
        uploadHandler(String(err));
      }
    })();
    return false;
  }

  return (
    <div className="rte-editor">
      <input type="hidden" name={name} value={value} />
      <SunEditor
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={setValue}
        onImageUploadBefore={onImageUploadBefore}
        setOptions={{
          height,
          buttonList: [
            ["undo", "redo"],
            ["formatBlock", "fontSize"],
            ["bold", "underline", "italic", "strike"],
            ["fontColor", "hiliteColor"],
            ["align", "list", "horizontalRule"],
            ["table", "link", "image"],
            ["removeFormat", "codeView"],
          ],
          formats: ["p", "blockquote", "h2", "h3", "h4"],
        }}
      />
    </div>
  );
}
