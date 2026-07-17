import { ReportOpenGraphModel } from "@/types/opengraph";
import { OPEN_GRAPH_CATEGORY_CONFIG } from "./categoryConfig";
import ReportPhoto from "./ReportPhoto";

export interface ReportOpenGraphImageProps {
  readonly report: ReportOpenGraphModel;
}

export default function ReportOpenGraphImage({
  report,
}: ReportOpenGraphImageProps) {
  const category =
    OPEN_GRAPH_CATEGORY_CONFIG[report.category];

 return (
  <div
    style={{
      width: "1200px",
      height: "630px",

      display: "flex",

      backgroundColor: "#FFFFFF",

      padding: "56px",

      fontFamily: "sans-serif",

      borderRadius: "32px",
    }}
  >
    <ReportPhoto photoUrl={report.photoUrl} />

    <div
      style={{
        display: "flex",
        flexDirection: "column",

        marginLeft: "40px",

        flex: 1,
      }}
    >
      <div
  style={{
    display: "flex",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      padding: "12px 22px",

      borderRadius: "999px",

      backgroundColor: "#EEF6FF",

      color: category.color,

      fontSize: "28px",
      fontWeight: 700,
    }}
  >
    <span>{category.emoji}</span>

    <span
      style={{
        display: "flex",
        marginLeft: "10px",
      }}
    >
      {category.label}
    </span>
  </div>
</div>

      <div
        style={{
          display: "flex",

          marginTop: "40px",

          fontSize: "56px",
          fontWeight: 800,

          color: "#08122E",
        }}
      >
        {report.title}
      </div>

      <div
        style={{
          display: "flex",

          marginTop: "28px",

          fontSize: "30px",

          color: "#475569",
        }}
      >
        📍 {report.address}
      </div>

      <div
        style={{
          display: "flex",

          marginTop: "12px",

          fontSize: "26px",

          color: "#64748B",
        }}
      >
        🕒 {report.relativeTime}
      </div>

      <div
  style={{
    display: "flex",
    marginTop: "auto",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  }}
>
  <img
    src="https://www.commety.it/logo.png"
    alt="Commety"
    width={220}
    height={52}
    style={{
      objectFit: "contain",
    }}
  />
</div>
    </div>
  </div>
);
}