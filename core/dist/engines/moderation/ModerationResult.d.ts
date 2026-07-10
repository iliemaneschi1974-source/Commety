import { ModerationEvidence } from "./ModerationEvidence";
import { ModerationDecision } from "./ModerationDecision";
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
export declare class ModerationResult {
    /**
     * Decisione finale del Moderation Engine.
     */
    readonly decision: ModerationDecision;
    /**
     * Evidenze prodotte durante l'analisi.
     */
    readonly evidences: readonly ModerationEvidence[];
    constructor(
    /**
     * Decisione finale del Moderation Engine.
     */
    decision: ModerationDecision, 
    /**
     * Evidenze prodotte durante l'analisi.
     */
    evidences: readonly ModerationEvidence[]);
    /**
     * Indica se il contenuto è stato approvato.
     */
    isApproved(): boolean;
    /**
     * Indica se il contenuto è stato limitato.
     */
    isLimited(): boolean;
    /**
     * Indica se il contenuto richiede revisione manuale.
     */
    isManualReview(): boolean;
    /**
     * Indica se il contenuto è stato rifiutato.
     */
    isRejected(): boolean;
}
//# sourceMappingURL=ModerationResult.d.ts.map