/**
 * Rappresenta la decisione finale del Moderation Engine.
 *
 * La decisione indica esclusivamente se il contenuto rispetta
 * le regole della piattaforma.
 *
 * Non contiene alcuna logica di business.
 */
export declare class ModerationDecision {
    private readonly valore;
    private constructor();
    /**
     * Il contenuto rispetta le regole della piattaforma.
     */
    static approvato(): ModerationDecision;
    /**
     * Il contenuto può essere pubblicato con limitazioni.
     */
    static limitato(): ModerationDecision;
    /**
     * Il contenuto richiede una revisione umana.
     */
    static revisioneManuale(): ModerationDecision;
    /**
     * Il contenuto viola le regole della piattaforma.
     */
    static rifiutato(): ModerationDecision;
    /**
     * Restituisce il valore della decisione.
     */
    get value(): ModerationDecisionValue;
    isApprovato(): boolean;
    isLimitato(): boolean;
    isRevisioneManuale(): boolean;
    isRifiutato(): boolean;
    equals(other: ModerationDecision): boolean;
}
/**
 * Valori ammessi per una decisione di moderazione.
 */
export type ModerationDecisionValue = "APPROVATO" | "LIMITATO" | "REVISIONE_MANUALE" | "RIFIUTATO";
//# sourceMappingURL=ModerationDecision.d.ts.map