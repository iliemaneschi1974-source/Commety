"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooShortTextRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva contenuti troppo brevi
 * e privi di reale significato.
 *
 * Ogni riga del contenuto viene analizzata
 * separatamente, così da gestire correttamente
 * titolo e descrizione.
 */
class TooShortTextRule {
    /**
     * Parole che, se utilizzate da sole,
     * non costituiscono una segnalazione.
     */
    static TESTI_NON_VALIDI = new Set([
        "ok",
        "ciao",
        "boh",
        "mah",
        "eh",
        "lol",
        "test",
        "prova",
    ]);
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const righe = contenuto.testo
            .split("\n")
            .map((riga) => riga.trim().toLowerCase())
            .filter((riga) => riga.length > 0);
        for (const riga of righe) {
            if (TooShortTextRule.TESTI_NON_VALIDI.has(riga)) {
                return [
                    new ModerationEvidence_1.ModerationEvidence("TESTO_TROPPO_BREVE", "Il contenuto è troppo breve per rappresentare una segnalazione.", 1, "TESTO"),
                ];
            }
        }
        return [];
    }
}
exports.TooShortTextRule = TooShortTextRule;
//# sourceMappingURL=TooShortTextRule.js.map