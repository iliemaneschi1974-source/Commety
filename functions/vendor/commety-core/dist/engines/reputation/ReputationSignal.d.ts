/**
 * Rappresenta un segnale di dominio osservato dal Reputation Engine.
 *
 * I segnali vengono prodotti dagli altri Engine del Core
 * e costituiscono l'unico punto di ingresso per la valutazione
 * della reputazione.
 */
export declare class ReputationSignal {
    /**
     * Tipo del segnale osservato.
     */
    readonly tipo: ReputationSignalType;
    /**
     * Momento in cui il fenomeno è stato osservato.
     */
    readonly timestamp: Date;
    /**
     * Origine del segnale.
     */
    readonly origine: ReputationSignalSource;
    /**
     * Metadati opzionali associati al segnale.
     */
    readonly metadata: Readonly<Record<string, unknown>>;
    constructor(
    /**
     * Tipo del segnale osservato.
     */
    tipo: ReputationSignalType, 
    /**
     * Momento in cui il fenomeno è stato osservato.
     */
    timestamp: Date, 
    /**
     * Origine del segnale.
     */
    origine: ReputationSignalSource, 
    /**
     * Metadati opzionali associati al segnale.
     */
    metadata?: Readonly<Record<string, unknown>>);
    equals(other: ReputationSignal): boolean;
}
/**
 * Tipologie di segnali supportate dal Reputation Engine.
 */
export type ReputationSignalType = "REPORT_PUBBLICATO" | "REPORT_NON_PUBBLICATO" | "REPORT_SMENTITO" | "SEGNALAZIONE_PRECISA" | "CONTENUTO_APPROVATO" | "CONTENUTO_LIMITATO" | "CONTENUTO_RIMOSSO" | "SEGNALAZIONE_SPAM" | "CONFERMA_COMMUNITY" | "SCONFERMA_COMMUNITY" | "REPORT_RISOLTO" | "REPORT_SCADUTO" | "REPORT_CONFERMATO_NEL_TEMPO" | "ACCOUNT_CREATO" | "ACCOUNT_SOSPESO";
/**
 * Origine del segnale.
 */
export type ReputationSignalSource = "PUBLICATION" | "MODERATION" | "COMMUNITY" | "LIFECYCLE" | "ACCOUNT";
//# sourceMappingURL=ReputationSignal.d.ts.map