"use client";

import type { Editor } from "@tiptap/react";

type ToolbarItem =
  | { type: "button"; label: string; icon: string; action: () => void; isActive: boolean }
  | { type: "separator" };

function ToolbarButton({
  icon,
  label,
  isActive,
  onClick,
}: Readonly<{
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}>) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={label}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-sm transition-colors ${
        isActive
          ? "bg-primary/20 text-primary-light"
          : "text-muted hover:bg-surface-light hover:text-foreground"
      }`}
    >
      {icon}
    </button>
  );
}

function Separator() {
  return <div className="mx-1 h-5 w-px bg-border" />;
}

export function Toolbar({ editor }: Readonly<{ editor: Editor }>) {
  const items: ToolbarItem[] = [
    {
      type: "button",
      label: "Heading 2",
      icon: "H2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      type: "button",
      label: "Heading 3",
      icon: "H3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    { type: "separator" },
    {
      type: "button",
      label: "Bold",
      icon: "B",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      type: "button",
      label: "Italic",
      icon: "I",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      type: "button",
      label: "Underline",
      icon: "U",
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
    },
    {
      type: "button",
      label: "Strikethrough",
      icon: "S",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    { type: "separator" },
    {
      type: "button",
      label: "Bullet List",
      icon: "UL",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      type: "button",
      label: "Ordered List",
      icon: "OL",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    { type: "separator" },
    {
      type: "button",
      label: "Blockquote",
      icon: "\u201C",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      type: "button",
      label: "Code Block",
      icon: "</>",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
    },
    {
      type: "button",
      label: "Inline Code",
      icon: "`",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
    },
    { type: "separator" },
    {
      type: "button",
      label: "Horizontal Rule",
      icon: "\u2014",
      action: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: false,
    },
    {
      type: "button",
      label: "Link",
      icon: "\uD83D\uDD17",
      action: () => {
        if (editor.isActive("link")) {
          editor.chain().focus().unsetLink().run();
          return;
        }
        const url = window.prompt("URL:");
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      },
      isActive: editor.isActive("link"),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-surface/60 px-2 py-1.5">
      {items.map((item, i) =>
        item.type === "separator" ? (
          <Separator key={`sep-${i}`} />
        ) : (
          <ToolbarButton
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={item.isActive}
            onClick={item.action}
          />
        ),
      )}
    </div>
  );
}
