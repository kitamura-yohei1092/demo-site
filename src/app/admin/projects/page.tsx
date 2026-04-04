import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Project } from "@/lib/types";
import { ProjectDeleteButton } from "./delete-button";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const { data: projects, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Project[]>();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Projects
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage your portfolio projects
          </p>
        </div>
        <a
          href="/admin/projects/new"
          className="rounded-lg bg-gradient-to-r from-primary to-primary-light px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/40"
        >
          New Project
        </a>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Failed to load projects. Please check your database connection.
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface/60">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                Title
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                Category
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                Date
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {(!projects || projects.length === 0) && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-sm text-muted"
                >
                  No projects yet. Create your first project to get started.
                </td>
              </tr>
            )}
            {projects?.map((project) => (
              <tr
                key={project.id}
                className="transition-colors hover:bg-surface/40"
              >
                <td className="px-5 py-4">
                  <a
                    href={`/admin/projects/${project.id}/edit`}
                    className="font-medium text-foreground transition-colors hover:text-primary-light"
                  >
                    {project.title}
                  </a>
                  <p className="mt-0.5 text-xs text-muted">/{project.slug}</p>
                </td>
                <td className="px-5 py-4 text-sm text-muted">
                  {project.category}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {project.published ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                        Draft
                      </span>
                    )}
                    {project.featured && (
                      <span className="inline-flex items-center rounded-full bg-purple-500/15 px-2.5 py-0.5 text-xs font-medium text-purple-400">
                        Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-muted">
                  {new Date(project.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={`/admin/projects/${project.id}/edit`}
                      className="rounded-md px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-light hover:text-foreground"
                    >
                      Edit
                    </a>
                    <ProjectDeleteButton
                      projectId={project.id}
                      projectTitle={project.title}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
