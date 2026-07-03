/**
 * ============================================================================
 * COMMETY CORE
 * Domain Model
 * ----------------------------------------------------------------------------
 * Assessment
 *
 * Un Assessment rappresenta una valutazione prodotta da un Engine.
 *
 * Gli Assessment:
 *
 * - NON modificano il dominio.
 * - NON rappresentano Decision.
 * - NON rappresentano Evidence.
 *
 * Costituiscono il linguaggio comune attraverso cui gli Engine
 * comunicano le proprie valutazioni al Core.
 * ============================================================================
 */

/**
 * Categoria dell'Assessment.
 */
export type AssessmentCategory =
  | "SOURCE"
  | "LANGUAGE"
  | "MEDIA"
  | "LOCATION"
  | "BEHAVIOR"
  | "CORRELATION";

/**
 * Esito della valutazione.
 */
export type AssessmentOutcome =
  | "POSITIVE"
  | "NEGATIVE"
  | "NEUTRAL";

/**
 * Livello di confidenza espresso dall'Engine.
 */
export type AssessmentConfidence =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

/**
 * Assessment
 */
export interface Assessment {

  /**
   * Identificatore stabile.
   */
  readonly id: string;

  /**
   * Categoria della valutazione.
   */
  readonly category: AssessmentCategory;

  /**
   * Esito della valutazione.
   */
  readonly outcome: AssessmentOutcome;

  /**
   * Livello di confidenza.
   */
  readonly confidence: AssessmentConfidence;

  /**
   * Motivazione leggibile della valutazione.
   *
   * Deve spiegare perché l'Assessment è stato prodotto.
   */
  readonly reason: string;

}