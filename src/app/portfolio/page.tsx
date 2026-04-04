import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { safeJsonLd } from "@/lib/json-ld";
import { Breadcrumb } from "@/components/breadcrumb";
import { PortfolioFilter } from "./portfolio-filter";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our web design and development portfolio. Real projects with real results — from SEO-optimized websites to custom e-commerce platforms.",
  openGraph: {
    title: `Portfolio | ${SITE_NAME}`,
    description:
      "Explore our web design and development portfolio. Real projects with real results.",
    type: "website",
    url: `${SITE_URL}/portfolio`,
  },
  alternates: {
    canonical: "/portfolio",
  },
};

type ProjectListItem = Pick<
  Project,
  "id" | "title" | "slug" | "description" | "category" | "tags" | "results"
>;

function PortfolioListJsonLd(projects: ProjectListItem[] | null) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Portfolio | ${SITE_NAME}`,
    description:
      "Explore our web design and development portfolio. Real projects with real results.",
    url: `${SITE_URL}/portfolio`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    ...(projects && projects.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${SITE_URL}/portfolio/${project.slug}`,
              name: project.title,
            })),
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
    />
  );
}

export default async function PortfolioPage() {
  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, slug, description, category, tags, results")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .returns<ProjectListItem[]>();

  const categories = projects
    ? [...new Set(projects.map((p) => p.category))].sort()
    : [];

  return (
    <>
      {PortfolioListJsonLd(projects)}
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Portfolio" },
        ]}
      />
      <main className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Portfolio
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Our <span className="text-primary-light">Work</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Real projects, real outcomes. Explore what we&apos;ve built for our
            clients.
          </p>
        </div>

        {!projects || projects.length === 0 ? (
          <p className="mt-16 text-center text-muted">
            No projects yet. Check back soon!
          </p>
        ) : (
          <PortfolioFilter projects={projects} categories={categories} />
        )}
      </main>
      <Footer />
    </>
  );
}
