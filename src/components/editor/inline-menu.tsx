"use client";

import type { Editor } from "@tiptap/react";
import { type MouseEvent, useCallback } from "react";
import { isValidHttpUrl } from "@/lib/url";

function InlineButton({
  label,
  icon,
  isActive,
  onClick,
}: Readonly<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}>) {
  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <button
      type="button"
      onMouseDown={handleMouseDown}
      onClick={onClick}
      title={label}
      className={`flex h-7 min-w-7 cursor-pointer items-center justify-center rounded px-1 text-xs font-semibold transition-colors ${
        isActive
          ? "bg-white/20 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
    </button>
  );
}

export function InlineMenu({ editor }: Readonly<{ editor: Editor }>) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-zinc-900 px-1 py-0.5 shadow-xl">
      <InlineButton
        label="Bold"
        icon={<span className="font-black">B</span>}
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <InlineButton
        label="Italic"
        icon={<span className="italic">I</span>}
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <InlineButton
        label="Underline"
        icon={<span className="underline">U</span>}
        isActive={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />
      <InlineButton
        label="Strikethrough"
        icon={<span className="line-through">S</span>}
        isActive={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <InlineButton
        label="Code"
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        }
        isActive={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />
      <InlineButton
        label="Link"
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        }
        isActive={editor.isActive("link")}
        onClick={() => {
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
            return;
          }
          const url = window.prompt("URL:");
          if (url && isValidHttpUrl(url)) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }
        }}
      />
    </div>
  );
}
