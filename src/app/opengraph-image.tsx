import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050508 0%, #0f0f14 50%, #050508 100%)",
          padding: "60px",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "200px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.15)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            right: "200px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(249, 115, 22, 0.1)",
            filter: "blur(60px)",
          }}
        />

        {/* Site name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#e4e4e7",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            textAlign: "center",
            display: "flex",
          }}
        >
          {SITE_NAME}
        </div>

        {/* Gradient divider */}
        <div
          style={{
            width: "120px",
            height: "4px",
            marginTop: "24px",
            marginBottom: "24px",
            display: "flex",
            background: "linear-gradient(to right, #6366f1, #f97316)",
            borderRadius: "2px",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#71717a",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          {SITE_DESCRIPTION}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: 20,
            color: "#818cf8",
            display: "flex",
          }}
        >
          ymtechservices.com
        </div>
      </div>
    ),
    { ...size },
  );
}
