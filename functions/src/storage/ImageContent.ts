/**
 * Contenuto binario di un'immagine
 * recuperata da Firebase Storage.
 *
 * Questo modello rappresenta il dato
 * grezzo indipendentemente dal provider AI.
 */
export interface ImageContent {

  /**
   * Mime type dell'immagine.
   */
  mimeType: string;

  /**
   * Contenuto binario originale.
   *
   * Verrà successivamente elaborato
   * (compressione, resize, EXIF stripping,
   * hashing, OCR locale, ecc.)
   * prima della codifica Base64.
   */
  bytes: Buffer;

}