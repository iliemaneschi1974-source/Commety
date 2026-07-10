import { ReputationSignal, ReputationSignalType } from "./ReputationSignal";
/**
 * Contesto di valutazione del Reputation Engine.
 *
 * Rappresenta l'insieme delle informazioni disponibili
 * durante la costruzione del profilo di fiducia.
 *
 * Nella prima versione contiene esclusivamente i
 * segnali di dominio osservati.
 *
 * Potrà essere esteso negli sprint futuri senza
 * modificare il contratto pubblico delle Rule.
 */
export declare class ReputationContext {
    /**
     * Segnali osservati dal Reputation Engine.
     */
    readonly segnali: readonly ReputationSignal[];
    constructor(
    /**
     * Segnali osservati dal Reputation Engine.
     */
    segnali: readonly ReputationSignal[]);
    /**
     * Verifica se il contesto contiene almeno
     * un segnale del tipo richiesto.
     *
     * @param tipo Tipo di segnale da ricercare.
     * @returns true se il segnale è presente.
     */
    haSegnale(tipo: ReputationSignalType): boolean;
    /**
     * Restituisce tutti i segnali del tipo richiesto.
     *
     * @param tipo Tipo di segnale da ricercare.
     * @returns I segnali trovati.
     */
    segnaliDiTipo(tipo: ReputationSignalType): readonly ReputationSignal[];
    /**
     * Restituisce il numero di segnali del tipo richiesto.
     *
     * @param tipo Tipo di segnale da contare.
     * @returns Numero di segnali presenti nel contesto.
     */
    contaSegnali(tipo: ReputationSignalType): number;
}
//# sourceMappingURL=ReputationContext.d.ts.map