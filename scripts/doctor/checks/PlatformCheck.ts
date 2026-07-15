import { PlatformCheckResult } from "../model/PlatformCheckResult";

/**
 * ============================================================================
 * PLATFORM CHECK
 * ----------------------------------------------------------------------------
 *
 * Contratto implementato da tutti i controlli
 * del Platform Doctor.
 *
 * Ogni implementazione verifica un singolo
 * aspetto della piattaforma.
 *
 * Ogni controllo deve essere indipendente
 * dagli altri.
 * ============================================================================
 */
export interface PlatformCheck {

  /**
   * Nome del controllo.
   */
  readonly name: string;

  /**
   * Esegue il controllo.
   */
  execute(): PlatformCheckResult;

}