import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

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
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 90,
            fontWeight: 700,
            marginBottom: 30,
          }}
        >
          Commety
        </div>

        <div
          style={{
            fontSize: 44,
            opacity: 0.9,
          }}
        >
          Scopri cosa sta succedendo vicino a te
        </div>
      </div>
    ),
    size
  );
}