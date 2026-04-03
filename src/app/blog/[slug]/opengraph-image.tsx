import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";
import { SITE_NAME } from "@/lib/site-config";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("blogs")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  const title = post?.title ?? "Blog Post";
  const excerpt = post?.excerpt ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #050508 0%, #0f0f14 50%, #050508 100%)",
          padding: "60px",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "100px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.12)",
            filter: "blur(80px)",
          }}
        />

        {/* Top: Blog label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              background: "linear-gradient(to right, #6366f1, #f97316)",
              borderRadius: "2px",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#818cf8",
              letterSpacing: "3px",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Blog
          </div>
        </div>

        {/* Middle: Title + excerpt */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 40 : 52,
              fontWeight: 800,
              color: "#e4e4e7",
              lineHeight: 1.2,
              letterSpacing: "-1px",
              display: "flex",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          {excerpt ? (
            <div
              style={{
                fontSize: 22,
                color: "#71717a",
                marginTop: "20px",
                lineHeight: 1.5,
                display: "flex",
                maxWidth: "800px",
              }}
            >
              {excerpt.length > 120
                ? `${excerpt.slice(0, 120)}...`
                : excerpt}
            </div>
          ) : null}
        </div>

        {/* Bottom: Site name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#e4e4e7",
              display: "flex",
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#818cf8",
              display: "flex",
            }}
          >
            ymtechservices.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
