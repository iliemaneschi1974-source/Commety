export function hasMunicipalHistory(
  report: Record<string, unknown>
): boolean {
  const workflow = report.municipalWorkflow;
  if (!workflow || typeof workflow !== "object") return false;

  const data = workflow as {
    updatedAt?: unknown;
    status?: unknown;
    institutionalNote?: unknown;
  };

  return Boolean(
    data.updatedAt ||
      (typeof data.status === "string" && data.status !== "NEW") ||
      (typeof data.institutionalNote === "string" &&
        data.institutionalNote.trim())
  );
}
