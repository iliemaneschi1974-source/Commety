/**
 * ============================================================================
 * APPLICATION LAYER
 * ----------------------------------------------------------------------------
 * ModerationMessage
 *
 * Rappresenta un messaggio destinato
 * all'interfaccia utente.
 *
 * Questo oggetto NON appartiene al dominio.
 * È una traduzione delle evidenze di moderazione
 * in un formato comprensibile dall'utente.
 * ============================================================================
 */
export class ModerationMessage {
  constructor(
    /**
     * Titolo del messaggio.
     */
    public readonly title: string,

    /**
     * Descrizione dettagliata.
     */
    public readonly description: string
  ) {}
}