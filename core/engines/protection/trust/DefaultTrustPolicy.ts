import { TrustPolicy } from "./TrustPolicy";

/**
 * Policy predefinita per il calcolo
 * dell'affidabilità di una segnalazione.
 */
export class DefaultTrustPolicy implements TrustPolicy {
  getDuplicateWeight(): number {
    return 0.50;
  }

  getTemporalWeight(): number {
    return 0.25;
  }

  getSpatialWeight(): number {
    return 0.25;
  }
}