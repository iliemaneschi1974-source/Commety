import { ReportCategory } from "../../../domain/ReportCategory";
/**
 * Analisi del risultato della ricerca duplicati.
 */
export interface DuplicateAnalysis {
    /**
     * Indica se il report è considerato un duplicato.
     */
    readonly isDuplicate: boolean;
    /**
     * Livello di confidenza compreso tra 0 e 1.
     */
    readonly confidence: number;
    /**
     * Identificativo del report ritenuto duplicato.
     * Undefined se non è stato trovato alcun match.
     */
    readonly matchedReportId?: string;
    /**
     * Motivazione utilizzabile per logging e debugging.
     */
    readonly reason: string;
}
/**
 * Informazioni minime necessarie per confrontare un report.
 */
export interface DuplicateCandidate {
    readonly id: string;
    readonly category: ReportCategory;
    readonly title: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly occurredAt: Date;
}
/**
 * Contratto del servizio di rilevamento duplicati.
 *
 * Il servizio è puro:
 * - non salva dati
 * - non modifica dati
 * - non assegna reputazione
 * - non prende decisioni
 *
 * Restituisce esclusivamente il risultato dell'analisi.
 */
export interface DuplicateDetector {
    analyze(candidate: DuplicateCandidate, nearbyReports: readonly DuplicateCandidate[]): DuplicateAnalysis;
}
//# sourceMappingURL=DuplicateDetector.d.ts.map