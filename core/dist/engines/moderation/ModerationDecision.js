"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationDecision = void 0;
/**
 * Rappresenta la decisione finale del Moderation Engine.
 *
 * La decisione indica esclusivamente se il contenuto rispetta
 * le regole della piattaforma.
 *
 * Non contiene alcuna logica di business.
 */
class ModerationDecision {
    valore;
    constructor(valore) {
        this.valore = valore;
    }
    /**
     * Il contenuto rispetta le regole della piattaforma.
     */
    static approvato() {
        return new ModerationDecision("APPROVATO");
    }
    /**
     * Il contenuto può essere pubblicato con limitazioni.
     */
    static limitato() {
        return new ModerationDecision("LIMITATO");
    }
    /**
     * Il contenuto richiede una revisione umana.
     */
    static revisioneManuale() {
        return new ModerationDecision("REVISIONE_MANUALE");
    }
    /**
     * Il contenuto viola le regole della piattaforma.
     */
    static rifiutato() {
        return new ModerationDecision("RIFIUTATO");
    }
    /**
     * Restituisce il valore della decisione.
     */
    get value() {
        return this.valore;
    }
    isApprovato() {
        return this.valore === "APPROVATO";
    }
    isLimitato() {
        return this.valore === "LIMITATO";
    }
    isRevisioneManuale() {
        return this.valore === "REVISIONE_MANUALE";
    }
    isRifiutato() {
        return this.valore === "RIFIUTATO";
    }
    equals(other) {
        return this.valore === other.valore;
    }
}
exports.ModerationDecision = ModerationDecision;
//# sourceMappingURL=ModerationDecision.js.map