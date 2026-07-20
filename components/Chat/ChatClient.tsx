"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Ban, Check, MessageCircle, Send, Trash2, X } from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import {
  getChatInbox,
  getChatMessages,
  deleteChatThread,
  openChat,
  reportAndBlockChatUser,
  respondToChatRequest,
  sendChatMessage,
} from "@/services/chat";
import { ChatMessage, ChatThread } from "@/types/chat";
import CallPanel from "@/components/Chat/CallPanel";

function formatTime(value?: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatLastActivity(value?: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "short",
  }).format(new Date(value));
}

function ChatAvatar({
  name,
  avatarUrl,
  className = "size-11",
}: {
  name: string;
  avatarUrl?: string;
  className?: string;
}) {
  return (
    <div className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 font-bold ${className}`}>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={name}
          fill
          sizes="56px"
          className="object-cover"
        />
      ) : (
        name.slice(0, 1).toUpperCase()
      )}
    </div>
  );
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
      const nextThreads = await getChatInbox();
      setThreads(nextThreads);
      setActiveThread((currentThread) => {
        if (!currentThread) return null;

        return nextThreads.find(
          (thread) => thread.id === currentThread.id
        ) ?? currentThread;
      });
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

  async function handleTerminateChat() {
    if (
      !activeThread ||
      !window.confirm(
        "Vuoi terminare questa chat? La conversazione e tutti i messaggi verranno eliminati definitivamente per entrambi gli utenti."
      )
    ) return;

    try {
      setBusy(true);
      setError("");
      await deleteChatThread(activeThread.id);
      setActiveThread(null);
      setMessages([]);
      await loadInbox();
    } catch (nextError) {
      console.error("Errore eliminazione chat:", nextError);
      setError("Non è stato possibile terminare la chat.");
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
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-6 pb-28">
      <header className="relative overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_38%,#1b4b87_58%,#0a2553_100%)] p-6 text-center text-white shadow-[0_18px_45px_rgba(6,24,61,0.32)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.2)_48%,transparent_62%)] sm:p-8">
        <div className="relative z-10"><Image src="/logo-header-cropped.png" alt="Commety" width={180} height={48} priority className="mx-auto h-11 w-auto object-contain [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.75))_drop-shadow(0_6px_8px_rgba(2,16,42,0.7))]" /><div className="mt-5 flex flex-col items-center"><span className="flex size-11 items-center justify-center rounded-full bg-white/15"><MessageCircle className="size-5 text-emerald-300" /></span><h1 className="mt-3 text-3xl font-bold tracking-tight">Messaggi</h1><p className="mt-1 text-sm text-white/80">Conversazioni private della community</p></div></div>
      </header>

      <div className="grid min-h-[calc(100vh-27rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-[290px_1fr]">
        <aside className={`${activeThread ? "hidden md:block" : "block"} border-b border-slate-200 bg-white md:border-b-0 md:border-r`}>
          <div className="border-b border-slate-100 px-5 py-4"><h2 className="font-bold text-[#0F2D5F]">Le tue conversazioni</h2><p className="mt-1 text-sm text-slate-500">Utenti registrati di Commety</p></div>

          <div className="max-h-[calc(100vh-190px)] overflow-y-auto p-3">
            {threads.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm leading-6 text-slate-500">
                Le tue conversazioni appariranno qui. Puoi iniziarne una dal profilo o dal commento di un utente registrato.
              </div>
            ) : threads.map((thread) => (
              <button key={thread.id} type="button" onClick={() => void handleSelectThread(thread)} className={`mb-2 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${activeThread?.id === thread.id ? "bg-[#eaf2ff]" : "hover:bg-slate-50"}`}>
                <ChatAvatar name={thread.participant.displayName} avatarUrl={thread.participant.avatarUrl} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-800">{thread.participant.displayName}</p>
                  <p className="break-words text-sm leading-5 text-slate-500">{thread.status === "REQUESTED" ? thread.requestedBy === user.uid ? "Richiesta inviata" : "Nuova richiesta di chat" : thread.status === "REJECTED" ? "Richiesta non accettata" : thread.lastMessage ?? "Inizia la conversazione"}</p>
                </div>
                <span className="text-xs text-slate-400">{formatLastActivity(thread.lastMessageAt)}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className={`${activeThread ? "flex" : "hidden md:flex"} min-w-0 min-h-0 flex-col bg-white`}>
          {activeThread ? <>
            <header className="flex flex-wrap items-center gap-3 border-b border-slate-200 p-5 sm:flex-nowrap">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <button type="button" onClick={() => setActiveThread(null)} className="shrink-0 text-[#0F2D5F] md:hidden"><ArrowLeft className="size-5" /></button>
                <ChatAvatar name={title} avatarUrl={activeThread.participant.avatarUrl} className="size-11 ring-2 ring-emerald-300" />
                <div className="min-w-0 flex-1"><h2 className="break-words font-bold leading-5 text-[#0F2D5F]">{title}</h2><p className="mt-0.5 text-sm text-emerald-600">Utente registrato</p></div>
              </div>
              <div className="ml-auto flex w-full justify-end gap-2 sm:w-auto">
                {canSendMessages ? <CallPanel threadId={activeThread.id} currentUserId={user.uid} participantName={title} participantAvatarUrl={activeThread.participant.avatarUrl} /> : null}
                <button type="button" onClick={() => void handleTerminateChat()} disabled={busy} title="Termina chat" className="flex size-10 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-50 disabled:opacity-50 sm:size-auto sm:gap-1 sm:px-3 sm:py-2 sm:text-xs sm:font-bold"><Trash2 className="size-4" /><span className="hidden sm:inline">Termina chat</span></button>
                <button type="button" onClick={() => void handleReportAndBlock()} disabled={busy} title="Segnala e blocca utente" className="flex size-10 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-50 disabled:opacity-50"><Ban className="size-5" /></button>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50/70 p-5">
              {messages.length === 0 ? <p className="pt-16 text-center text-sm text-slate-500">Scrivi il primo messaggio. Mantieni la conversazione rispettosa.</p> : messages.map((message) => {
                const mine = message.senderId === user.uid;
                return <div key={message.id} className={`flex min-w-0 ${mine ? "justify-end pr-2 sm:pr-0" : "justify-start"}`}><div className={`max-w-[calc(100%-1rem)] break-words rounded-2xl px-4 py-3 text-sm shadow-sm sm:max-w-[82%] ${mine ? "rounded-br-md bg-emerald-400 text-[#062b20]" : "rounded-bl-md border border-slate-200 bg-white text-slate-800"}`}><p className="whitespace-pre-wrap">{message.text}</p><p className={`mt-1 text-right text-[10px] ${mine ? "text-[#062b20]/65" : "text-slate-400"}`}>{formatTime(message.createdAt)}</p></div></div>;
              })}
            </div>

            {canRespondToRequest ? <div className="border-t border-slate-200 bg-slate-50 p-5 text-center"><p className="text-sm text-slate-600">{title} vuole avviare una conversazione con te.</p><div className="mt-4 flex gap-3"><button type="button" disabled={busy} onClick={() => void handleRequestResponse("reject")} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 font-bold text-white transition hover:bg-red-400 disabled:opacity-50"><X className="size-4" /> Rifiuta</button><button type="button" disabled={busy} onClick={() => void handleRequestResponse("accept")} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 font-bold text-white transition hover:bg-emerald-400 disabled:opacity-50"><Check className="size-4" /> Accetta</button></div></div> : !canSendMessages ? <div className="border-t border-slate-200 bg-slate-50 p-5 text-center text-sm text-slate-600">{activeThread?.status === "REJECTED" ? "Questa richiesta non è stata accettata." : "Richiesta inviata. Potrai scrivere solo dopo l'accettazione."}</div> : <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4">
              {error ? <p role="alert" className="mb-3 text-center text-sm text-red-500">{error}</p> : null}
              <div className="flex items-end gap-3"><textarea value={text} maxLength={500} onChange={(event) => setText(event.target.value)} placeholder="Scrivi un messaggio..." rows={2} className="min-h-12 flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white" /><button disabled={busy || !text.trim()} className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white transition hover:bg-emerald-400 disabled:opacity-50" aria-label="Invia messaggio"><Send className="size-5" /></button></div>
              <p className="mt-2 text-right text-xs text-slate-400">{text.length}/500</p>
            </form>}
          </> : <div className="m-auto max-w-sm p-8 text-center"><MessageCircle className="mx-auto size-12 text-[#1b4b87]" /><h2 className="mt-5 text-2xl font-bold text-[#0F2D5F]">Le tue conversazioni</h2><p className="mt-2 text-slate-500">Seleziona una chat oppure avviane una dal profilo o dai commenti sulla mappa.</p></div>}
        </section>
      </div>

    </main>
  );
}
