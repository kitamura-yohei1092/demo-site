"use client";

import { deleteProject } from "../project-actions";

export function ProjectDeleteButton({
  projectId,
  projectTitle,
}: Readonly<{
  projectId: number;
  projectTitle: string;
}>) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${projectTitle}"?`,
    );
    if (!confirmed) return;
    await deleteProject(projectId);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
    >
      Delete
    </button>
  );
}
