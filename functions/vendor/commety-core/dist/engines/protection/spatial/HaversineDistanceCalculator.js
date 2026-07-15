"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaversineDistanceCalculator = void 0;
/**
 * Implementazione del DistanceCalculator
 * basata sulla formula di Haversine.
 */
class HaversineDistanceCalculator {
    static EARTH_RADIUS_METERS = 6_371_000;
    calculate(from, to) {
        const latitudeDelta = this.toRadians(to.latitude - from.latitude);
        const longitudeDelta = this.toRadians(to.longitude - from.longitude);
        const fromLatitude = this.toRadians(from.latitude);
        const toLatitude = this.toRadians(to.latitude);
        const a = Math.sin(latitudeDelta / 2) ** 2 +
            Math.cos(fromLatitude) *
                Math.cos(toLatitude) *
                Math.sin(longitudeDelta / 2) ** 2;
        const c = 2 *
            Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (HaversineDistanceCalculator.EARTH_RADIUS_METERS * c);
    }
    toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
}
exports.HaversineDistanceCalculator = HaversineDistanceCalculator;
//# sourceMappingURL=HaversineDistanceCalculator.js.map