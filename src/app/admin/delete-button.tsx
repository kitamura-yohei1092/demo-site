"use client";

import { deletePost } from "./actions";

export function DeleteButton({
  postId,
  postTitle,
}: Readonly<{
  postId: number;
  postTitle: string;
}>) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${postTitle}"?`
    );
    if (!confirmed) return;
    await deletePost(postId);
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
