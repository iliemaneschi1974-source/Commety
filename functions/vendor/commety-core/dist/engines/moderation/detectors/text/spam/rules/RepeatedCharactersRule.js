"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatedCharactersRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva l'utilizzo eccessivo dello stesso carattere
 * consecutivo all'interno del testo.
 *
 * Esempi:
 *
 * "!!!!!!!!!!"
 * "AAAAAAAAAA"
 * ".........."
 *
 * La regola osserva esclusivamente questo fenomeno
 * e produce una singola evidenza di moderazione.
 */
class RepeatedCharactersRule {
    /**
     * Numero minimo di caratteri consecutivi uguali
     * necessario per produrre un'evidenza.
     */
    static MINIMO_CARATTERI_CONSECUTIVI = 6;
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo;
        let ultimoCarattere = "";
        let consecutivi = 0;
        for (const carattere of testo) {
            if (carattere === ultimoCarattere) {
                consecutivi++;
                if (consecutivi >=
                    RepeatedCharactersRule.MINIMO_CARATTERI_CONSECUTIVI) {
                    return [
                        new ModerationEvidence_1.ModerationEvidence("CARATTERI_RIPETUTI", "Rilevata una sequenza eccessiva di caratteri consecutivi.", 1, "TESTO"),
                    ];
                }
            }
            else {
                ultimoCarattere = carattere;
                consecutivi = 1;
            }
        }
        return [];
    }
}
exports.RepeatedCharactersRule = RepeatedCharactersRule;
//# sourceMappingURL=RepeatedCharactersRule.js.map