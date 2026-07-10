import { GeoPoint } from "../../../domain/GeoPoint";
import { DistanceCalculator } from "./DistanceCalculator";
/**
 * Implementazione del DistanceCalculator
 * basata sulla formula di Haversine.
 */
export declare class HaversineDistanceCalculator implements DistanceCalculator {
    private static readonly EARTH_RADIUS_METERS;
    calculate(from: GeoPoint, to: GeoPoint): number;
    private toRadians;
}
//# sourceMappingURL=HaversineDistanceCalculator.d.ts.map