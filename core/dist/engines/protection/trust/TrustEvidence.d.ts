import { DuplicateAnalysis } from "../duplicate/DuplicateDetector";
import { TemporalAnalysis } from "../temporal/TemporalValidator";
import { SpatialAnalysis } from "../spatial/SpatialValidator";
/**
 * Insieme delle evidenze raccolte dal Protection Engine
 * per valutare l'affidabilità di una segnalazione.
 *
 * Ogni evidenza è prodotta da una capability indipendente.
 */
export interface TrustEvidence {
    /**
     * Analisi della presenza di duplicati.
     */
    readonly duplicate: DuplicateAnalysis;
    /**
     * Analisi della plausibilità temporale.
     */
    readonly temporal: TemporalAnalysis;
    /**
     * Analisi della plausibilità spaziale.
     */
    readonly spatial: SpatialAnalysis;
}
//# sourceMappingURL=TrustEvidence.d.ts.map