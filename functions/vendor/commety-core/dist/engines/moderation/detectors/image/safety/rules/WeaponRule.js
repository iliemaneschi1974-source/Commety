"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di armi
 * all'interno di un'immagine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class WeaponRule {
    /**
     * Soglia minima oltre la quale
     * la presenza di armi viene
     * considerata rilevante.
     */
    static SOGLIA = 0.80;
    analizza(analisi) {
        if (analisi.armi < WeaponRule.SOGLIA) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("ARMI_RILEVATE", "Rilevata la presenza di armi nell'immagine.", analisi.armi, "IMMAGINE"),
        ];
    }
}
exports.WeaponRule = WeaponRule;
//# sourceMappingURL=WeaponRule.js.map