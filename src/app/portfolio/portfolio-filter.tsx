"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/types";

type ProjectListItem = Pick<
  Project,
  "id" | "title" | "slug" | "description" | "category" | "tags" | "results"
>;

const CATEGORY_GRADIENTS: Record<string, string> = {
  Hospitality: "from-blue-600/20 to-cyan-600/20",
  "Food & Beverage": "from-green-600/20 to-emerald-600/20",
  "Health & Fitness": "from-orange-600/20 to-red-600/20",
  "E-commerce": "from-purple-600/20 to-pink-600/20",
  Technology: "from-indigo-600/20 to-violet-600/20",
};

function getGradient(category: string): string {
  return CATEGORY_GRADIENTS[category] ?? "from-slate-600/20 to-zinc-600/20";
}

export function PortfolioFilter({
  projects,
  categories,
}: Readonly<{
  projects: readonly ProjectListItem[];
  categories: readonly string[];
}>) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  return (
    <>
      {/* Category filter */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            activeCategory === null
              ? "bg-primary text-white"
              : "bg-surface text-muted hover:bg-surface/80 hover:text-foreground"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() =>
              setActiveCategory(activeCategory === cat ? null : cat)
            }
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-surface text-muted hover:bg-surface/80 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.slug}`}
            className="group overflow-hidden rounded-2xl border border-border/60 bg-surface/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            {/* Gradient header */}
            <div
              className={`flex h-40 items-center justify-center bg-gradient-to-br ${getGradient(project.category)}`}
            >
              <span className="font-heading text-2xl font-bold text-white/20">
                {project.category}
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-primary-light">
                  {project.category}
                </span>
                {project.results && (
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {project.results}
                  </span>
                )}
              </div>
              <h2 className="mt-3 font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary-light">
                {project.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              {project.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-background px-2 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
