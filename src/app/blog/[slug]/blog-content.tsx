import DOMPurify from "isomorphic-dompurify";

export function BlogContent({
  content,
}: Readonly<{
  content: string;
}>) {
  const clean = DOMPurify.sanitize(content, {
    ADD_ATTR: ["target", "rel"],
  });

  return (
    <div
      className="tiptap-content text-base leading-relaxed text-foreground/85"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
