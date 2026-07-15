"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTrustPolicy = void 0;
/**
 * Policy predefinita per il calcolo
 * dell'affidabilità di una segnalazione.
 */
class DefaultTrustPolicy {
    getDuplicateWeight() {
        return 0.50;
    }
    getTemporalWeight() {
        return 0.25;
    }
    getSpatialWeight() {
        return 0.25;
    }
}
exports.DefaultTrustPolicy = DefaultTrustPolicy;
//# sourceMappingURL=DefaultTrustPolicy.js.map