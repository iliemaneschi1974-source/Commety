"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* ============================================================================
 * DOMAIN
 * ========================================================================== */
__exportStar(require("./domain/ImageAnalysis"), exports);
__exportStar(require("./domain/UserContent"), exports);
/* ============================================================================
 * MODERATION ENGINE
 * ========================================================================== */
__exportStar(require("./engines/moderation/ModerationEngine"), exports);
__exportStar(require("./engines/moderation/DefaultModerationEngine"), exports);
__exportStar(require("./engines/moderation/ModerationResult"), exports);
__exportStar(require("./engines/moderation/ModerationDecision"), exports);
__exportStar(require("./engines/moderation/ModerationEvidence"), exports);
__exportStar(require("./engines/moderation/ModerationPolicy"), exports);
__exportStar(require("./engines/moderation/DefaultModerationPolicy"), exports);
//# sourceMappingURL=index.js.map