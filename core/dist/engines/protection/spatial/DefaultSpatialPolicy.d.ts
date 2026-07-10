import { SpatialPolicy } from "./SpatialPolicy";
/**
 * Policy spaziale predefinita del dominio Commetty.
 *
 * Definisce il raggio di influenza delle principali
 * categorie di segnalazione.
 */
export declare class DefaultSpatialPolicy implements SpatialPolicy {
    private static readonly DEFAULT_RADIUS;
    private static readonly INFLUENCE_RADII;
    getInfluenceRadius(category: string): number;
}
//# sourceMappingURL=DefaultSpatialPolicy.d.ts.map