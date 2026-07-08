import { describe, expect, it } from "vitest";

import { ReportSubmissionResult } from "../dto/ReportSubmissionResult";

describe("ReportSubmissionResult", () => {
  it("crea un risultato di successo", () => {
    const result = ReportSubmissionResult.success();

    expect(result.success).toBe(true);
    expect(result.message).toBeUndefined();
  });

  it("crea un risultato di errore", () => {
    const result =
      ReportSubmissionResult.failure(
        "Errore di moderazione"
      );

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      "Errore di moderazione"
    );
  });
});