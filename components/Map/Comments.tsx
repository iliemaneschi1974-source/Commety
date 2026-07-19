"use client";

import { Send } from "lucide-react";
import { KeyboardEvent, useState } from "react";

import CommentCard from "@/components/Map/CommentCard";
import { Button } from "@/components/ui/button";
import MessageDialog from "@/components/ui/MessageDialog";
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
  const [moderationMessage, setModerationMessage] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const deviceId = getDeviceId();

  async function handleSubmit() {
    const value = text.trim();

    if (!value) return;

    const result = await create(value);

    if (!result?.success) {
      if (result?.moderationMessage) {
        setModerationMessage({
          title: result.moderationMessage.title,
          description: result.moderationMessage.description,
        });
      }
      return;
    }

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

      <div className="mt-5 space-y-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scrivi un commento..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#2563FF] focus:ring-2 focus:ring-[#2563FF]/20"
        />

        <Button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="h-12 w-full bg-emerald-500 text-base font-bold text-white hover:bg-emerald-600 disabled:bg-emerald-700/70"
        >
          <Send className="size-4" />
          {loading ? "Invio..." : "Pubblica commento"}
        </Button>
      </div>

      <MessageDialog
        open={moderationMessage !== null}
        title={moderationMessage?.title ?? "Commento non pubblicato"}
        message={
          moderationMessage?.description ??
          "Il commento non rispetta le regole della community."
        }
        onClose={() => setModerationMessage(null)}
      />
    </div>
  );
}
