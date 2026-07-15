import { TrustPolicy } from "./TrustPolicy";
/**
 * Policy predefinita per il calcolo
 * dell'affidabilità di una segnalazione.
 */
export declare class DefaultTrustPolicy implements TrustPolicy {
    getDuplicateWeight(): number;
    getTemporalWeight(): number;
    getSpatialWeight(): number;
}
//# sourceMappingURL=DefaultTrustPolicy.d.ts.map