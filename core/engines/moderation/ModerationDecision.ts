/**
 * Rappresenta la decisione finale del Moderation Engine.
 *
 * La decisione indica esclusivamente se il contenuto rispetta
 * le regole della piattaforma.
 *
 * Non contiene alcuna logica di business.
 */
export class ModerationDecision {
  private constructor(
    private readonly valore: ModerationDecisionValue
  ) {}

  /**
   * Il contenuto rispetta le regole della piattaforma.
   */
  static approvato(): ModerationDecision {
    return new ModerationDecision("APPROVATO");
  }

  /**
   * Il contenuto può essere pubblicato con limitazioni.
   */
  static limitato(): ModerationDecision {
    return new ModerationDecision("LIMITATO");
  }

  /**
   * Il contenuto richiede una revisione umana.
   */
  static revisioneManuale(): ModerationDecision {
    return new ModerationDecision("REVISIONE_MANUALE");
  }

  /**
   * Il contenuto viola le regole della piattaforma.
   */
  static rifiutato(): ModerationDecision {
    return new ModerationDecision("RIFIUTATO");
  }

  /**
   * Restituisce il valore della decisione.
   */
  get value(): ModerationDecisionValue {
    return this.valore;
  }

  isApprovato(): boolean {
    return this.valore === "APPROVATO";
  }

  isLimitato(): boolean {
    return this.valore === "LIMITATO";
  }

  isRevisioneManuale(): boolean {
    return this.valore === "REVISIONE_MANUALE";
  }

  isRifiutato(): boolean {
    return this.valore === "RIFIUTATO";
  }

  equals(other: ModerationDecision): boolean {
    return this.valore === other.valore;
  }
}

/**
 * Valori ammessi per una decisione di moderazione.
 */
export type ModerationDecisionValue =
  | "APPROVATO"
  | "LIMITATO"
  | "REVISIONE_MANUALE"
  | "RIFIUTATO";