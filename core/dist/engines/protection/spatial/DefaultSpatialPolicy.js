"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSpatialPolicy = void 0;
/**
 * Policy spaziale predefinita del dominio Commetty.
 *
 * Definisce il raggio di influenza delle principali
 * categorie di segnalazione.
 */
class DefaultSpatialPolicy {
    static DEFAULT_RADIUS = 300;
    static INFLUENCE_RADII = {
        traffico: 300,
        pericolo: 500,
        meteo: 10_000,
        evento: 200,
        mare: 5_000,
    };
    getInfluenceRadius(category) {
        return (DefaultSpatialPolicy.INFLUENCE_RADII[category] ??
            DefaultSpatialPolicy.DEFAULT_RADIUS);
    }
}
exports.DefaultSpatialPolicy = DefaultSpatialPolicy;
//# sourceMappingURL=DefaultSpatialPolicy.js.map