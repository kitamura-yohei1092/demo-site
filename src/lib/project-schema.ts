import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be 200 characters or less"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200, "Slug must be 200 characters or less")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().min(1, "Description is required").max(500, "Description must be 500 characters or less"),
  content: z.string().min(1, "Content is required").max(500000, "Content is too large"),
  client_name: z.string().max(200, "Client name must be 200 characters or less").optional().default(""),
  category: z.string().min(1, "Category is required").max(100, "Category must be 100 characters or less"),
  tags: z.array(z.string().max(50)).max(20, "Maximum 20 tags").default([]),
  results: z.string().max(200, "Results must be 200 characters or less").optional().default(""),
  project_url: z.string().url("Must be a valid URL").or(z.literal("")).optional().default(""),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  meta_title: z.string().max(120, "Meta title must be 120 characters or less").optional().default(""),
  meta_description: z.string().max(320, "Meta description must be 320 characters or less").optional().default(""),
  og_image: z.string().url("Must be a valid URL").or(z.literal("")).optional().default(""),
  canonical_url: z.string().url("Must be a valid URL").or(z.literal("")).optional().default(""),
});

export type ProjectSchemaInput = z.infer<typeof projectSchema>;
