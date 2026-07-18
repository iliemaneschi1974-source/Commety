import { describe, expect, it } from "vitest";

import { ReportSubmissionResult } from "../dto/ReportSubmissionResult";
import { ModerationMessage } from "../moderation/ModerationMessage";

describe("ReportSubmissionResult", () => {
  it("crea un risultato di successo", () => {
    const result = ReportSubmissionResult.success(
      "report-id"
    );

    expect(result.success).toBe(true);
    expect(result.reportId).toBe("report-id");
    expect(result.moderationMessage).toBeUndefined();
  });

  it("crea un risultato di errore", () => {
    const message = new ModerationMessage(
      "Errore di moderazione",
      "La segnalazione contiene dati non consentiti."
    );

    const result =
      ReportSubmissionResult.failure(
        message
      );

    expect(result.success).toBe(false);
    expect(result.moderationMessage).toBe(
      message
    );
  });
});
