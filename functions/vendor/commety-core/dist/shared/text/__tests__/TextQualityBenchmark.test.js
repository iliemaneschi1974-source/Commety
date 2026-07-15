"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const DefaultTextQualityScorer_1 = require("../DefaultTextQualityScorer");
const scorer = new DefaultTextQualityScorer_1.DefaultTextQualityScorer();
(0, vitest_1.describe)("Text Quality Benchmark", () => {
    (0, vitest_1.describe)("Testi validi", () => {
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
            (0, vitest_1.it)(testo, () => {
                const score = scorer.score(testo);
                (0, vitest_1.expect)(score.isPoor()).toBe(false);
            });
        }
    });
    (0, vitest_1.describe)("Testi gibberish", () => {
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
            (0, vitest_1.it)(testo, () => {
                const score = scorer.score(testo);
                (0, vitest_1.expect)(score.isPoor()).toBe(true);
            });
        }
    });
});
//# sourceMappingURL=TextQualityBenchmark.test.js.map