import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";
import { SITE_NAME } from "@/lib/site-config";

export const alt = "Portfolio project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select("title, description, category, results")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  const title = project?.title ?? "Project";
  const description = project?.description ?? "";
  const category = project?.category ?? "";
  const results = project?.results ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #050508 0%, #0f0f14 50%, #050508 100%)",
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
            background: "rgba(249, 115, 22, 0.12)",
            filter: "blur(80px)",
          }}
        />

        {/* Top: Category + Results */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
                background: "linear-gradient(to right, #f97316, #6366f1)",
                borderRadius: "2px",
                display: "flex",
              }}
            />
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#f97316",
                letterSpacing: "3px",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              {category}
            </div>
          </div>
          {results ? (
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#f97316",
                display: "flex",
              }}
            >
              {results}
            </div>
          ) : null}
        </div>

        {/* Middle: Title + description */}
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
          {description ? (
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
              {description.length > 120
                ? `${description.slice(0, 120)}...`
                : description}
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
