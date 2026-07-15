/**
 * Definisce le soglie utilizzate dalle ImageRule
 * per interpretare i risultati prodotti
 * dall'Image Analysis Engine.
 *
 * Tutti i valori rappresentano una probabilità
 * compresa tra 0.0 e 1.0.
 *
 * Centralizzare le soglie evita la presenza
 * di numeri magici all'interno delle regole
 * e rende il comportamento del motore uniforme.
 */
export declare class ImageModerationThresholds {
    /**
     * Probabilità minima per considerare
     * un'immagine come screenshot.
     */
    static readonly SCREENSHOT = 0.8;
    /**
     * Probabilità minima per considerare
     * presente un watermark.
     */
    static readonly WATERMARK = 0.8;
    /**
     * Probabilità minima per classificare
     * un'immagine come meme.
     */
    static readonly MEME = 0.8;
    /**
     * Probabilità minima per classificare
     * un'immagine come generata da IA.
     */
    static readonly AI_GENERATED = 0.8;
    /**
     * Probabilità minima per classificare
     * contenuti pornografici.
     */
    static readonly PORNOGRAFIA = 0.9;
    /**
     * Probabilità minima per classificare
     * contenuti con nudità.
     */
    static readonly NUDITA = 0.85;
    /**
     * Probabilità minima per classificare
     * contenuti violenti.
     */
    static readonly VIOLENZA = 0.85;
    /**
     * Probabilità minima per classificare
     * presenza di sangue.
     */
    static readonly GORE = 0.85;
    /**
     * Probabilità minima per classificare
     * la presenza di armi.
     */
    static readonly ARMI = 0.85;
    /**
     * Probabilità minima per classificare
     * maltrattamenti verso animali.
     */
    static readonly ANIMAL_CRUELTY = 0.85;
    /**
     * Probabilità minima per classificare
     * la presenza di uno o più volti.
     */
    static readonly VOLTI = 0.85;
    /**
     * Probabilità minima per classificare
     * la presenza di una o più targhe.
     */
    static readonly TARGHE = 0.85;
    /**
     * Probabilità minima per classificare
     * la presenza di documenti.
     */
    static readonly DOCUMENTI = 0.85;
    /**
   * Probabilità minima affinché
   * un'immagine sia considerata
   * semanticamente coerente con
   * titolo e descrizione del report.
   *
   * Valori inferiori producono
   * un'evidenza di immagine non coerente.
   */
    static readonly IMAGE_CONSISTENCY = 0.7;
    private constructor();
}
//# sourceMappingURL=ImageModerationThresholds.d.ts.map