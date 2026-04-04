import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { safeJsonLd } from "@/lib/json-ld";
import { sanitizeHtml } from "@/lib/sanitize";
import { Breadcrumb } from "@/components/breadcrumb";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select(
      "title, description, meta_title, meta_description, og_image, canonical_url",
    )
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = project.meta_title || project.title;
  const description = project.meta_description || project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/portfolio/${slug}`,
      ...(project.og_image ? { images: [{ url: project.og_image }] } : {}),
    },
    alternates: {
      canonical: project.canonical_url || `/portfolio/${slug}`,
    },
  };
}

function CreativeWorkJsonLd(project: Project) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.meta_title || project.title,
    description: project.meta_description || project.description,
    url: `${SITE_URL}/portfolio/${project.slug}`,
    dateCreated: project.created_at,
    dateModified: project.updated_at,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    ...(project.tags.length > 0 ? { keywords: project.tags.join(", ") } : {}),
    ...(project.og_image
      ? { image: { "@type": "ImageObject", url: project.og_image } }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
    />
  );
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .returns<Project[]>()
    .single();

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      {CreativeWorkJsonLd(project)}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: project.title },
        ]}
      />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <article>
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-wider text-primary-light">
                {project.category}
              </span>
              {project.results && (
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {project.results}
                </span>
              )}
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {project.description}
            </p>
            {(project.client_name || project.project_url) && (
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted">
                {project.client_name && (
                  <div>
                    <span className="font-medium text-foreground">Client:</span>{" "}
                    {project.client_name}
                  </div>
                )}
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary-light transition-colors hover:text-primary"
                  >
                    Visit Live Site &rarr;
                  </a>
                )}
              </div>
            )}
            {project.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="prose-custom mt-12">
            <div
              className="tiptap-content text-base leading-relaxed text-foreground/85"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(project.content),
              }}
            />
          </div>
        </article>

        <div className="mt-16 border-t border-border/50 pt-8 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-sm font-medium text-primary-light transition-colors hover:text-primary"
          >
            <svg
              className="mr-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all projects
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
