"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDuplicateDetector = void 0;
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
class DefaultDuplicateDetector {
    /**
     * Distanza massima (metri) tra due report
     * affinché possano essere considerati lo stesso evento.
     */
    static MAX_DISTANCE_METERS = 100;
    /**
     * Differenza temporale massima (millisecondi).
     * 30 minuti.
     */
    static MAX_TIME_DIFFERENCE_MS = 30 * 60 * 1000;
    analyze(candidate, nearbyReports) {
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
    sameCategory(a, b) {
        return a.category === b.category;
    }
    sameTitle(a, b) {
        return this.normalize(a.title) === this.normalize(b.title);
    }
    withinTimeWindow(a, b) {
        return (Math.abs(a.occurredAt.getTime() - b.occurredAt.getTime()) <= DefaultDuplicateDetector.MAX_TIME_DIFFERENCE_MS);
    }
    withinDistance(a, b) {
        return (this.distanceMeters(a.latitude, a.longitude, b.latitude, b.longitude) <= DefaultDuplicateDetector.MAX_DISTANCE_METERS);
    }
    normalize(value) {
        return value.trim().toLowerCase().replace(/\s+/g, " ");
    }
    /**
     * Formula di Haversine.
     */
    distanceMeters(lat1, lon1, lat2, lon2) {
        const R = 6_371_000;
        const φ1 = this.toRadians(lat1);
        const φ2 = this.toRadians(lat2);
        const Δφ = this.toRadians(lat2 - lat1);
        const Δλ = this.toRadians(lon2 - lon1);
        const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) *
                Math.cos(φ2) *
                Math.sin(Δλ / 2) ** 2;
        const c = 2 *
            Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
}
exports.DefaultDuplicateDetector = DefaultDuplicateDetector;
//# sourceMappingURL=DefaultDuplicateDetector.js.map