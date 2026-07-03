import {
  DuplicateAnalysis,
  DuplicateCandidate,
  DuplicateDetector,
} from "./DuplicateDetector";

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
export class DefaultDuplicateDetector implements DuplicateDetector {
  /**
   * Distanza massima (metri) tra due report
   * affinché possano essere considerati lo stesso evento.
   */
  private static readonly MAX_DISTANCE_METERS = 100;

  /**
   * Differenza temporale massima (millisecondi).
   * 30 minuti.
   */
  private static readonly MAX_TIME_DIFFERENCE_MS =
    30 * 60 * 1000;

  analyze(
    candidate: DuplicateCandidate,
    nearbyReports: readonly DuplicateCandidate[],
  ): DuplicateAnalysis {
    for (const report of nearbyReports) {
      if (!this.sameCategory(candidate, report)) {
        continue;
      }

      if (!this.sameTitle(candidate, report)) {
        continue;
      }

      if (!this.withinTimeWindow(candidate, report)) {
        continue;
      }

      if (!this.withinDistance(candidate, report)) {
        continue;
      }

      return {
        isDuplicate: true,
        confidence: 1,
        matchedReportId: report.id,
        reason: "Duplicate report detected.",
      };
    }

    return {
      isDuplicate: false,
      confidence: 0,
      reason: "No duplicate report found.",
    };
  }

  private sameCategory(
    a: DuplicateCandidate,
    b: DuplicateCandidate,
  ): boolean {
    return a.category === b.category;
  }

  private sameTitle(
    a: DuplicateCandidate,
    b: DuplicateCandidate,
  ): boolean {
    return this.normalize(a.title) === this.normalize(b.title);
  }

  private withinTimeWindow(
    a: DuplicateCandidate,
    b: DuplicateCandidate,
  ): boolean {
    return (
      Math.abs(
        a.occurredAt.getTime() - b.occurredAt.getTime(),
      ) <= DefaultDuplicateDetector.MAX_TIME_DIFFERENCE_MS
    );
  }

  private withinDistance(
    a: DuplicateCandidate,
    b: DuplicateCandidate,
  ): boolean {
    return (
      this.distanceMeters(
        a.latitude,
        a.longitude,
        b.latitude,
        b.longitude,
      ) <= DefaultDuplicateDetector.MAX_DISTANCE_METERS
    );
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, " ");
  }

  /**
   * Formula di Haversine.
   */
  private distanceMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6_371_000;

    const φ1 = this.toRadians(lat1);
    const φ2 = this.toRadians(lat2);

    const Δφ = this.toRadians(lat2 - lat1);
    const Δλ = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) *
        Math.cos(φ2) *
        Math.sin(Δλ / 2) ** 2;

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a),
      );

    return R * c;
  }

  private toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}