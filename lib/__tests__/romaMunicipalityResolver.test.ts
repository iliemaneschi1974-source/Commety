import {describe, expect, it} from "vitest";

import {resolveRomaMunicipio} from "../territory/romaMunicipalityResolver";

describe("resolveRomaMunicipio", () => {
  it("assegna il centro storico al Municipio I", () => {
    expect(resolveRomaMunicipio(41.9028, 12.4964)).toEqual({
      districtCode: "1",
      districtName: "Municipio I",
    });
  });

  it("assegna Ostia al Municipio X", () => {
    expect(resolveRomaMunicipio(41.7321, 12.2765)).toEqual({
      districtCode: "10",
      districtName: "Municipio X",
    });
  });

  it("non assegna coordinate fuori Roma", () => {
    expect(resolveRomaMunicipio(45.4642, 9.19)).toBeNull();
  });
});
