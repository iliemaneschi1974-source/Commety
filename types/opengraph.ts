import { ReportCategory } from "./report";

/**
 * Modello utilizzato dall'Open Graph Engine
 * per rappresentare una segnalazione.
 *
 * Questo modello è volutamente indipendente
 * dal modello persistente (Report).
 *
 * Contiene esclusivamente le informazioni
 * necessarie al rendering della card Open Graph.
 */
export interface ReportOpenGraphModel {
  /**
   * Titolo della segnalazione.
   */
  readonly title: string;

  /**
   * Indirizzo o luogo della segnalazione.
   */
  readonly address: string;

  /**
   * Tempo già formattato.
   *
   * Esempio:
   * - "2 minuti fa"
   * - "1 ora fa"
   * - "Ieri"
   */
  readonly relativeTime: string;

  /**
   * Categoria della segnalazione.
   */
  readonly category: ReportCategory;

  /**
   * Foto della segnalazione o fotogramma del video usato come copertina.
   * Undefined per le segnalazioni esclusivamente testuali.
   */
  readonly mediaUrl?: string;

  readonly mediaType?: "photo" | "video";
}
