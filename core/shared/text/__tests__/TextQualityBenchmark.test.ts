import { describe, expect, it } from "vitest";

import { DefaultTextQualityScorer } from "../DefaultTextQualityScorer";

const scorer = new DefaultTextQualityScorer();

describe("Text Quality Benchmark", () => {
  describe("Testi validi", () => {
    const testiValidi = [
      "Incidente sulla A1",
      "Traffico intenso sulla Tangenziale Est",
      "Allagamento in Via Cassia",
      "Albero caduto sulla carreggiata",
      "Code all'uscita 12",
      "Pioggia intensa sulla SS148",
      "Mare mosso ad Ostia",
      "Evento in Piazza Navona",
      "Incendio vicino alla SP45",
      "Semaforo guasto in Via Tuscolana",
    ];

    for (const testo of testiValidi) {
      it(testo, () => {
        const score = scorer.score(testo);

        expect(score.isPoor()).toBe(false);
      });
    }
  });

  describe("Testi gibberish", () => {
    const testiNonValidi = [
      "rgrtrfrv rhrghrh",
      "ghjklmn zxcvbn",
      "asdf qwert poiuy",
      "jkfjkg gfjfk",
      "dfghjkl cvbnm",
      "qwrtypsdf lkjhgf",
      "aaaaaaa",
      "bbbbbbbb",
      "zzzzzzzzz",
    ];

    for (const testo of testiNonValidi) {
      it(testo, () => {
        const score = scorer.score(testo);

        expect(score.isPoor()).toBe(true);
      });
    }
  });
});