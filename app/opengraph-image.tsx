import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muhammad Haider Mustafa — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 15% 20%, rgba(99,102,241,0.45), transparent 55%), radial-gradient(circle at 85% 80%, rgba(139,92,246,0.45), transparent 55%), #08080f",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", width: 48, height: 48, background: "#6366f1", color: "#fff", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>HM</div>
          <div style={{ display: "flex", letterSpacing: 6, fontSize: 16, color: "#a0a4c8", textTransform: "uppercase" }}>Haider Mustafa</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 30, color: "#818cf8", letterSpacing: 4, textTransform: "uppercase" }}>Software Engineer</div>
          <div style={{ fontSize: 96, lineHeight: 1.02, fontWeight: 700, letterSpacing: -2 }}>
            Full-stack web,<br />AI, & security.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#a0a4c8" }}>
          <span>Hobart · Tasmania</span>
          <span>Available for opportunities</span>
        </div>
      </div>
    ),
    size
  );
}
