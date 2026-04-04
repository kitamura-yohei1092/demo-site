import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postsResult, projectsResult] = await Promise.all([
    supabase
      .from("blogs")
      .select("slug, updated_at")
      .eq("published", true)
      .order("updated_at", { ascending: false }),
    supabase
      .from("projects")
      .select("slug, updated_at")
      .eq("published", true)
      .order("updated_at", { ascending: false }),
  ]);

  if (postsResult.error) {
    console.error("Sitemap: failed to fetch blog posts:", postsResult.error.message);
  }
  if (projectsResult.error) {
    console.error("Sitemap: failed to fetch projects:", projectsResult.error.message);
  }

  const posts = postsResult.data;
  const projects = projectsResult.data;

  const blogEntries: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const portfolioEntries: MetadataRoute.Sitemap = (projects ?? []).map(
    (project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: posts?.[0] ? new Date(posts[0].updated_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: projects?.[0]
        ? new Date(projects[0].updated_at)
        : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...portfolioEntries,
  ];
}
