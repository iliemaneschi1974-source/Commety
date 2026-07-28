"use client";

import {
  Building2,
  CheckCheck,
  ChevronRight,
  FileCheck2,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  deleteAllNotifications,
  getNotificationInbox,
  markAllNotificationsRead,
  markNotificationRead,
  NOTIFICATIONS_CHANGED_EVENT,
} from "@/services/notifications";
import type { InstitutionalNotification } from "@/types/notification";

function formatNotificationDate(value: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function InstitutionalUpdates() {
  const router = useRouter();
  const [items, setItems] = useState<InstitutionalNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busyAction, setBusyAction] = useState<
    "read" | "delete" | null
  >(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const inbox = await getNotificationInbox();
      setItems(inbox.notifications);
      setUnreadCount(inbox.unreadCount);
      setError("");
    } catch (nextError) {
      console.error("Errore aggiornamenti istituzionali:", nextError);
      setError("Non è stato possibile caricare gli aggiornamenti.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => void load(), 0);
    const interval = window.setInterval(() => void load(), 15_000);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [load]);

  async function openNotification(item: InstitutionalNotification) {
    if (!item.readAt) {
      await markNotificationRead(item.id);
      setItems((current) =>
        current.map((notification) =>
          notification.id === item.id
            ? {
                ...notification,
                readAt: new Date().toISOString(),
              }
            : notification
        )
      );
      setUnreadCount((current) => Math.max(0, current - 1));
      window.dispatchEvent(
        new Event(NOTIFICATIONS_CHANGED_EVENT)
      );
    }
    router.push(`/mappa?report=${encodeURIComponent(item.reportId)}`);
  }

  async function markAllRead() {
    if (busyAction || unreadCount === 0) return;

    try {
      setBusyAction("read");
      await markAllNotificationsRead();
      const readAt = new Date().toISOString();
      setItems((current) =>
        current.map((item) => ({
          ...item,
          readAt: item.readAt ?? readAt,
        }))
      );
      setUnreadCount(0);
      setError("");
      window.dispatchEvent(
        new Event(NOTIFICATIONS_CHANGED_EVENT)
      );
    } catch (nextError) {
      console.error("Errore lettura aggiornamenti:", nextError);
      setError(
        "Non è stato possibile segnare gli aggiornamenti come letti."
      );
    } finally {
      setBusyAction(null);
    }
  }

  async function deleteNotifications() {
    if (busyAction || items.length === 0) return;
    if (
      !window.confirm(
        "Vuoi eliminare definitivamente tutte le notifiche? Questa azione non può essere annullata."
      )
    ) {
      return;
    }

    try {
      setBusyAction("delete");
      await deleteAllNotifications();
      setItems([]);
      setUnreadCount(0);
      setError("");
      window.dispatchEvent(
        new Event(NOTIFICATIONS_CHANGED_EVENT)
      );
    } catch (nextError) {
      console.error("Errore eliminazione aggiornamenti:", nextError);
      setError("Non è stato possibile eliminare le notifiche.");
    } finally {
      setBusyAction(null);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-sm text-slate-500">
        Caricamento aggiornamenti...
      </div>
    );
  }

  return (
    <section className="min-h-[420px] bg-slate-50/70 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-black text-[#0F2D5F]">
            Aggiornamenti istituzionali
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Comunicazioni ufficiali sulle tue segnalazioni.
          </p>
        </div>
        {items.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void markAllRead()}
              disabled={busyAction !== null || unreadCount === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-black text-[#1762a8] shadow-sm ring-1 ring-slate-200 transition disabled:cursor-not-allowed disabled:opacity-45"
            >
              <CheckCheck className="size-4" />
              {busyAction === "read"
                ? "Salvataggio..."
                : "Segna come lette"}
            </button>
            <button
              type="button"
              onClick={() => void deleteNotifications()}
              disabled={busyAction !== null}
              className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-600 shadow-sm ring-1 ring-red-100 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <Trash2 className="size-4" />
              {busyAction === "delete"
                ? "Eliminazione..."
                : "Elimina notifiche"}
            </button>
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      {items.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <FileCheck2 className="mx-auto size-10 text-slate-300" />
          <p className="mt-4 font-black text-[#0F2D5F]">
            Nessun aggiornamento
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Qui compariranno le comunicazioni dei Comuni sulle
            segnalazioni che hai pubblicato.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => void openNotification(item)}
              className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                item.readAt
                  ? "border-slate-200 bg-white"
                  : "border-blue-200 bg-blue-50"
              }`}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#145b9d] text-white">
                <Building2 className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-black text-[#0F2D5F]">
                    Comune di {item.municipalityName}
                  </p>
                  {!item.readAt ? (
                    <span className="size-2 rounded-full bg-blue-500" />
                  ) : null}
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  {item.message}
                </p>
                {item.institutionalNote ? (
                  <p className="mt-2 rounded-xl bg-white/80 px-3 py-2 text-sm italic text-slate-600">
                    “{item.institutionalNote}”
                  </p>
                ) : null}
                <p className="mt-2 text-xs text-slate-400">
                  {item.reportTitle} ·{" "}
                  {formatNotificationDate(item.createdAt)}
                </p>
              </div>
              <ChevronRight className="mt-3 size-5 shrink-0 text-slate-400" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
