/**
 * Decisione finale prodotta dal Reputation Engine.
 *
 * Rappresenta il livello di fiducia che Commetty
 * ripone in un utente sulla base delle evidenze
 * disponibili.
 */
export declare class ReputationDecision {
    readonly livello: ReputationDecisionLevel;
    private constructor();
    static fiduciaMassima(): ReputationDecision;
    static altaFiducia(): ReputationDecision;
    static fiduciaStandard(): ReputationDecision;
    static fiduciaLimitata(): ReputationDecision;
    static osservazione(): ReputationDecision;
    static nonAffidabile(): ReputationDecision;
    isFiduciaMassima(): boolean;
    isAltaFiducia(): boolean;
    isFiduciaStandard(): boolean;
    isFiduciaLimitata(): boolean;
    isOsservazione(): boolean;
    isNonAffidabile(): boolean;
    equals(other: ReputationDecision): boolean;
}
/**
 * Livelli di fiducia supportati dal Reputation Engine.
 */
export type ReputationDecisionLevel = "FIDUCIA_MASSIMA" | "ALTA_FIDUCIA" | "FIDUCIA_STANDARD" | "FIDUCIA_LIMITATA" | "OSSERVAZIONE" | "NON_AFFIDABILE";
//# sourceMappingURL=ReputationDecision.d.ts.map