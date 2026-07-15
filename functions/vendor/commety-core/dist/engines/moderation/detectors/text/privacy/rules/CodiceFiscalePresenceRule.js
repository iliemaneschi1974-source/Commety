"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodiceFiscalePresenceRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di un codice fiscale
 * italiano all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class CodiceFiscalePresenceRule {
    /**
     * Espressione regolare utilizzata per
     * individuare codici fiscali italiani.
     *
     * Non viene eseguita la validazione
     * del carattere di controllo.
     */
    static CODICE_FISCALE_REGEX = /\b[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]\b/iu;
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo;
        if (!CodiceFiscalePresenceRule.CODICE_FISCALE_REGEX.test(testo)) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("DATI_PERSONALI_RILEVATI", "Rilevata la presenza di un codice fiscale nel contenuto.", 1.0, "TESTO"),
        ];
    }
}
exports.CodiceFiscalePresenceRule = CodiceFiscalePresenceRule;
//# sourceMappingURL=CodiceFiscalePresenceRule.js.map