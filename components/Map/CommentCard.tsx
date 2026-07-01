"use client";

import { Trash2 } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Comment } from "@/types/comment";
import { formatRelativeDate } from "@/utils/formatRelativeDate";

interface CommentCardProps {
  comment: Comment;
  isMine: boolean;
  onDelete: () => void;
}

function getInitials(comment: Comment) {
  if (!comment.displayName) {
    return "A";
  }

  return comment.displayName
    .trim()
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CommentCard({
  comment,
  isMine,
  onDelete,
}: CommentCardProps) {
  const author =
    comment.displayName ?? "Anonimo";

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
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              {comment.avatarUrl && (
                <AvatarImage
                  src={comment.avatarUrl}
                  alt={author}
                />
              )}

              <AvatarFallback>
                {getInitials(comment)}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="text-sm font-semibold text-slate-800">
                {author}
              </div>

              <div className="text-xs text-slate-400">
                {comment.createdAt
                  ? formatRelativeDate(
                      comment.createdAt.toDate()
                    )
                  : ""}
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