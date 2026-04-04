import { sanitizeHtml } from "@/lib/sanitize";
import { extractToc, addHeadingIds } from "@/lib/toc";
import { TableOfContents } from "@/components/table-of-contents";

export function BlogContent({
  content,
}: Readonly<{
  content: string;
}>) {
  const toc = extractToc(content);
  const htmlWithIds = addHeadingIds(content, toc);

  return (
    <>
      <TableOfContents items={toc} />
      <div
        className="tiptap-content text-base leading-relaxed text-foreground/85"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlWithIds) }}
      />
    </>
  );
}
