import { SpatialPolicy } from "./SpatialPolicy";

/**
 * Policy spaziale predefinita del dominio Commetty.
 *
 * Definisce il raggio di influenza delle principali
 * categorie di segnalazione.
 */
export class DefaultSpatialPolicy implements SpatialPolicy {
  private static readonly DEFAULT_RADIUS = 300;

  private static readonly INFLUENCE_RADII: Readonly<Record<string, number>> = {
    traffico: 300,
    pericolo: 500,
    meteo: 10_000,
    evento: 200,
    mare: 5_000,
  };

  getInfluenceRadius(category: string): number {
    return (
      DefaultSpatialPolicy.INFLUENCE_RADII[category] ??
      DefaultSpatialPolicy.DEFAULT_RADIUS
    );
  }
}