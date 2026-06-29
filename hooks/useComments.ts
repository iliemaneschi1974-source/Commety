"use client";

import { useCallback, useEffect, useState } from "react";

import {
  createComment,
  deleteComment,
  listenComments,
} from "@/services/comments";

import { Comment } from "@/types/comment";

export function useComments(reportId?: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!reportId) {
      setComments([]);
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
        await createComment({
          reportId,
          text: text.trim(),
        });
      } catch (error) {
        console.error("Errore creazione commento:", error);
      } finally {
        setLoading(false);
      }
    },
    [reportId]
  );

  const remove = useCallback(
    async (commentId: string) => {
      if (!reportId) {
        return;
      }

      try {
        await deleteComment(reportId, commentId);
      } catch (error) {
        console.error("Errore eliminazione commento:", error);
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