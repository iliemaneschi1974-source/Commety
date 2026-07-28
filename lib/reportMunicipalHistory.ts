import type { Report } from "@/types/report";

export function hasMunicipalHistory(
  report: Pick<Report, "municipalWorkflow">
): boolean {
  const workflow = report.municipalWorkflow;

  return Boolean(
    workflow?.updatedAt ||
      (workflow?.status && workflow.status !== "NEW") ||
      workflow?.institutionalNote?.trim()
  );
}
