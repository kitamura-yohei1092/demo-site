"use client";

import { useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";

export function PostPreview({
  title,
  excerpt,
  content,
  onClose,
}: Readonly<{
  title: string;
  excerpt: string;
  content: string;
  onClose: () => void;
}>) {
  const clean = DOMPurify.sanitize(content, {
    ADD_ATTR: ["target", "rel"],
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/95 backdrop-blur-sm">
      {/* Close bar */}
      <div className="fixed top-0 right-0 left-0 z-10 flex items-center justify-between border-b border-border/60 bg-surface/80 px-6 py-3 backdrop-blur-md">
        <span className="text-sm font-medium text-muted">Preview</span>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg border border-border px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-primary/50 hover:text-foreground"
        >
          Close
        </button>
      </div>

      {/* Blog post layout - matches /blog/[slug] */}
      <main className="mx-auto max-w-3xl px-6 pt-20 pb-24">
        <article>
          <header className="mb-12 text-center">
            <time className="text-sm font-medium text-muted">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {title || "Untitled Post"}
            </h1>
            {excerpt && (
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {excerpt}
              </p>
            )}
          </header>

          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="prose-custom mt-12">
            <div
              className="tiptap-content text-base leading-relaxed text-foreground/85"
              dangerouslySetInnerHTML={{ __html: clean }}
            />
          </div>
        </article>
      </main>
    </div>
  );
}
