import { GeoPoint } from "@/core/domain/GeoPoint";

/**
 * Servizio di dominio per il calcolo della distanza
 * tra due punti geografici.
 *
 * Il valore restituito è espresso in metri.
 */
export interface DistanceCalculator {
  calculate(
    from: GeoPoint,
    to: GeoPoint,
  ): number;
}