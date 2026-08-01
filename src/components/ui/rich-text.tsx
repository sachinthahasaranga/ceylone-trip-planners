import { cn } from "@/lib/utils";

/**
 * Renders admin-authored HTML (from the SunEditor rich-text fields).
 * Content is written only by authenticated admins, so it is trusted.
 */
export function RichText({
  html,
  className,
}: {
  html?: string | null;
  className?: string;
}) {
  if (!html || !html.trim()) return null;
  return (
    <div
      className={cn("rte-content", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
