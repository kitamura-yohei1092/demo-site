"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { blogSchema } from "@/lib/blog-schema";
import { sanitizeHtml } from "@/lib/sanitize";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const input = {
    ...raw,
    published: raw.published === "on",
  };

  const result = blogSchema.safeParse(input);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const data = result.data;

  // Check slug uniqueness
  const { data: existing } = await supabaseAdmin
    .from("blogs")
    .select("id")
    .eq("slug", data.slug)
    .maybeSingle();

  if (existing) {
    return { error: "This slug is already in use." };
  }

  const insertData = {
    title: data.title,
    slug: data.slug,
    content: sanitizeHtml(data.content),
    excerpt: data.excerpt || null,
    published: data.published,
    meta_title: data.meta_title || null,
    meta_description: data.meta_description || null,
    og_image: data.og_image || null,
    canonical_url: data.canonical_url || null,
  };

  const { error } = await supabaseAdmin.from("blogs").insert(insertData);

  if (error) {
    return { error: "Failed to create post. Please try again." };
  }

  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePost(id: number, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const input = {
    ...raw,
    published: raw.published === "on",
  };

  const result = blogSchema.safeParse(input);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const data = result.data;

  // Check slug uniqueness (exclude current post)
  const { data: existing } = await supabaseAdmin
    .from("blogs")
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
    content: sanitizeHtml(data.content),
    excerpt: data.excerpt || null,
    published: data.published,
    meta_title: data.meta_title || null,
    meta_description: data.meta_description || null,
    og_image: data.og_image || null,
    canonical_url: data.canonical_url || null,
  };

  const { error } = await supabaseAdmin
    .from("blogs")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { error: "Failed to update post. Please try again." };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePost(id: number) {
  const { error } = await supabaseAdmin.from("blogs").delete().eq("id", id);

  if (error) {
    return { error: "Failed to delete post. Please try again." };
  }

  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect("/admin");
}
