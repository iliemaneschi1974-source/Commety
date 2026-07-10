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
export declare function sameGeoPoint(first: GeoPoint, second: GeoPoint): boolean;
//# sourceMappingURL=GeoPoint.d.ts.map