import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Blog } from "@/lib/types";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogContent } from "./blog-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("blogs")
    .select("title, excerpt, meta_title, meta_description, og_image, canonical_url")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || "";

  return {
    title: `${title} | YM Tech Blog`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(post.og_image ? { images: [{ url: post.og_image }] } : {}),
    },
    ...(post.canonical_url
      ? { alternates: { canonical: post.canonical_url } }
      : {}),
  };
}

function BlogPostingJsonLd(post: Blog) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || "",
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Organization",
      name: "YM Tech Services",
    },
    publisher: {
      "@type": "Organization",
      name: "YM Tech Services",
    },
    ...(post.og_image
      ? {
          image: {
            "@type": "ImageObject",
            url: post.og_image,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .returns<Blog[]>()
    .single();

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      {BlogPostingJsonLd(post)}
      <main className="mx-auto max-w-3xl px-6 py-24">
        <article>
          <header className="mb-12 text-center">
            <time className="text-sm font-medium text-muted">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {post.excerpt}
              </p>
            )}
          </header>

          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="prose-custom mt-12">
            <BlogContent content={post.content} />
          </div>
        </article>

        <div className="mt-16 border-t border-border/50 pt-8 text-center">
          <a
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-primary-light transition-colors hover:text-primary"
          >
            <svg
              className="mr-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all posts
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
