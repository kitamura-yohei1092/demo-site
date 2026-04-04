"use client";

import { useActionState, useState, useCallback, useRef } from "react";
import type { Project } from "@/lib/types";
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

export function ProjectForm({
  project,
  action,
}: Readonly<{
  project?: Project;
  action: (
    prevState: { error?: string } | undefined,
    formData: FormData,
  ) => Promise<{ error?: string } | undefined>;
}>) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [contentHtml, setContentHtml] = useState(project?.content ?? "");

  const handleHtmlChange = useCallback((html: string) => {
    setContentHtml(html);
  }, []);

  const handleClosePreview = useCallback(() => setShowPreview(false), []);

  const getFormValue = (name: string): string => {
    const form = formRef.current;
    if (!form) return "";
    const el = form.elements.namedItem(name) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    return el?.value ?? "";
  };

  return (
    <>
      <form
        ref={formRef}
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
          <h2 className="mb-5 font-heading text-base font-semibold">
            Project Details
          </h2>
          <div className="space-y-5">
            <Field label="Title">
              <input
                type="text"
                name="title"
                defaultValue={project?.title ?? ""}
                required
                maxLength={200}
                placeholder="Oceanic Resort & Spa"
                className={inputClass}
                onBlur={(e) => {
                  if (project) return;
                  const slugInput = e.currentTarget.form?.elements.namedItem(
                    "slug",
                  ) as HTMLInputElement | null;
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
                defaultValue={project?.slug ?? ""}
                required
                maxLength={200}
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                placeholder="oceanic-resort"
                className={inputClass}
              />
            </Field>

            <Field label="Description" hint="Short summary for cards (max 500)">
              <textarea
                name="description"
                defaultValue={project?.description ?? ""}
                required
                maxLength={500}
                rows={2}
                placeholder="Complete website redesign that boosted online bookings..."
                className={inputClass}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Category">
                <input
                  type="text"
                  name="category"
                  defaultValue={project?.category ?? ""}
                  required
                  maxLength={100}
                  placeholder="Hospitality"
                  className={inputClass}
                />
              </Field>

              <Field label="Results" hint="e.g. +180% Bookings">
                <input
                  type="text"
                  name="results"
                  defaultValue={project?.results ?? ""}
                  maxLength={200}
                  placeholder="+180% Bookings"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Client Name">
                <input
                  type="text"
                  name="client_name"
                  defaultValue={project?.client_name ?? ""}
                  maxLength={200}
                  placeholder="Oceanic Hotels Ltd."
                  className={inputClass}
                />
              </Field>

              <Field label="Project URL">
                <input
                  type="url"
                  name="project_url"
                  defaultValue={project?.project_url ?? ""}
                  placeholder="https://oceanicresort.com"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Tags" hint="Comma-separated">
              <input
                type="text"
                name="tags"
                defaultValue={project?.tags.join(", ") ?? ""}
                placeholder="Web Design, SEO, Hospitality"
                className={inputClass}
              />
            </Field>

            <div>
              <span className="text-sm font-medium text-foreground">
                Content
              </span>
              <div className="mt-1.5" suppressHydrationWarning>
                <TiptapEditor
                  content={project?.content ?? ""}
                  onHtmlChange={handleHtmlChange}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={project?.published ?? false}
                  className="h-4 w-4 cursor-pointer rounded border-border bg-surface accent-primary"
                />
                <span className="text-sm font-medium text-foreground">
                  Published
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={project?.featured ?? false}
                  className="h-4 w-4 cursor-pointer rounded border-border bg-surface accent-primary"
                />
                <span className="text-sm font-medium text-foreground">
                  Featured on homepage
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* SEO fields */}
        <div className="rounded-xl border border-border bg-surface/40 p-6">
          <h2 className="mb-1 font-heading text-base font-semibold">
            SEO & Meta
          </h2>
          <p className="mb-5 text-xs text-muted">
            Leave blank to use defaults from the project title and description.
          </p>
          <div className="space-y-5">
            <Field label="Meta Title" hint="Max 120 chars">
              <input
                type="text"
                name="meta_title"
                defaultValue={project?.meta_title ?? ""}
                maxLength={120}
                placeholder="Custom page title for search engines"
                className={inputClass}
              />
            </Field>

            <Field label="Meta Description" hint="Max 320 chars">
              <textarea
                name="meta_description"
                defaultValue={project?.meta_description ?? ""}
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
                defaultValue={project?.og_image ?? ""}
                placeholder="https://example.com/image.jpg"
                className={inputClass}
              />
            </Field>

            <Field label="Canonical URL">
              <input
                type="url"
                name="canonical_url"
                defaultValue={project?.canonical_url ?? ""}
                placeholder="https://example.com/original"
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
            href="/admin/projects"
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Cancel
          </a>
          <button
            type="submit"
            disabled={isPending}
            className="cursor-pointer rounded-lg bg-gradient-to-r from-primary to-primary-light px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending
              ? "Saving..."
              : project
                ? "Update Project"
                : "Create Project"}
          </button>
        </div>
      </form>

      {showPreview && (
        <PostPreview
          title={getFormValue("title")}
          excerpt={getFormValue("description")}
          content={contentHtml}
          onClose={handleClosePreview}
        />
      )}
    </>
  );
}
