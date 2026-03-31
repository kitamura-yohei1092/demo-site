import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Blog } from "@/lib/types";
import { updatePost } from "../../../actions";
import { PostForm } from "../../../post-form";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    notFound();
  }

  const { data: post } = await supabaseAdmin
    .from("blogs")
    .select("*")
    .eq("id", postId)
    .returns<Blog[]>()
    .single();

  if (!post) {
    notFound();
  }

  async function handleUpdate(_prevState: { error?: string } | undefined, formData: FormData) {
    "use server";
    return updatePost(postId, formData);
  }

  return (
    <div>
      <div className="mb-8">
        <a
          href="/admin"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; Back to Posts
        </a>
        <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight">
          Edit Post
        </h1>
        <p className="mt-1 text-sm text-muted">
          Editing &ldquo;{post.title}&rdquo;
        </p>
      </div>
      <PostForm post={post} action={handleUpdate} />
    </div>
  );
}
