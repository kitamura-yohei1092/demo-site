"use client";

import { useActionState, useState, useCallback } from "react";
import type { Blog } from "@/lib/types";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import { PostPreview } from "./post-preview";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Field({
  label,
  hint,
  children,
}: Readonly<{
  label: string;
  hint?: string;
  children: React.ReactNode;
}>) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {hint && <span className="ml-2 text-xs text-muted">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30";

export function PostForm({
  post,
  action,
}: Readonly<{
  post?: Blog;
  action: (prevState: { error?: string } | undefined, formData: FormData) => Promise<{ error?: string } | undefined>;
}>) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const [showPreview, setShowPreview] = useState(false);
  const [contentHtml, setContentHtml] = useState(post?.content ?? "");

  const handleHtmlChange = useCallback((html: string) => {
    setContentHtml(html);
  }, []);

  const getFormValue = (name: string): string => {
    const form = document.querySelector("form");
    if (!form) return "";
    const el = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
    return el?.value ?? "";
  };

  return (
    <>
      <form
      action={(formData) => {
        formData.set("content", contentHtml);
        return formAction(formData);
      }}
      className="space-y-8"
    >
        {state?.error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {state.error}
          </div>
        )}

        {/* Main fields */}
        <div className="rounded-xl border border-border bg-surface/40 p-6">
          <h2 className="mb-5 font-heading text-base font-semibold">Content</h2>
          <div className="space-y-5">
            <Field label="Title">
              <input
                type="text"
                name="title"
                defaultValue={post?.title ?? ""}
                required
                maxLength={200}
                placeholder="My Awesome Post"
                className={inputClass}
                onBlur={(e) => {
                  if (post) return;
                  const slugInput = e.currentTarget.form?.elements.namedItem("slug") as HTMLInputElement | null;
                  if (slugInput && !slugInput.value) {
                    slugInput.value = slugify(e.currentTarget.value);
                  }
                }}
              />
            </Field>

            <Field label="Slug" hint="URL path (auto-generated from title)">
              <input
                type="text"
                name="slug"
                defaultValue={post?.slug ?? ""}
                required
                maxLength={200}
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                placeholder="my-awesome-post"
                className={inputClass}
              />
            </Field>

            <Field label="Excerpt" hint="Short summary for list pages (max 500)">
              <textarea
                name="excerpt"
                defaultValue={post?.excerpt ?? ""}
                maxLength={500}
                rows={2}
                placeholder="A brief description of this post..."
                className={inputClass}
              />
            </Field>

            <Field label="Content">
              <TiptapEditor
                content={post?.content ?? ""}
                onHtmlChange={handleHtmlChange}
              />
            </Field>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                defaultChecked={post?.published ?? false}
                className="h-4 w-4 cursor-pointer rounded border-border bg-surface accent-primary"
              />
              <span className="text-sm font-medium text-foreground">
                Publish this post
              </span>
            </label>
          </div>
        </div>

        {/* SEO fields */}
        <div className="rounded-xl border border-border bg-surface/40 p-6">
          <h2 className="mb-1 font-heading text-base font-semibold">
            SEO & Meta
          </h2>
          <p className="mb-5 text-xs text-muted">
            Leave blank to use defaults from the post title and excerpt.
          </p>
          <div className="space-y-5">
            <Field label="Meta Title" hint="Max 120 chars">
              <input
                type="text"
                name="meta_title"
                defaultValue={post?.meta_title ?? ""}
                maxLength={120}
                placeholder="Custom page title for search engines"
                className={inputClass}
              />
            </Field>

            <Field label="Meta Description" hint="Max 320 chars">
              <textarea
                name="meta_description"
                defaultValue={post?.meta_description ?? ""}
                maxLength={320}
                rows={2}
                placeholder="Custom description for search engine snippets"
                className={inputClass}
              />
            </Field>

            <Field label="OG Image URL">
              <input
                type="url"
                name="og_image"
                defaultValue={post?.og_image ?? ""}
                placeholder="https://example.com/image.jpg"
                className={inputClass}
              />
            </Field>

            <Field label="Canonical URL">
              <input
                type="url"
                name="canonical_url"
                defaultValue={post?.canonical_url ?? ""}
                placeholder="https://example.com/original-post"
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="cursor-pointer rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-primary/50 hover:text-foreground"
          >
            Preview
          </button>
          <a
            href="/admin"
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Cancel
          </a>
          <button
            type="submit"
            disabled={isPending}
            className="cursor-pointer rounded-lg bg-gradient-to-r from-primary to-primary-light px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Saving..." : post ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>

      {showPreview && (
        <PostPreview
          title={getFormValue("title")}
          excerpt={getFormValue("excerpt")}
          content={contentHtml}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
