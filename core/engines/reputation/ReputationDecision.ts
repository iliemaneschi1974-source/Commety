/**
 * Decisione finale prodotta dal Reputation Engine.
 *
 * Rappresenta il livello di fiducia che Commetty
 * ripone in un utente sulla base delle evidenze
 * disponibili.
 */
export class ReputationDecision {
  private constructor(
    public readonly livello: ReputationDecisionLevel
  ) {}

  static fiduciaMassima(): ReputationDecision {
    return new ReputationDecision("FIDUCIA_MASSIMA");
  }

  static altaFiducia(): ReputationDecision {
    return new ReputationDecision("ALTA_FIDUCIA");
  }

  static fiduciaStandard(): ReputationDecision {
    return new ReputationDecision("FIDUCIA_STANDARD");
  }

  static fiduciaLimitata(): ReputationDecision {
    return new ReputationDecision("FIDUCIA_LIMITATA");
  }

  static osservazione(): ReputationDecision {
    return new ReputationDecision("OSSERVAZIONE");
  }

  static nonAffidabile(): ReputationDecision {
    return new ReputationDecision("NON_AFFIDABILE");
  }

  isFiduciaMassima(): boolean {
    return this.livello === "FIDUCIA_MASSIMA";
  }

  isAltaFiducia(): boolean {
    return this.livello === "ALTA_FIDUCIA";
  }

  isFiduciaStandard(): boolean {
    return this.livello === "FIDUCIA_STANDARD";
  }

  isFiduciaLimitata(): boolean {
    return this.livello === "FIDUCIA_LIMITATA";
  }

  isOsservazione(): boolean {
    return this.livello === "OSSERVAZIONE";
  }

  isNonAffidabile(): boolean {
    return this.livello === "NON_AFFIDABILE";
  }

  equals(other: ReputationDecision): boolean {
    return this.livello === other.livello;
  }
}

/**
 * Livelli di fiducia supportati dal Reputation Engine.
 */
export type ReputationDecisionLevel =
  | "FIDUCIA_MASSIMA"
  | "ALTA_FIDUCIA"
  | "FIDUCIA_STANDARD"
  | "FIDUCIA_LIMITATA"
  | "OSSERVAZIONE"
  | "NON_AFFIDABILE";