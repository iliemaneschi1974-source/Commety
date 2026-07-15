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
export class ImageModerationThresholds {

  /**
   * Probabilità minima per considerare
   * un'immagine come screenshot.
   */
  public static readonly SCREENSHOT = 0.80;

  /**
   * Probabilità minima per considerare
   * presente un watermark.
   */
  public static readonly WATERMARK = 0.80;

  /**
   * Probabilità minima per classificare
   * un'immagine come meme.
   */
  public static readonly MEME = 0.80;

  /**
   * Probabilità minima per classificare
   * un'immagine come generata da IA.
   */
  public static readonly AI_GENERATED = 0.80;

  /**
   * Probabilità minima per classificare
   * contenuti pornografici.
   */
  public static readonly PORNOGRAFIA = 0.90;

  /**
   * Probabilità minima per classificare
   * contenuti con nudità.
   */
  public static readonly NUDITA = 0.85;

  /**
   * Probabilità minima per classificare
   * contenuti violenti.
   */
  public static readonly VIOLENZA = 0.85;

  /**
   * Probabilità minima per classificare
   * presenza di sangue.
   */
  public static readonly GORE = 0.85;

  /**
   * Probabilità minima per classificare
   * la presenza di armi.
   */
  public static readonly ARMI = 0.85;

  /**
   * Probabilità minima per classificare
   * maltrattamenti verso animali.
   */
  public static readonly ANIMAL_CRUELTY = 0.85;

  /**
   * Probabilità minima per classificare
   * la presenza di uno o più volti.
   */
  public static readonly VOLTI = 0.85;

  /**
   * Probabilità minima per classificare
   * la presenza di una o più targhe.
   */
  public static readonly TARGHE = 0.85;

  /**
   * Probabilità minima per classificare
   * la presenza di documenti.
   */
  public static readonly DOCUMENTI = 0.85;
    /**
   * Probabilità minima affinché
   * un'immagine sia considerata
   * semanticamente coerente con
   * titolo e descrizione del report.
   *
   * Valori inferiori producono
   * un'evidenza di immagine non coerente.
   */
  public static readonly IMAGE_CONSISTENCY = 0.70;

  private constructor() {
    // Classe di utilità.
  }

}