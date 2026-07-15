"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationContext = void 0;
/**
 * ============================================================================
 * MODERATION CONTEXT
 * ----------------------------------------------------------------------------
 *
 * Contesto completo della moderazione.
 *
 * Raccoglie tutte le informazioni necessarie
 * al Moderation Engine.
 *
 * Il numero delle informazioni potrà crescere
 * senza modificare la firma del motore.
 * ============================================================================
 */
class ModerationContext {
    userContent;
    imageAnalysis;
    contentConsistency;
    constructor(userContent, imageAnalysis, contentConsistency) {
        this.userContent = userContent;
        this.imageAnalysis = imageAnalysis;
        this.contentConsistency = contentConsistency;
    }
}
exports.ModerationContext = ModerationContext;
//# sourceMappingURL=ModerationContext.js.map