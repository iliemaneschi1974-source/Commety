import { UserContent } from "@/core/domain/UserContent";
import { createComment } from "@/services/comments";
import { core } from "@/services/core";
import { CommentSubmissionResult } from "@/services/dto/CommentSubmissionResult";
import { ModerationMessageResolver } from "@/services/moderation/ModerationMessageResolver";
import { CreateCommentInput } from "@/types/comment";

const moderationMessageResolver =
  new ModerationMessageResolver();

/**
 * Modera il testo di un commento prima di salvarlo.
 */
export async function submitComment(
  input: CreateCommentInput
): Promise<CommentSubmissionResult> {
  const content = new UserContent(input.text, []);
  const moderationResult = core.moderate(content);

  if (moderationResult.isRejected()) {
    return CommentSubmissionResult.failure(
      moderationMessageResolver.resolve(
        moderationResult.evidences
      )
    );
  }

  await createComment(input);

  return CommentSubmissionResult.success();
}
