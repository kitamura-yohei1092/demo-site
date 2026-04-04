"use client";

import type { Editor } from "@tiptap/react";
import { type MouseEvent, useCallback } from "react";
import { isValidHttpUrl } from "@/lib/url";
import type { CalloutType } from "./extensions/callout";

function ToolbarButton({
  icon,
  label,
  isActive,
  disabled,
  onClick,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  disabled?: boolean;
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
      disabled={disabled}
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-md px-1.5 text-xs font-semibold transition-colors ${
        isActive
          ? "bg-primary/20 text-primary-light"
          : "text-muted hover:bg-surface-light hover:text-foreground"
      } disabled:cursor-not-allowed disabled:opacity-30`}
    >
      {icon}
    </button>
  );
}

function Separator() {
  return <div className="mx-0.5 h-5 w-px bg-border/60" />;
}

const CALLOUT_TYPES: { type: CalloutType; label: string; icon: string }[] = [
  { type: "info", label: "Info", icon: "i" },
  { type: "tip", label: "Tip", icon: "T" },
  { type: "warning", label: "Warning", icon: "!" },
];

function CalloutDropdown({ editor }: Readonly<{ editor: Editor }>) {
  return (
    <div className="group relative">
      <ToolbarButton
        label="Callout"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        }
        isActive={editor.isActive("callout")}
        onClick={() => editor.chain().focus().toggleCallout({ type: "info" }).run()}
      />
      <div className="absolute left-0 top-full z-10 hidden min-w-[100px] rounded-md border border-border bg-surface p-1 shadow-xl group-hover:block">
        {CALLOUT_TYPES.map((ct) => (
          <button
            key={ct.type}
            type="button"
            className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-xs transition-colors ${
              editor.isActive("callout", { type: ct.type })
                ? "bg-primary/20 text-primary-light"
                : "text-muted hover:bg-surface-light hover:text-foreground"
            }`}
            onClick={() =>
              editor.chain().focus().toggleCallout({ type: ct.type }).run()
            }
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-surface-light text-[10px] font-bold">
              {ct.icon}
            </span>
            {ct.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Toolbar({ editor }: Readonly<{ editor: Editor }>) {
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-surface/60 px-2 py-1.5">
      {/* Headings */}
      <ToolbarButton
        label="Heading 2"
        icon="H2"
        isActive={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <ToolbarButton
        label="Heading 3"
        icon="H3"
        isActive={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      />

      <Separator />

      {/* Inline formatting */}
      <ToolbarButton
        label="Bold (Ctrl+B)"
        icon={<span className="font-black">B</span>}
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        label="Italic (Ctrl+I)"
        icon={<span className="italic">I</span>}
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        label="Underline (Ctrl+U)"
        icon={<span className="underline">U</span>}
        isActive={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />
      <ToolbarButton
        label="Strikethrough"
        icon={<span className="line-through">S</span>}
        isActive={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />

      <Separator />

      {/* Lists */}
      <ToolbarButton
        label="Bullet List"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <circle cx="3.5" cy="6" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="3.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="3.5" cy="18" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        }
        isActive={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        label="Ordered List"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="10" y1="6" x2="21" y2="6" />
            <line x1="10" y1="12" x2="21" y2="12" />
            <line x1="10" y1="18" x2="21" y2="18" />
            <text x="1" y="8" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif">1</text>
            <text x="1" y="14" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif">2</text>
            <text x="1" y="20" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif">3</text>
          </svg>
        }
        isActive={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />

      <Separator />

      {/* Block formatting */}
      <ToolbarButton
        label="Blockquote"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        }
        isActive={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <ToolbarButton
        label="Code Block"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        }
        isActive={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />
      <ToolbarButton
        label="Inline Code"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="14" y1="4" x2="10" y2="20" />
          </svg>
        }
        isActive={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />

      <Separator />

      {/* Extras */}
      <ToolbarButton
        label="Horizontal Rule"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="12" x2="22" y2="12" />
          </svg>
        }
        isActive={false}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />
      <ToolbarButton
        label="Image"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        }
        isActive={false}
        onClick={() => {
          const url = window.prompt("Image URL:");
          if (url && isValidHttpUrl(url)) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      />
      <ToolbarButton
        label="Link"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

      <Separator />

      {/* Custom blocks */}
      <CalloutDropdown editor={editor} />
      <ToolbarButton
        label="Pull Quote"
        icon={<span className="text-[10px]">PQ</span>}
        isActive={editor.isActive("pullQuote")}
        onClick={() => editor.chain().focus().togglePullQuote().run()}
      />
      <ToolbarButton
        label="Key Takeaway"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        }
        isActive={editor.isActive("keyTakeaway")}
        onClick={() => editor.chain().focus().toggleKeyTakeaway().run()}
      />
      <ToolbarButton
        label="Stat Highlight"
        icon={<span className="text-[10px]">#</span>}
        isActive={editor.isActive("statHighlight")}
        onClick={() => {
          const value = window.prompt("Stat value (e.g. 85%):");
          if (value) {
            editor.chain().focus().setStatHighlight({ value }).run();
          }
        }}
      />
      <ToolbarButton
        label="Inline CTA"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="8" rx="2" />
            <path d="M12 8v8" />
          </svg>
        }
        isActive={editor.isActive("inlineCta")}
        onClick={() => {
          const href = window.prompt("CTA link URL:");
          if (href && isValidHttpUrl(href)) {
            editor.chain().focus().setInlineCta({ href }).run();
          }
        }}
      />
    </div>
  );
}
