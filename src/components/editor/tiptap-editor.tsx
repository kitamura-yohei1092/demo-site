"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { Toolbar } from "./toolbar";

export function TiptapEditor({
  content,
  onChange,
}: Readonly<{
  content: string;
  onChange: (html: string) => void;
}>) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({
        placeholder: "Write your post content here...",
      }),
      Underline,
    ],
    content,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
    editorProps: {
      attributes: {
        class: "tiptap-content min-h-[400px] px-5 py-4 text-sm leading-relaxed text-foreground outline-none",
      },
    },
  });

  if (!editor) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-border bg-surface text-sm text-muted">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface transition-colors focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/30">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
