"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationResult = void 0;
/**
 * ============================================================================
 * MODERATION RESULT
 * ----------------------------------------------------------------------------
 *
 * Rappresenta il risultato completo prodotto dal Moderation Engine.
 *
 * Contiene:
 *
 * - la decisione finale;
 * - tutte le evidenze rilevate durante l'analisi.
 *
 * Non contiene alcuna logica di business.
 * ============================================================================
 */
class ModerationResult {
    decision;
    evidences;
    constructor(
    /**
     * Decisione finale del Moderation Engine.
     */
    decision, 
    /**
     * Evidenze prodotte durante l'analisi.
     */
    evidences) {
        this.decision = decision;
        this.evidences = evidences;
    }
    /**
     * Indica se il contenuto è stato approvato.
     */
    isApproved() {
        return this.decision.isApprovato();
    }
    /**
     * Indica se il contenuto è stato limitato.
     */
    isLimited() {
        return this.decision.isLimitato();
    }
    /**
     * Indica se il contenuto richiede revisione manuale.
     */
    isManualReview() {
        return this.decision.isRevisioneManuale();
    }
    /**
     * Indica se il contenuto è stato rifiutato.
     */
    isRejected() {
        return this.decision.isRifiutato();
    }
}
exports.ModerationResult = ModerationResult;
//# sourceMappingURL=ModerationResult.js.map