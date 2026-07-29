"use client";

import { BellRing, Building2, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import {
  disablePushNotifications,
  enablePushNotifications,
  getPushNotificationState,
  updatePushNotificationPreferences,
} from "@/services/push-notifications";
import {
  DEFAULT_PUSH_NOTIFICATION_PREFERENCES,
  type PushNotificationPreferences,
} from "@/types/push-notifications";

const options: Array<{
  key: keyof PushNotificationPreferences;
  label: string;
  description: string;
  icon: typeof BellRing;
}> = [
  {
    key: "municipalUpdates",
    label: "Aggiornamenti del Comune",
    description: "Comunicazioni ufficiali sulle tue segnalazioni.",
    icon: Building2,
  },
  {
    key: "statusChanges",
    label: "Presa in carico e risoluzione",
    description: "Quando cambia lo stato di una tua segnalazione.",
    icon: ShieldCheck,
  },
  {
    key: "messages",
    label: "Messaggi privati",
    description: "Nuovi messaggi e richieste dalla community.",
    icon: MessageCircle,
  },
  {
    key: "verificationRequests",
    label: "Richieste di verifica",
    description: "Quando la community richiede una tua conferma.",
    icon: BellRing,
  },
  {
    key: "nearbyReports",
    label: "Segnalazioni nelle vicinanze",
    description: "Avvisi territoriali pertinenti alla tua zona.",
    icon: MapPin,
  },
];

export function PushNotificationPreferences() {
  const [preferences, setPreferences] = useState(
    DEFAULT_PUSH_NOTIFICATION_PREFERENCES
  );
  const [deviceEnabled, setDeviceEnabled] = useState(false);
  const [supported, setSupported] = useState(true);
  const [isIosBrowser, setIsIosBrowser] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState("");
  const preferencesEnabled =
    supported && (!isIosBrowser || standalone) && deviceEnabled;

  useEffect(() => {
    void Promise.resolve().then(() => {
      setSupported("Notification" in window && "serviceWorker" in navigator);
      setIsIosBrowser(/iPad|iPhone|iPod/.test(navigator.userAgent));
      setStandalone(window.matchMedia("(display-mode: standalone)").matches);
    });

    void getPushNotificationState()
      .then((state) => {
        setPreferences(state.preferences);
        setDeviceEnabled(state.deviceEnabled);
      })
      .catch(() => setMessage("Non è stato possibile caricare le preferenze."))
      .finally(() => setBusy(false));
  }, []);

  async function toggleDevice() {
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      const state = deviceEnabled
        ? await disablePushNotifications()
        : await enablePushNotifications();
      setDeviceEnabled(state.deviceEnabled);
      setPreferences(state.preferences);
      setMessage(
        state.deviceEnabled
          ? "Notifiche attive su questo dispositivo."
          : "Notifiche disattivate su questo dispositivo."
      );
    } catch (error) {
      const code = error instanceof Error ? error.message : "";
      setMessage(
        code === "PUSH_PERMISSION_DENIED"
          ? "Il browser ha bloccato le notifiche. Puoi riattivarle dalle impostazioni del sito."
          : "Non è stato possibile modificare le notifiche. Riprova tra poco."
      );
    } finally {
      setBusy(false);
    }
  }

  async function togglePreference(key: keyof PushNotificationPreferences) {
    if (busy) return;
    const previous = preferences;
    const next = { ...preferences, [key]: !preferences[key] };
    setPreferences(next);
    setBusy(true);
    setMessage("");
    try {
      const state = await updatePushNotificationPreferences(next);
      setPreferences(state.preferences);
      setDeviceEnabled(state.deviceEnabled);
      setMessage("Preferenze salvate.");
    } catch {
      setPreferences(previous);
      setMessage("Non è stato possibile salvare la preferenza.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,45,95,0.08)] sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F2D5F] text-white">
          <BellRing className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1b4b87]">
            Sempre aggiornato
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-900">
            Notifiche push
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Scegli cosa ricevere anche quando Commety non è aperto.
          </p>
        </div>
      </div>

      {!supported ? (
        <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Questo browser non supporta le notifiche push.
        </p>
      ) : isIosBrowser && !standalone ? (
        <p className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-[#145b9d]">
          Su iPhone e iPad aggiungi prima Commety alla schermata Home, poi aprila
          dall’icona e attiva qui le notifiche.
        </p>
      ) : (
        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
          <div>
            <p className="font-black text-slate-800">Questo dispositivo</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              L’autorizzazione viene richiesta solo dopo il tuo consenso.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={deviceEnabled}
            disabled={busy}
            onClick={() => void toggleDevice()}
            className={`relative h-8 w-14 shrink-0 rounded-full transition ${
              deviceEnabled ? "bg-emerald-500" : "bg-slate-300"
            } disabled:opacity-50`}
          >
            <span
              className={`absolute top-1 size-6 rounded-full bg-white shadow transition ${
                deviceEnabled ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>
      )}

      <div className="mt-4 divide-y divide-slate-100">
        {options.map((option) => {
          const Icon = option.icon;
          const checked =
            preferencesEnabled && preferences[option.key];
          return (
            <div
              key={option.key}
              className={`flex items-center gap-3 py-4 transition ${
                preferencesEnabled ? "" : "opacity-55"
              }`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1762a8]">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-slate-800">{option.label}</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">
                  {option.description}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-label={option.label}
                aria-checked={checked}
                aria-disabled={!preferencesEnabled || busy}
                disabled={!preferencesEnabled || busy}
                onClick={() => void togglePreference(option.key)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  checked ? "bg-[#1762a8]" : "bg-slate-300"
                } disabled:cursor-not-allowed`}
              >
                <span
                  className={`absolute top-1 size-5 rounded-full bg-white shadow transition ${
                    checked ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {message ? (
        <p className="mt-2 text-center text-xs font-bold text-slate-600" role="status">
          {message}
        </p>
      ) : null}
    </section>
  );
}
