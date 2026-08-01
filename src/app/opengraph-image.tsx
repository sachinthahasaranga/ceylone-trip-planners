import { ImageResponse } from "next/og";

export const alt = "Ceylon Trip Planners — Discover the Wonder of Sri Lanka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          background: "linear-gradient(135deg, #0e7c66 0%, #0a3a30 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#cda46a",
          }}
        >
          Ceylon Trip Planners
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.05,
            marginTop: 24,
          }}
        >
          Discover the Wonder of Sri Lanka
        </div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.82)", marginTop: 28 }}>
          Bespoke tours &amp; holiday packages, crafted by local experts.
        </div>
      </div>
    ),
    { ...size }
  );
}
