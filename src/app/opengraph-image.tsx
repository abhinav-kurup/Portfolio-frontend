import { ImageResponse } from "next/og";

export const alt = "Abhinav Kurup — AI & Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "#ffffff",
                color: "#050505",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 800,
              }}
            >
              A
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              ABHINAV.DEV
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "18px",
              color: "#a1a1aa",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "flex",
              }}
            />
            ONLINE
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            position: "relative",
            maxWidth: "920px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "72px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Abhinav Kurup
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              fontWeight: 600,
              color: "#e4e4e7",
              letterSpacing: "-0.01em",
            }}
          >
            AI & Backend Engineer
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "8px",
              fontSize: "22px",
              color: "#a1a1aa",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.02em",
            }}
          >
            Agentic AI · RAG · Python · FastAPI · AWS Certified
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "28px",
            fontSize: "18px",
            color: "#71717a",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          <div style={{ display: "flex" }}>abhinav-kurup.vercel.app</div>
          <div style={{ display: "flex" }}>Portfolio · 2026</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
