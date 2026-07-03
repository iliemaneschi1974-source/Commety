/**
 * Punto geografico espresso in coordinate WGS84.
 *
 * Value Object del dominio Commetty.
 */
export interface GeoPoint {
  readonly latitude: number;
  readonly longitude: number;
}

/**
 * Confronta due punti geografici.
 */
export function sameGeoPoint(
  first: GeoPoint,
  second: GeoPoint,
): boolean {
  return (
    first.latitude === second.latitude &&
    first.longitude === second.longitude
  );
}