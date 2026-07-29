import {resolveRomaTerritory} from "./RomaTerritoryResolver";
import {describe, expect, it} from "vitest";

describe("resolveRomaTerritory", () => {
  it("riconosce il centro di Roma", () => {
    expect(resolveRomaTerritory(41.9028, 12.4964)).toMatchObject({
      districtCode: "1",
      districtName: "Municipio I",
    });
  });

  it("riconosce Ostia come territorio di Roma", () => {
    expect(resolveRomaTerritory(41.7321, 12.2765)).toMatchObject({
      districtCode: "10",
      districtName: "Municipio X",
    });
  });

  it("esclude Fiumicino", () => {
    expect(resolveRomaTerritory(41.7716, 12.2308)).toBeNull();
  });

  it("esclude la Città del Vaticano", () => {
    expect(resolveRomaTerritory(41.9029, 12.4534)).toBeNull();
  });

  it("rifiuta coordinate non valide", () => {
    expect(resolveRomaTerritory("Roma", 12.4964)).toBeNull();
  });
});
