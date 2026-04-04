import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Project } from "@/lib/types";
import { updateProject } from "../../../project-actions";
import { ProjectForm } from "../../../project-form";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = parseInt(id, 10);

  if (isNaN(projectId)) {
    notFound();
  }

  const { data: project } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .returns<Project[]>()
    .single();

  if (!project) {
    notFound();
  }

  async function handleUpdate(
    _prevState: { error?: string } | undefined,
    formData: FormData,
  ) {
    "use server";
    return updateProject(projectId, formData);
  }

  return (
    <div>
      <div className="mb-8">
        <a
          href="/admin/projects"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; Back to Projects
        </a>
        <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight">
          Edit Project
        </h1>
        <p className="mt-1 text-sm text-muted">
          Editing &ldquo;{project.title}&rdquo;
        </p>
      </div>
      <ProjectForm project={project} action={handleUpdate} />
    </div>
  );
}
