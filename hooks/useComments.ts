"use client";

import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

import {
  deleteComment,
  listenComments,
} from "@/services/comments";
import { submitComment } from "@/services/commentSubmission";

import { Comment } from "@/types/comment";

export function useComments(reportId?: string) {
  const { isAuthenticated, user } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!reportId) {
      return;
    }

    const unsubscribe = listenComments(
      reportId,
      setComments
    );

    return unsubscribe;
  }, [reportId]);

  const create = useCallback(
    async (text: string) => {
      if (!reportId || !text.trim()) {
        return;
      }

      setLoading(true);

      try {
        return await submitComment({
          reportId,
          text: text.trim(),

          ...(isAuthenticated && user
            ? {
                userId: user.uid,
                username: user.profile.username,
                displayName:
                  user.profile.displayName,
                avatarUrl:
                  user.profile.avatarUrl,
              }
            : {}),
        });
      } catch (error) {
        console.error(
          "Errore creazione commento:",
          error
        );
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [reportId, isAuthenticated, user]
  );

  const remove = useCallback(
    async (commentId: string) => {
      if (!reportId) {
        return;
      }

      try {
        await deleteComment(
          reportId,
          commentId
        );
      } catch (error) {
        console.error(
          "Errore eliminazione commento:",
          error
        );
      }
    },
    [reportId]
  );

  return {
    comments,
    loading,
    create,
    remove,
  };
}
