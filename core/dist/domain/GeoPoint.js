"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sameGeoPoint = sameGeoPoint;
/**
 * Confronta due punti geografici.
 */
function sameGeoPoint(first, second) {
    return (first.latitude === second.latitude &&
        first.longitude === second.longitude);
}
//# sourceMappingURL=GeoPoint.js.map