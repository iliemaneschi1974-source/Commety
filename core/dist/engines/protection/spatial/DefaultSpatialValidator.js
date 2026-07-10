"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSpatialValidator = void 0;
/**
 * Implementazione predefinita del validatore spaziale.
 *
 * Applica una SpatialPolicy utilizzando un
 * DistanceCalculator per verificare se una
 * segnalazione rientra nella propria area di influenza.
 */
class DefaultSpatialValidator {
    policy;
    distanceCalculator;
    constructor(policy, distanceCalculator) {
        this.policy = policy;
        this.distanceCalculator = distanceCalculator;
    }
    analyze(candidate, reference) {
        const influenceRadius = this.policy.getInfluenceRadius(candidate.category);
        const distance = this.distanceCalculator.calculate({
            latitude: candidate.latitude,
            longitude: candidate.longitude,
        }, reference);
        const isValid = distance <= influenceRadius;
        return {
            isValid,
            confidence: isValid ? 1 : 0,
            reason: isValid
                ? "La segnalazione rientra nell'area di influenza."
                : "La segnalazione è esterna all'area di influenza.",
        };
    }
}
exports.DefaultSpatialValidator = DefaultSpatialValidator;
//# sourceMappingURL=DefaultSpatialValidator.js.map