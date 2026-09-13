import { ImageResponse } from "next/og";
import { getPersonalInfo } from "@/lib/content";
import { SITE_TAGLINE } from "@/constants/site";

export const dynamic = "force-static";
export const alt = "Niamat Ullah — Senior Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const personal = getPersonalInfo();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#090e17",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(59,130,246,0.35), transparent 45%), radial-gradient(circle at 85% 75%, rgba(34,211,238,0.2), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#3b82f6", fontFamily: "monospace" }}>
          {"<developer />"}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 72,
            fontWeight: 700,
            color: "#f8fafc",
          }}
        >
          {personal.name}
        </div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 36, color: "#94a3b8" }}>
          {personal.title}
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 26, color: "#22d3ee" }}>
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size },
  );
}
