"use client";

import { useState } from "react";

import { useComments } from "@/hooks/useComments";

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
  } = useComments(reportId);

  const [text, setText] = useState("");

  async function handleSubmit() {
    if (!text.trim()) {
      return;
    }

    await create(text);

    setText("");
  }

  return (
    <div className="mt-6">

      <h3 className="mb-3 text-lg font-semibold">
        Commenti
      </h3>

      <div className="space-y-3">

        {comments.length === 0 ? (
          <p className="text-sm text-slate-500">
            Nessun commento.
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border bg-white p-3"
            >
              <p className="text-sm text-slate-800">
                {comment.text}
              </p>
            </div>
          ))
        )}

      </div>

      <div className="mt-4 flex gap-2">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Scrivi un commento..."
          className="flex-1 rounded-xl border px-3 py-2 outline-none focus:border-blue-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-[#2563FF] px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "..." : "Invia"}
        </button>

      </div>

    </div>
  );
}