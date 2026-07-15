"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const DefaultModerationPolicy_1 = require("./DefaultModerationPolicy");
const ModerationEvidence_1 = require("./ModerationEvidence");
const policy = new DefaultModerationPolicy_1.DefaultModerationPolicy();
function evidenza(tipo) {
    return new ModerationEvidence_1.ModerationEvidence(tipo, "", 1, "TESTO");
}
(0, vitest_1.describe)("DefaultModerationPolicy", () => {
    (0, vitest_1.it)("approva quando non sono presenti evidenze", () => {
        (0, vitest_1.expect)(policy.valuta([]).isApprovato()).toBe(true);
    });
    (0, vitest_1.it)("rifiuta in presenza di una violazione bloccante", () => {
        (0, vitest_1.expect)(policy
            .valuta([
            evidenza("IMMAGINE_PORNOGRAFICA"),
        ])
            .isRifiutato()).toBe(true);
    });
    (0, vitest_1.it)("rifiuta in presenza di dati personali", () => {
        (0, vitest_1.expect)(policy
            .valuta([
            evidenza("DATI_PERSONALI_RILEVATI"),
        ])
            .isRifiutato()).toBe(true);
    });
    (0, vitest_1.it)("rifiuta il contenuto in presenza di un watermark", () => {
        (0, vitest_1.expect)(policy
            .valuta([
            evidenza("WATERMARK"),
        ])
            .isRifiutato()).toBe(true);
    });
    (0, vitest_1.it)("dà priorità alle violazioni bloccanti rispetto alle altre", () => {
        (0, vitest_1.expect)(policy
            .valuta([
            evidenza("WATERMARK"),
            evidenza("DATI_PERSONALI_RILEVATI"),
            evidenza("IMMAGINE_PORNOGRAFICA"),
        ])
            .isRifiutato()).toBe(true);
    });
    (0, vitest_1.it)("rifiuta quando sono presenti più violazioni bloccanti", () => {
        (0, vitest_1.expect)(policy
            .valuta([
            evidenza("WATERMARK"),
            evidenza("DATI_PERSONALI_RILEVATI"),
        ])
            .isRifiutato()).toBe(true);
    });
    (0, vitest_1.it)("richiede revisione manuale per un volto rilevato", () => {
        (0, vitest_1.expect)(policy
            .valuta([
            evidenza("VOLTO_RILEVATO"),
        ])
            .isRevisioneManuale()).toBe(true);
    });
    (0, vitest_1.it)("richiede revisione manuale per una targa rilevata", () => {
        (0, vitest_1.expect)(policy
            .valuta([
            evidenza("TARGA_RILEVATA"),
        ])
            .isRevisioneManuale()).toBe(true);
    });
    (0, vitest_1.it)("richiede revisione manuale per un possibile copyright", () => {
        (0, vitest_1.expect)(policy
            .valuta([
            evidenza("COPYRIGHT"),
        ])
            .isRevisioneManuale()).toBe(true);
    });
});
//# sourceMappingURL=DefaultModerationPolicy.test.js.map