import { GeoPoint } from "../../../domain/GeoPoint";
import { DistanceCalculator } from "./DistanceCalculator";
import { SpatialPolicy } from "./SpatialPolicy";
import { SpatialAnalysis, SpatialCandidate, SpatialValidator } from "./SpatialValidator";
/**
 * Implementazione predefinita del validatore spaziale.
 *
 * Applica una SpatialPolicy utilizzando un
 * DistanceCalculator per verificare se una
 * segnalazione rientra nella propria area di influenza.
 */
export declare class DefaultSpatialValidator implements SpatialValidator {
    private readonly policy;
    private readonly distanceCalculator;
    constructor(policy: SpatialPolicy, distanceCalculator: DistanceCalculator);
    analyze(candidate: SpatialCandidate, reference: GeoPoint): SpatialAnalysis;
}
//# sourceMappingURL=DefaultSpatialValidator.d.ts.map