import { CommettyCore } from "@/core/application/CommettyCore";

/**
 * Istanza condivisa del Commetty Core.
 *
 * Tutti gli Application Service devono
 * utilizzare questa istanza per accedere
 * alle capability del Core.
 */
export const core = new CommettyCore();