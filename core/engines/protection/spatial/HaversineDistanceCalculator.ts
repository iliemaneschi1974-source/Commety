import { GeoPoint } from "../../../domain/GeoPoint";
import { DistanceCalculator } from "./DistanceCalculator";

/**
 * Implementazione del DistanceCalculator
 * basata sulla formula di Haversine.
 */
export class HaversineDistanceCalculator
  implements DistanceCalculator
{
  private static readonly EARTH_RADIUS_METERS = 6_371_000;

  calculate(
    from: GeoPoint,
    to: GeoPoint,
  ): number {
    const latitudeDelta = this.toRadians(
      to.latitude - from.latitude,
    );

    const longitudeDelta = this.toRadians(
      to.longitude - from.longitude,
    );

    const fromLatitude = this.toRadians(from.latitude);
    const toLatitude = this.toRadians(to.latitude);

    const a =
      Math.sin(latitudeDelta / 2) ** 2 +
      Math.cos(fromLatitude) *
        Math.cos(toLatitude) *
        Math.sin(longitudeDelta / 2) ** 2;

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a),
      );

    return (
      HaversineDistanceCalculator.EARTH_RADIUS_METERS * c
    );
  }

  private toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}