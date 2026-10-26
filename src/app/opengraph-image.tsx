import { ImageResponse } from "next/og";
export const alt = "Wild Feather Creations — Objects to wear. Stories to keep.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#eeefea",
        color: "#242524",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "70px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 20, letterSpacing: 7 }}>
        WILD FEATHER CREATIONS
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 82,
          lineHeight: 1.05,
          fontFamily: "serif",
        }}
      >
        <span>Objects to wear.</span>
        <span>Stories to keep.</span>
      </div>
      <div style={{ display: "flex", fontSize: 17, letterSpacing: 3 }}>
        INDEPENDENT JEWELRY / UNITED STATES
      </div>
    </div>,
    size,
  );
}
