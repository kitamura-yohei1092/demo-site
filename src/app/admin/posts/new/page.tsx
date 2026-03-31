import { createPost } from "../../actions";
import { PostForm } from "../../post-form";

export default function NewPostPage() {
  async function handleCreate(_prevState: { error?: string } | undefined, formData: FormData) {
    "use server";
    return createPost(formData);
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
          New Post
        </h1>
      </div>
      <PostForm action={handleCreate} />
    </div>
  );
}
