import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Blog } from "@/lib/types";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Blog | YM Tech Services",
  description:
    "Insights on web design, SEO optimization, and growing your online presence. Tips and strategies from the YM Tech team.",
  openGraph: {
    title: "Blog | YM Tech Services",
    description:
      "Insights on web design, SEO optimization, and growing your online presence.",
    type: "website",
  },
};

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .returns<Pick<Blog, "id" | "title" | "slug" | "excerpt" | "created_at">[]>();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-24">
        <div className="text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary-light">
            Blog
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Insights &amp; Ideas
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Tips on web design, SEO, and growing your online presence.
          </p>
        </div>

        {(!posts || posts.length === 0) ? (
          <p className="mt-16 text-center text-muted">
            No posts yet. Check back soon!
          </p>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/50 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-surface/80 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <time className="text-xs font-medium text-muted">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 font-heading text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary-light">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-light opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Read more
                    <svg
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
