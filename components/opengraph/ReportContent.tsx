import { Clock3, MapPin } from "lucide-react";

import { REPORT_CATEGORY_CONFIG } from "@/lib/reportCategoryConfig";
import { ReportOpenGraphModel } from "@/types/opengraph";

export interface ReportContentProps {
  readonly report: ReportOpenGraphModel;
}

/**
 * Contenuto testuale della Open Graph Card.
 */
export default function ReportContent({
  report,
}: ReportContentProps) {
  const category = REPORT_CATEGORY_CONFIG[report.category];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        padding: "48px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
          gap: 10,
          padding: "8px 18px",
          borderRadius: 999,
          backgroundColor: category.color,
          color: "#FFFFFF",
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 28,
        }}
      >
        {category.icon}

        <span>{category.label}</span>
      </div>

      <div
        style={{
          fontSize: 42,
          fontWeight: 700,
          color: "#111827",
          lineHeight: 1.2,
          marginBottom: 28,
        }}
      >
        {report.title}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#4B5563",
          fontSize: 24,
          marginBottom: 14,
        }}
      >
        <MapPin size={22} />

        <span>{report.address}</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#6B7280",
          fontSize: 22,
        }}
      >
        <Clock3 size={20} />

        <span>{report.relativeTime}</span>
      </div>
    </div>
  );
}