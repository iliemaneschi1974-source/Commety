"use strict";
/**
 * ============================================================================
 * COMMETY CORE
 * Application Layer
 * ----------------------------------------------------------------------------
 * CommettyCore
 *
 * Punto di ingresso ufficiale del Commetty Core.
 *
 * Tutte le richieste verso il Core devono passare da questa classe.
 *
 * Responsabilità:
 * - Ricevere le richieste dell'applicazione.
 * - Orchestrare gli Engine.
 * - Esporre le capability del Core.
 *
 * Non contiene logiche di business.
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommettyCore = void 0;
const DefaultProtectionEngine_1 = require("../engines/protection/DefaultProtectionEngine");
const DefaultModerationEngine_1 = require("../engines/moderation/DefaultModerationEngine");
const DefaultModerationPolicy_1 = require("../engines/moderation/DefaultModerationPolicy");
class CommettyCore {
    protectionEngine;
    moderationEngine;
    constructor(protectionEngine = new DefaultProtectionEngine_1.DefaultProtectionEngine(), moderationEngine = new DefaultModerationEngine_1.DefaultModerationEngine(new DefaultModerationPolicy_1.DefaultModerationPolicy())) {
        this.protectionEngine = protectionEngine;
        this.moderationEngine = moderationEngine;
    }
    /**
     * Entry point storico del Protection Engine.
     * Mantenuto per retrocompatibilità.
     */
    async process(observation) {
        return this.protectionEngine.analyze(observation);
    }
    /**
     * Entry point del Moderation Engine.
     */
    moderate(contenuto, immagine) {
        return this.moderationEngine.modera(contenuto, immagine);
    }
}
exports.CommettyCore = CommettyCore;
//# sourceMappingURL=CommettyCore.js.map