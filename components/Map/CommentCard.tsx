"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Comment } from "@/types/comment";

interface CommentCardProps {
  comment: Comment;
  isMine: boolean;
  onDelete: () => void;
}

function formatDate(comment: Comment) {
  if (!comment.createdAt) {
    return "";
  }

  const date = comment.createdAt.toDate();
  const today = new Date();

  const isToday =
    date.toDateString() === today.toDateString();

  if (isToday) {
    return date.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
    }) +
    " • " +
    date.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

export default function CommentCard({
  comment,
  isMine,
  onDelete,
}: CommentCardProps) {
  return (
    <div
      className={`flex ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl border p-4 shadow-sm transition-shadow hover:shadow-md ${
          isMine
            ? "border-blue-200 bg-blue-50"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="mb-3 flex items-start justify-between gap-4">

          <div className="flex items-center gap-2">

            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${
                isMine
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {isMine ? "T" : "A"}
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {isMine ? "Tu" : "Anonimo"}
              </div>

              <div className="text-xs text-slate-400">
                {formatDate(comment)}
              </div>
            </div>

          </div>

          {isMine && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onDelete}
              title="Elimina commento"
            >
              <Trash2 className="size-4" />
            </Button>
          )}

        </div>

        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
          {comment.text}
        </p>
      </div>
    </div>
  );
}