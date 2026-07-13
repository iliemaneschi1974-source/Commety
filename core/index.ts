/**
 * ============================================================================
 * COMMETTY CORE
 * ----------------------------------------------------------------------------
 *
 * Entry point pubblico della libreria Core.
 *
 * Espone esclusivamente le classi e i contratti
 * destinati ad essere utilizzati dall'esterno.
 *
 * Le implementazioni interne rimangono
 * incapsulate all'interno del Core.
 * ============================================================================
 */

/* ============================================================================
 * DOMAIN
 * ========================================================================== */

export * from "./domain/ImageAnalysis";
export * from "./domain/UserContent";
export * from "./domain/ContentConsistencyAnalysis";

/* ============================================================================
 * MODERATION ENGINE
 * ========================================================================== */

export * from "./engines/moderation/ModerationEngine";
export * from "./engines/moderation/DefaultModerationEngine";
export * from "./engines/moderation/ModerationContext";
export * from "./engines/moderation/ModerationResult";
export * from "./engines/moderation/ModerationDecision";
export * from "./engines/moderation/ModerationEvidence";
export * from "./engines/moderation/ModerationPolicy";
export * from "./engines/moderation/DefaultModerationPolicy";