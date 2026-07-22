import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Commety, la mappa del mondo reale";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const [background, logo] = await Promise.all([
    readFile(join(process.cwd(), "public", "og-institutional-map.png"), "base64"),
    readFile(join(process.cwd(), "public", "logo-header-cropped.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#061735",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={`data:image/png;base64,${background}`}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, width: "1200px", height: "630px" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, rgba(3,19,49,0.96) 0%, rgba(5,26,61,0.91) 34%, rgba(5,26,61,0.2) 59%, transparent 76%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            width: "530px",
            padding: "70px 0 64px 72px",
          }}
        >
          <img
            src={`data:image/png;base64,${logo}`}
            alt="Commety"
            width={290}
            height={77}
            style={{ width: "290px", height: "77px", objectFit: "contain" }}
          />
          <div style={{ display: "flex", flexDirection: "column", marginTop: "68px", fontSize: "52px", lineHeight: 1.06, fontWeight: 800, letterSpacing: "-2px" }}>
            <span style={{ display: "flex" }}>La mappa del</span>
            <span style={{ display: "flex" }}>mondo reale.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "28px", fontSize: "25px", lineHeight: 1.34, color: "rgba(255,255,255,0.84)", fontWeight: 500 }}>
            <span style={{ display: "flex" }}>Eventi, avvisi e vita locale.</span>
            <span style={{ display: "flex" }}>Tutto quello che accade, in tempo reale.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "auto", fontSize: "18px", fontWeight: 700, color: "#a9d5ff", letterSpacing: "0.4px" }}>
            DALLA COMMUNITY, SULLA MAPPA
          </div>
        </div>
      </div>
    ),
    size
  );
}
