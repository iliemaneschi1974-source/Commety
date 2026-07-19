import { REPORT_CATEGORY_CONFIG } from "@/lib/reportCategoryConfig";
import { ReportOpenGraphModel } from "@/types/opengraph";

import ReportBody from "./ReportBody";
import ReportContent from "./ReportContent";
import ReportFooter from "./ReportFooter";
import ReportPhoto from "./ReportPhoto";
import ReportPlaceholder from "./ReportPlaceholder";

export interface ReportOpenGraphProps {
  readonly report: ReportOpenGraphModel;
}

/**
 * Componente pubblico dell'Open Graph Engine.
 *
 * È l'unico componente che il resto
 * dell'applicazione deve utilizzare.
 */
export default function ReportOpenGraph({
  report,
}: ReportOpenGraphProps) {
  const category = REPORT_CATEGORY_CONFIG[report.category];

  return (
    <div
      style={{
        width: 1200,
        height: 630,

        display: "flex",
        flexDirection: "column",

        backgroundColor: "#FFFFFF",

        borderRadius: 24,
        overflow: "hidden",

        border: "1px solid #E5E7EB",

        boxShadow:
          "0 20px 60px rgba(15,23,42,.12), 0 8px 20px rgba(15,23,42,.08)",
      }}
    >
      <ReportBody>
        <div
          style={{
            display: "flex",
            flex: 1,
            borderRight: "1px solid rgba(15,23,42,.06)",
          }}
        >
          <ReportPhoto
            photoUrl={report.mediaUrl}
            fallback={
              <ReportPlaceholder
                backgroundColor={category.color}
                icon={category.icon}
              />
            }
          />

          <ReportContent report={report} />
        </div>
      </ReportBody>

      <ReportFooter />
    </div>
  );
}
