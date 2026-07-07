import { describe, expect, it } from "vitest";

import { ReputationContext } from "../ReputationContext";
import { ReportConfermatoNelTempoRule } from "./ReportConfermatoNelTempoRule";
import { ReputationSignalBuilder } from "../testing/ReputationSignalBuilder";

describe("ReportConfermatoNelTempoRule", () => {
  const rule = new ReportConfermatoNelTempoRule();

  it("non produce evidenze quando il segnale non è presente", () => {
    const context = new ReputationContext([]);

    const evidenze = rule.analizza(context);

    expect(evidenze).toHaveLength(0);
  });

  it("produce STORICO_AFFIDABILE quando è presente un report confermato nel tempo", () => {
    const context = new ReputationContext([
      ReputationSignalBuilder.create()
        .reportConfermatoNelTempo()
        .build(),
    ]);

    const evidenze = rule.analizza(context);

    expect(evidenze).toHaveLength(1);
    expect(evidenze[0].tipo).toBe("STORICO_AFFIDABILE");
  });
});