/**
 * Rappresenta una singola evidenza prodotta durante
 * il processo di valutazione della reputazione.
 *
 * L'evidenza descrive un fatto osservato sul comportamento
 * dell'utente, senza esprimere alcuna decisione finale.
 */
export declare class ReputationEvidence {
    /**
     * Categoria dell'evidenza rilevata.
     */
    readonly tipo: ReputationEvidenceType;
    /**
     * Descrizione leggibile dell'evidenza.
     */
    readonly descrizione: string;
    /**
     * Livello di confidenza della valutazione.
     *
     * Valore compreso tra 0 e 1.
     */
    readonly confidenza: number;
    /**
     * Origine dell'evidenza.
     */
    readonly origine: ReputationEvidenceSource;
    constructor(
    /**
     * Categoria dell'evidenza rilevata.
     */
    tipo: ReputationEvidenceType, 
    /**
     * Descrizione leggibile dell'evidenza.
     */
    descrizione: string, 
    /**
     * Livello di confidenza della valutazione.
     *
     * Valore compreso tra 0 e 1.
     */
    confidenza: number, 
    /**
     * Origine dell'evidenza.
     */
    origine: ReputationEvidenceSource);
    equals(other: ReputationEvidence): boolean;
}
/**
 * Tipologie di evidenze supportate dal Reputation Engine.
 *
 * Ogni evidenza rappresenta un fenomeno osservabile
 * del dominio e contribuisce alla costruzione del
 * profilo di fiducia dell'utente.
 */
export type ReputationEvidenceType = "STORICO_AFFIDABILE" | "SEGNALAZIONI_PRECISE" | "SEGNALAZIONI_ATTENDIBILI" | "CONFERME_FREQUENTI" | "COLLABORAZIONE_COSTANTE" | "PARTECIPAZIONE_ATTIVA" | "VALIDATORE_AFFIDABILE" | "CONTENUTI_DI_QUALITA" | "FOTO_DI_QUALITA" | "DESCRIZIONI_COMPLETE" | "COMPORTAMENTO_CORRETTO" | "SPAM_RECIDIVO" | "ABUSO_RECIDIVO" | "VIOLAZIONI_RIPETUTE" | "CONTENUTI_RIMOSSI_FREQUENTEMENTE" | "FIDUCIA_IN_CRESCITA" | "FIDUCIA_STABILE" | "FIDUCIA_IN_DIMINUZIONE" | "ALTRO";
/**
 * Origine dell'evidenza.
 */
export type ReputationEvidenceSource = "PUBLICATION" | "MODERATION" | "COMMUNITY" | "LIFECYCLE" | "AI" | "MANUALE";
//# sourceMappingURL=ReputationEvidence.d.ts.map