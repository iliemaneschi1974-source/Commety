import { describe, expect, it } from "vitest";

import { CommentSubmissionResult } from "../dto/CommentSubmissionResult";
import { ModerationMessage } from "../moderation/ModerationMessage";

describe("CommentSubmissionResult", () => {
  it("rappresenta un commento approvato", () => {
    expect(CommentSubmissionResult.success().success).toBe(true);
  });

  it("restituisce il messaggio della moderazione", () => {
    const message = new ModerationMessage("Testo non valido", "Correggi il commento.");
    const result = CommentSubmissionResult.failure(message);

    expect(result.success).toBe(false);
    expect(result.moderationMessage).toBe(message);
  });
});
