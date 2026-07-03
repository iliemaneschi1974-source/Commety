import { GeoPoint } from "../../../domain/GeoPoint";
import { DistanceCalculator } from "./DistanceCalculator";
import { SpatialPolicy } from "./SpatialPolicy";
import {
  SpatialAnalysis,
  SpatialCandidate,
  SpatialValidator,
} from "./SpatialValidator";

/**
 * Implementazione predefinita del validatore spaziale.
 *
 * Applica una SpatialPolicy utilizzando un
 * DistanceCalculator per verificare se una
 * segnalazione rientra nella propria area di influenza.
 */
export class DefaultSpatialValidator
  implements SpatialValidator
{
  constructor(
    private readonly policy: SpatialPolicy,
    private readonly distanceCalculator: DistanceCalculator,
  ) {}

  analyze(
    candidate: SpatialCandidate,
    reference: GeoPoint,
  ): SpatialAnalysis {
    const influenceRadius =
      this.policy.getInfluenceRadius(candidate.category);

    const distance =
      this.distanceCalculator.calculate(
        {
          latitude: candidate.latitude,
          longitude: candidate.longitude,
        },
        reference,
      );

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