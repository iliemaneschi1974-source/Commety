"use client";

import Link from "next/link";
import { ArrowLeft, Ban, Check, MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import {
  getChatInbox,
  getChatMessages,
  openChat,
  reportAndBlockChatUser,
  respondToChatRequest,
  sendChatMessage,
} from "@/services/chat";
import { ChatMessage, ChatThread } from "@/types/chat";

function formatTime(value?: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatLastActivity(value?: string) {
  if (!value) return "Nuova conversazione";

  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "short",
  }).format(new Date(value));
}

export default function ChatClient({
  recipientId,
}: {
  recipientId?: string;
}) {
  const { loading, user } = useAuth();
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const loadInbox = useCallback(async () => {
    if (!user) return;

    try {
      setThreads(await getChatInbox());
    } catch (nextError) {
      console.error("Errore caricamento chat:", nextError);
      setError("Non è stato possibile caricare i messaggi.");
    }
  }, [user]);

  const loadMessages = useCallback(async (threadId: string) => {
    try {
      setMessages(await getChatMessages(threadId));
    } catch (nextError) {
      console.error("Errore caricamento conversazione:", nextError);
      setError("Non è stato possibile caricare la conversazione.");
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadInbox();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadInbox]);

  useEffect(() => {
    if (!recipientId || !user || recipientId === user.uid) return;

    void (async () => {
      try {
        const thread = await openChat(recipientId);
        setActiveThread(thread);
        await Promise.all([loadInbox(), loadMessages(thread.id)]);
      } catch (nextError) {
        console.error("Errore apertura conversazione:", nextError);
        setError("Non è stato possibile aprire questa conversazione.");
      }
    })();
  }, [recipientId, user, loadInbox, loadMessages]);

  useEffect(() => {
    if (!activeThread) return;

    const refresh = () => {
      void loadMessages(activeThread.id);
      void loadInbox();
    };
    const interval = window.setInterval(refresh, 8_000);

    return () => window.clearInterval(interval);
  }, [activeThread, loadInbox, loadMessages]);

  const title = useMemo(
    () => activeThread?.participant.displayName ?? "Messaggi",
    [activeThread]
  );
  const requestFromMe = activeThread?.requestedBy === user?.uid;
  const canRespondToRequest =
    activeThread?.status === "REQUESTED" && !requestFromMe;
  const canSendMessages = activeThread?.status === "ACCEPTED";

  async function handleSelectThread(thread: ChatThread) {
    setError("");
    setActiveThread(thread);
    await loadMessages(thread.id);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!activeThread || !text.trim() || busy) return;

    try {
      setBusy(true);
      setError("");
      const result = await sendChatMessage(activeThread.id, text.trim());

      if (!result.sent) {
        setError(result.error ?? "Il messaggio non è stato inviato.");
        return;
      }

      setText("");
      await Promise.all([loadMessages(activeThread.id), loadInbox()]);
    } catch (nextError) {
      console.error("Errore invio messaggio:", nextError);
      setError("Il messaggio non è stato inviato. Riprova tra poco.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRequestResponse(response: "accept" | "reject") {
    if (!activeThread) return;

    try {
      setBusy(true);
      setError("");
      await respondToChatRequest(activeThread.id, response);
      const refreshed = await openChat(activeThread.participant.uid);
      setActiveThread(refreshed);
      await loadInbox();
    } catch (nextError) {
      console.error("Errore risposta richiesta chat:", nextError);
      setError("Non è stato possibile aggiornare la richiesta.");
    } finally {
      setBusy(false);
    }
  }

  async function handleReportAndBlock() {
    if (
      !activeThread ||
      !window.confirm(
        "Vuoi segnalare e bloccare questo utente? Non potrà più contattarti."
      )
    ) return;

    try {
      setBusy(true);
      await reportAndBlockChatUser(activeThread.id);
      setActiveThread(null);
      setMessages([]);
      await loadInbox();
    } catch (nextError) {
      console.error("Errore blocco utente:", nextError);
      setError("Non è stato possibile bloccare questo utente.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <main className="p-8 text-center text-slate-500">Caricamento messaggi...</main>;
  }

  if (!user) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-4 p-6 text-center">
        <MessageCircle className="size-12 text-[#1b4b87]" />
        <h1 className="text-2xl font-bold text-[#0F2D5F]">Messaggi privati</h1>
        <p className="text-slate-600">Accedi per conversare con gli altri utenti registrati di Commety.</p>
        <Link href="/mappa" className="rounded-xl bg-[#0F2D5F] px-5 py-3 font-bold text-white">Torna alla mappa</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#3b67a2_0%,#0F2D5F_34%,#071a3c_100%)] p-3 text-white sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#071a3c]/70 shadow-[0_24px_70px_rgba(2,12,34,0.45)] backdrop-blur-xl md:grid-cols-[330px_1fr]">
        <aside className={`${activeThread ? "hidden md:block" : "block"} border-b border-white/10 md:border-b-0 md:border-r`}>
          <div className="border-b border-white/10 p-5">
            <Link href="/mappa" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white">
              <ArrowLeft className="size-4" /> Mappa
            </Link>
            <h1 className="mt-5 text-2xl font-bold">Messaggi</h1>
            <p className="mt-1 text-sm text-white/70">Solo tra utenti registrati</p>
          </div>

          <div className="max-h-[calc(100vh-190px)] overflow-y-auto p-3">
            {threads.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/25 p-5 text-center text-sm leading-6 text-white/70">
                Le tue conversazioni appariranno qui. Puoi iniziarne una dal commento di un utente registrato.
              </div>
            ) : threads.map((thread) => (
              <button key={thread.id} type="button" onClick={() => void handleSelectThread(thread)} className={`mb-2 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${activeThread?.id === thread.id ? "bg-white/15" : "hover:bg-white/10"}`}>
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15 font-bold">{thread.participant.displayName.slice(0, 1).toUpperCase()}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{thread.participant.displayName}</p>
                  <p className="truncate text-sm text-white/65">{thread.status === "REQUESTED" ? thread.requestedBy === user.uid ? "Richiesta inviata" : "Nuova richiesta di chat" : thread.status === "REJECTED" ? "Richiesta non accettata" : thread.lastMessage ?? "Inizia la conversazione"}</p>
                </div>
                <span className="text-xs text-white/55">{formatLastActivity(thread.lastMessageAt)}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className={`${activeThread ? "flex" : "hidden md:flex"} min-h-0 flex-col`}>
          {activeThread ? <>
            <header className="flex items-center gap-3 border-b border-white/10 p-5">
              <button type="button" onClick={() => setActiveThread(null)} className="md:hidden"><ArrowLeft className="size-5" /></button>
              <div className="flex size-11 items-center justify-center rounded-full bg-emerald-400 font-bold text-[#0F2D5F]">{title.slice(0, 1).toUpperCase()}</div>
              <div className="min-w-0 flex-1"><h2 className="truncate font-bold">{title}</h2><p className="text-sm text-emerald-200">Utente registrato</p></div>
              <button type="button" onClick={() => void handleReportAndBlock()} disabled={busy} title="Segnala e blocca utente" className="flex size-10 items-center justify-center rounded-xl text-red-200 transition hover:bg-red-500/20 disabled:opacity-50"><Ban className="size-5" /></button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {messages.length === 0 ? <p className="pt-16 text-center text-sm text-white/60">Scrivi il primo messaggio. Mantieni la conversazione rispettosa.</p> : messages.map((message) => {
                const mine = message.senderId === user.uid;
                return <div key={message.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}><div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm shadow-lg ${mine ? "rounded-br-md bg-emerald-400 text-[#062b20]" : "rounded-bl-md bg-white/12 text-white"}`}><p className="whitespace-pre-wrap">{message.text}</p><p className={`mt-1 text-right text-[10px] ${mine ? "text-[#062b20]/65" : "text-white/55"}`}>{formatTime(message.createdAt)}</p></div></div>;
              })}
            </div>

            {canRespondToRequest ? <div className="border-t border-white/10 p-5 text-center"><p className="text-sm text-white/75">{title} vuole avviare una conversazione con te.</p><div className="mt-4 flex gap-3"><button type="button" disabled={busy} onClick={() => void handleRequestResponse("reject")} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 font-bold text-white transition hover:bg-red-400 disabled:opacity-50"><X className="size-4" /> Rifiuta</button><button type="button" disabled={busy} onClick={() => void handleRequestResponse("accept")} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-400 font-bold text-[#062b20] transition hover:bg-emerald-300 disabled:opacity-50"><Check className="size-4" /> Accetta</button></div></div> : !canSendMessages ? <div className="border-t border-white/10 p-5 text-center text-sm text-white/70">{activeThread?.status === "REJECTED" ? "Questa richiesta non è stata accettata." : "Richiesta inviata. Potrai scrivere solo dopo l'accettazione."}</div> : <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
              {error ? <p role="alert" className="mb-3 text-center text-sm text-red-300">{error}</p> : null}
              <div className="flex items-end gap-3"><textarea value={text} maxLength={500} onChange={(event) => setText(event.target.value)} placeholder="Scrivi un messaggio..." rows={2} className="min-h-12 flex-1 resize-none rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/45 focus:border-emerald-300" /><button disabled={busy || !text.trim()} className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-[#062b20] transition hover:bg-emerald-300 disabled:opacity-50" aria-label="Invia messaggio"><Send className="size-5" /></button></div>
              <p className="mt-2 text-right text-xs text-white/45">{text.length}/500</p>
            </form>}
          </> : <div className="m-auto max-w-sm p-8 text-center"><MessageCircle className="mx-auto size-12 text-emerald-300" /><h2 className="mt-5 text-2xl font-bold">Le tue conversazioni</h2><p className="mt-2 text-white/70">Seleziona una chat oppure avviane una dai commenti sulla mappa.</p></div>}
        </section>
      </div>
    </main>
  );
}
