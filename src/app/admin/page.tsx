import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Blog } from "@/lib/types";
import { DeleteButton } from "./delete-button";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { data: posts, error } = await supabaseAdmin
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Blog[]>();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Posts
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage your blog posts
          </p>
        </div>
        <a
          href="/admin/posts/new"
          className="rounded-lg bg-gradient-to-r from-primary to-primary-light px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/40"
        >
          New Post
        </a>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Failed to load posts. Please check your database connection.
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
            {(!posts || posts.length === 0) && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-12 text-center text-sm text-muted"
                >
                  No posts yet. Create your first post to get started.
                </td>
              </tr>
            )}
            {posts?.map((post) => (
              <tr
                key={post.id}
                className="transition-colors hover:bg-surface/40"
              >
                <td className="px-5 py-4">
                  <a
                    href={`/admin/posts/${post.id}/edit`}
                    className="font-medium text-foreground transition-colors hover:text-primary-light"
                  >
                    {post.title}
                  </a>
                  <p className="mt-0.5 text-xs text-muted">/{post.slug}</p>
                </td>
                <td className="px-5 py-4">
                  {post.published ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-sm text-muted">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={`/admin/posts/${post.id}/edit`}
                      className="rounded-md px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-light hover:text-foreground"
                    >
                      Edit
                    </a>
                    <DeleteButton postId={post.id} postTitle={post.title} />
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
