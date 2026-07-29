import { describe, expect, it } from "vitest";

import { hasMunicipalHistory } from "../../functions/src/domain/reportMunicipalHistory";

describe("hasMunicipalHistory usato dalle Cloud Functions", () => {
  it("archivia una segnalazione con stato comunale lavorato", () => {
    expect(
      hasMunicipalHistory({
        municipalWorkflow: { status: "IN_PROGRESS" },
      })
    ).toBe(true);
  });

  it("archivia anche un aggiornamento comunale senza cambio di stato", () => {
    expect(
      hasMunicipalHistory({
        municipalWorkflow: {
          status: "NEW",
          institutionalNote: "Intervento programmato.",
        },
      })
    ).toBe(true);
  });

  it("lascia eliminare una segnalazione mai trattata", () => {
    expect(
      hasMunicipalHistory({
        municipalWorkflow: { status: "NEW" },
      })
    ).toBe(false);
  });
});
