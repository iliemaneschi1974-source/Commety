/**
 * Definisce il raggio di influenza delle categorie
 * del dominio Commetty.
 *
 * Il valore restituito è espresso in metri.
 */
export interface SpatialPolicy {
  /**
   * Restituisce il raggio di influenza della categoria.
   *
   * @param category Categoria della segnalazione.
   * @returns Raggio di influenza espresso in metri.
   */
  getInfluenceRadius(category: string): number;
}