"use client";

import { KeyboardEvent, useState } from "react";

import CommentCard from "@/components/Map/CommentCard";
import { Button } from "@/components/ui/button";
import { useComments } from "@/hooks/useComments";
import { getDeviceId } from "@/services/device";

interface CommentsProps {
  reportId: string;
}

export default function Comments({
  reportId,
}: CommentsProps) {
  const {
    comments,
    loading,
    create,
    remove,
  } = useComments(reportId);

  const [text, setText] = useState("");

  const deviceId = getDeviceId();

  async function handleSubmit() {
    const value = text.trim();

    if (!value) return;

    await create(value);

    setText("");
  }

  async function handleDelete(commentId: string) {
    const confirmed = window.confirm(
      "Vuoi eliminare questo commento?"
    );

    if (!confirmed) {
      return;
    }

    await remove(commentId);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        💬 Commenti
      </h3>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500">
            Nessun commento.
            <br />
            Sii il primo a contribuire.
          </div>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              isMine={comment.deviceId === deviceId}
              onDelete={() => handleDelete(comment.id)}
            />
          ))
        )}
      </div>

      <div className="mt-5 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scrivi un commento..."
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#2563FF] focus:ring-2 focus:ring-[#2563FF]/20"
        />

        <Button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
        >
          {loading ? "Invio..." : "Invia"}
        </Button>
      </div>
    </div>
  );
}