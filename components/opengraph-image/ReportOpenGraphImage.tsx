import { ReportOpenGraphModel } from "@/types/opengraph";
import { OPEN_GRAPH_CATEGORY_CONFIG } from "./categoryConfig";

const COMMETY_LOGO_URL = "https://www.commety.it/logo.png";

export interface ReportOpenGraphImageProps {
  readonly report: ReportOpenGraphModel;
}

/** Card 1200x630 per WhatsApp, Telegram, Instagram e social crawler. */
export default function ReportOpenGraphImage({ report }: ReportOpenGraphImageProps) {
  const category = OPEN_GRAPH_CATEGORY_CONFIG[report.category];
  const hasMedia = Boolean(report.mediaUrl);

  return (
    <div style={{ width: "1200px", height: "630px", display: "flex", overflow: "hidden", backgroundColor: "#071a3c", fontFamily: "sans-serif" }}>
      {hasMedia ? (
        <div style={{ width: "520px", height: "630px", display: "flex", position: "relative", overflow: "hidden", backgroundColor: "#0b2858" }}>
          <img src={report.mediaUrl} alt="" width={520} height={630} style={{ width: "520px", height: "630px", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: "0", display: "flex", background: "linear-gradient(90deg, transparent 54%, #071a3c 100%)" }} />
          {report.mediaType === "video" ? <div style={{ position: "absolute", left: "32px", bottom: "32px", display: "flex", alignItems: "center", justifyContent: "center", width: "68px", height: "68px", borderRadius: "34px", backgroundColor: "rgba(7,26,60,0.88)", border: "2px solid rgba(255,255,255,0.7)", color: "#ffffff", fontSize: "30px", paddingLeft: "5px" }}>▶</div> : null}
        </div>
      ) : (
        <InstitutionalVisual />
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: hasMedia ? "58px 62px 48px 30px" : "58px 72px 48px 30px", color: "#ffffff", background: "linear-gradient(135deg, #061735 0%, #0F2D5F 46%, #1c518f 72%, #071a3c 100%)" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", borderRadius: "999px", padding: "12px 18px", backgroundColor: category.color, color: "#ffffff", fontSize: "25px", fontWeight: 800 }}>{category.label}</div>
          <div style={{ display: "flex", marginLeft: "18px", color: "rgba(255,255,255,0.65)", fontSize: "21px", fontWeight: 600 }}>Segnalazione in tempo reale</div>
        </div>

        <div style={{ display: "flex", marginTop: "40px", fontSize: "54px", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-2px", maxHeight: "235px", overflow: "hidden" }}>{report.title}</div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ display: "flex", fontSize: "27px", color: "rgba(255,255,255,0.88)", fontWeight: 600 }}>📍 {report.address}</div>
          <div style={{ display: "flex", marginTop: "12px", fontSize: "22px", color: "rgba(255,255,255,0.62)" }}>{report.relativeTime}</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "32px" }}>
            <CommetyLogo width={188} height={52} />
            <div style={{ display: "flex", marginLeft: "auto", fontSize: "17px", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>La mappa del mondo reale</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstitutionalVisual() {
  return <div style={{ width: "520px", height: "630px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "linear-gradient(150deg, #123d72 0%, #071a3c 72%)" }}>
    <div style={{ position: "absolute", width: "740px", height: "740px", borderRadius: "370px", border: "1px solid rgba(255,255,255,0.13)", display: "flex" }} />
    <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "250px", border: "1px solid rgba(255,255,255,0.12)", display: "flex" }} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}><CommetyLogo width={280} height={77} /><div style={{ display: "flex", marginTop: "24px", color: "rgba(255,255,255,0.72)", fontSize: "23px", fontWeight: 700 }}>Dalla community, sulla mappa.</div></div>
  </div>;
}

function CommetyLogo({ width, height }: { width: number; height: number }) {
  return <img src={COMMETY_LOGO_URL} alt="Commety" width={width} height={height} style={{ width: `${width}px`, height: `${height}px`, objectFit: "contain", filter: "brightness(0) invert(1)" }} />;
}
