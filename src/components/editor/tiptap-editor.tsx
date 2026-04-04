"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { Toolbar } from "./toolbar";
import { InlineMenu } from "./inline-menu";
import {
  Callout,
  PullQuote,
  StatHighlight,
  KeyTakeaway,
  InlineCta,
} from "./extensions";

export function TiptapEditor({
  content,
  onHtmlChange,
}: Readonly<{
  content: string;
  onHtmlChange?: (html: string) => void;
}>) {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({
        placeholder: "Write your post content here...",
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg border border-border my-4 max-w-full",
        },
      }),
      Callout,
      PullQuote,
      StatHighlight,
      KeyTakeaway,
      InlineCta,
    ],
    content,
    onUpdate: ({ editor: e }) => {
      onHtmlChange?.(e.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap-content min-h-[400px] px-5 py-4 text-sm leading-relaxed text-foreground outline-none",
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
      <BubbleMenu editor={editor}>
        <InlineMenu editor={editor} />
      </BubbleMenu>
      <EditorContent editor={editor} />
    </div>
  );
}
