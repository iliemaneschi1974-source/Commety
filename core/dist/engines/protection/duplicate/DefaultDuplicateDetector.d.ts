import { DuplicateAnalysis, DuplicateCandidate, DuplicateDetector } from "./DuplicateDetector";
/**
 * Prima implementazione del rilevatore di duplicati.
 *
 * La strategia è volutamente semplice:
 * - stessa categoria
 * - distanza entro una soglia
 * - intervallo temporale entro una soglia
 * - titolo normalizzato identico
 *
 * In futuro potrà essere sostituita da algoritmi più evoluti
 * senza modificare il contratto del dominio.
 */
export declare class DefaultDuplicateDetector implements DuplicateDetector {
    /**
     * Distanza massima (metri) tra due report
     * affinché possano essere considerati lo stesso evento.
     */
    private static readonly MAX_DISTANCE_METERS;
    /**
     * Differenza temporale massima (millisecondi).
     * 30 minuti.
     */
    private static readonly MAX_TIME_DIFFERENCE_MS;
    analyze(candidate: DuplicateCandidate, nearbyReports: readonly DuplicateCandidate[]): DuplicateAnalysis;
    private sameCategory;
    private sameTitle;
    private withinTimeWindow;
    private withinDistance;
    private normalize;
    /**
     * Formula di Haversine.
     */
    private distanceMeters;
    private toRadians;
}
//# sourceMappingURL=DefaultDuplicateDetector.d.ts.map