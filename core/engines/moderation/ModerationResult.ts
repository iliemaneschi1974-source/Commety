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
export class ModerationResult {
  constructor(
    /**
     * Decisione finale del Moderation Engine.
     */
    public readonly decision: ModerationDecision,

    /**
     * Evidenze prodotte durante l'analisi.
     */
    public readonly evidences: readonly ModerationEvidence[]
  ) {}

  /**
   * Indica se il contenuto è stato approvato.
   */
  isApproved(): boolean {
    return this.decision.isApprovato();
  }

  /**
   * Indica se il contenuto è stato limitato.
   */
  isLimited(): boolean {
    return this.decision.isLimitato();
  }

  /**
   * Indica se il contenuto richiede revisione manuale.
   */
  isManualReview(): boolean {
    return this.decision.isRevisioneManuale();
  }

  /**
   * Indica se il contenuto è stato rifiutato.
   */
  isRejected(): boolean {
    return this.decision.isRifiutato();
  }
}