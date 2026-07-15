import { ReportCategory } from "../../../domain/ReportCategory";
/**
 * Risultato dell'analisi temporale di un report.
 */
export interface TemporalAnalysis {
    /**
     * Indica se il report è ancora temporalmente valido.
     */
    readonly isValid: boolean;
    /**
     * Livello di confidenza compreso tra 0 e 1.
     */
    readonly confidence: number;
    /**
     * Motivazione dell'esito dell'analisi.
     */
    readonly reason: string;
}
/**
 * Informazioni minime necessarie per valutare
 * la validità temporale di un report.
 */
export interface TemporalCandidate {
    /**
     * Categoria del report.
     */
    readonly category: ReportCategory;
    /**
     * Istante in cui l'evento è avvenuto.
     */
    readonly occurredAt: Date;
}
/**
 * Contratto del validatore temporale.
 *
 * Il servizio:
 * - non modifica dati
 * - non salva dati
 * - non determina lo stato del report
 *
 * Restituisce esclusivamente il risultato
 * dell'analisi temporale.
 */
export interface TemporalValidator {
    analyze(candidate: TemporalCandidate, currentTime: Date): TemporalAnalysis;
}
//# sourceMappingURL=TemporalValidator.d.ts.map