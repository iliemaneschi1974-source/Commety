import { Report } from "@/types/report";
import { ReportOpenGraphModel } from "@/types/opengraph";
import { formatRelativeTime } from "@/lib/formatRelativeTime";

/**
 * Trasforma una Report di dominio
 * nel modello utilizzato dall'Open Graph Engine.
 */
export function mapReportToOpenGraphModel(
  report: Report
): ReportOpenGraphModel {
  return {
    title: report.title,

    address:
      report.address ??
      report.city ??
      "Posizione non disponibile",

    /**
     * Per il momento usiamo un testo fisso.
     *
     * Successivamente calcoleremo il tempo
     * relativo partendo da createdAt.
     */
    relativeTime: report.createdAt
  ? formatRelativeTime(report.createdAt.toDate())
  : "Pochi istanti fa",

    category: report.type,

    mediaUrl:
      report.images.length > 0
        ? report.images[0].url
        : report.video?.moderationFrames?.[1]?.url,

    mediaType: report.images.length > 0
      ? "photo"
      : report.video
        ? "video"
        : undefined,
  };
}
