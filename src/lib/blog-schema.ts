import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be 200 characters or less"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200, "Slug must be 200 characters or less")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens"),
  content: z.string().min(1, "Content is required").max(500000, "Content is too large"),
  excerpt: z.string().max(500, "Excerpt must be 500 characters or less").optional().default(""),
  published: z.boolean().default(false),
  meta_title: z.string().max(120, "Meta title must be 120 characters or less").optional().default(""),
  meta_description: z.string().max(320, "Meta description must be 320 characters or less").optional().default(""),
  og_image: z.string().url("Must be a valid URL").or(z.literal("")).optional().default(""),
  canonical_url: z.string().url("Must be a valid URL").or(z.literal("")).optional().default(""),
});

export type BlogSchemaInput = z.infer<typeof blogSchema>;
