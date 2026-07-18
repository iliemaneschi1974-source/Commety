import { ModerationMessage } from "@/services/moderation/ModerationMessage";

export class CommentSubmissionResult {
  private constructor(
    public readonly success: boolean,
    public readonly moderationMessage?: ModerationMessage
  ) {}

  static success(): CommentSubmissionResult {
    return new CommentSubmissionResult(true);
  }

  static failure(
    moderationMessage: ModerationMessage
  ): CommentSubmissionResult {
    return new CommentSubmissionResult(false, moderationMessage);
  }
}
