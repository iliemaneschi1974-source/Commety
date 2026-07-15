/**
 * Riferimento ad un'immagine
 * archiviata su Firebase Storage.
 */
export interface ReportImageReference {

  /**
   * Percorso dell'immagine
   * nello Storage.
   */
  storagePath: string;

  /**
   * URL pubblico utilizzato
   * dal frontend.
   */
  url: string;

}