"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { projectSchema } from "@/lib/project-schema";
import { sanitizeHtml } from "@/lib/sanitize";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseTags(raw: FormDataEntryValue | null): string[] {
  if (!raw || typeof raw !== "string" || raw.trim() === "") return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function createProject(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const input = {
    ...raw,
    tags: parseTags(raw.tags ?? null),
    featured: raw.featured === "on",
    published: raw.published === "on",
  };

  const result = projectSchema.safeParse(input);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const data = result.data;

  const { data: existing } = await supabaseAdmin
    .from("projects")
    .select("id")
    .eq("slug", data.slug)
    .maybeSingle();

  if (existing) {
    return { error: "This slug is already in use." };
  }

  const insertData = {
    title: data.title,
    slug: data.slug,
    description: data.description,
    content: sanitizeHtml(data.content),
    client_name: data.client_name || null,
    category: data.category,
    tags: data.tags,
    results: data.results || null,
    project_url: data.project_url || null,
    featured: data.featured,
    published: data.published,
    meta_title: data.meta_title || null,
    meta_description: data.meta_description || null,
    og_image: data.og_image || null,
    canonical_url: data.canonical_url || null,
  };

  const { error } = await supabaseAdmin.from("projects").insert(insertData);

  if (error) {
    return { error: "Failed to create project. Please try again." };
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: number, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const input = {
    ...raw,
    tags: parseTags(raw.tags ?? null),
    featured: raw.featured === "on",
    published: raw.published === "on",
  };

  const result = projectSchema.safeParse(input);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const data = result.data;

  const { data: existing } = await supabaseAdmin
    .from("projects")
    .select("id")
    .eq("slug", data.slug)
    .neq("id", id)
    .maybeSingle();

  if (existing) {
    return { error: "This slug is already in use." };
  }

  const updateData = {
    title: data.title,
    slug: data.slug,
    description: data.description,
    content: sanitizeHtml(data.content),
    client_name: data.client_name || null,
    category: data.category,
    tags: data.tags,
    results: data.results || null,
    project_url: data.project_url || null,
    featured: data.featured,
    published: data.published,
    meta_title: data.meta_title || null,
    meta_description: data.meta_description || null,
    og_image: data.og_image || null,
    canonical_url: data.canonical_url || null,
  };

  const { error } = await supabaseAdmin
    .from("projects")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { error: "Failed to update project. Please try again." };
  }

  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${data.slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: number) {
  const { error } = await supabaseAdmin
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: "Failed to delete project. Please try again." };
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}
