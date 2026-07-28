import { describe, expect, it } from "vitest";

import { hasMunicipalHistory } from "../reportMunicipalHistory";

describe("hasMunicipalHistory", () => {
  it("conserva una segnalazione presa in carico dal Comune", () => {
    expect(
      hasMunicipalHistory({
        municipalWorkflow: { status: "TAKEN" },
      })
    ).toBe(true);
  });

  it("conserva una segnalazione risolta dal Comune", () => {
    expect(
      hasMunicipalHistory({
        municipalWorkflow: { status: "RESOLVED" },
      })
    ).toBe(true);
  });

  it("non archivia una segnalazione mai trattata", () => {
    expect(
      hasMunicipalHistory({
        municipalWorkflow: { status: "NEW" },
      })
    ).toBe(false);
  });
});
