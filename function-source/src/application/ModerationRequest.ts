import { OpenAIImageAnalysisResponse } from "../ai/dto/OpenAIImageAnalysisResponse";

/**
 * ============================================================================
 * MODERATION REQUEST
 * ----------------------------------------------------------------------------
 *
 * Rappresenta tutti i dati necessari per avviare
 * una moderazione completa di una segnalazione.
 *
 * È un DTO dell'Application Layer e disaccoppia
 * il ModerationService dall'infrastruttura
 * (Firestore, Trigger, Provider AI).
 * ============================================================================
 */
export class ModerationRequest {

  constructor(

    /**
     * Categoria della segnalazione.
     */
    public readonly category: string,

    /**
     * Titolo della segnalazione.
     */
    public readonly title: string,

    /**
     * Descrizione della segnalazione.
     */
    public readonly description: string,

    /**
     * URL delle immagini della segnalazione.
     */
    public readonly images: readonly string[],

    /**
     * Analisi AI prodotta dal provider.
     */
    public readonly analysis: OpenAIImageAnalysisResponse

  ) {}

}