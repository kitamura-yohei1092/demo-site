import { createProject } from "../../project-actions";
import { ProjectForm } from "../../project-form";

export default function NewProjectPage() {
  async function handleCreate(
    _prevState: { error?: string } | undefined,
    formData: FormData,
  ) {
    "use server";
    return createProject(formData);
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
          New Project
        </h1>
      </div>
      <ProjectForm action={handleCreate} />
    </div>
  );
}
