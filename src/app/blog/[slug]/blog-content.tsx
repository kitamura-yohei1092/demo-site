import { sanitizeHtml } from "@/lib/sanitize";

export function BlogContent({
  content,
}: Readonly<{
  content: string;
}>) {
  return (
    <div
      className="tiptap-content text-base leading-relaxed text-foreground/85"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
    />
  );
}
