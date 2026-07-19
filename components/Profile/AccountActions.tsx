"use client";

import { LogOut, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { deleteCurrentAccount } from "@/services/account";

export function AccountActions() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogout() {
    await signOut();
    router.replace("/mappa");
  }

  async function handleDeleteAccount() {
    setErrorMessage(null);
    setDeleting(true);

    try {
      await deleteCurrentAccount();
      await signOut();
      router.replace("/mappa");
    } catch (error) {
      console.error("Errore durante la cancellazione dell'account", error);
      setErrorMessage(
        "Non è stato possibile completare la cancellazione. Per sicurezza, esci e accedi nuovamente prima di riprovare."
      );
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <section className="mt-2 grid gap-3 border-t border-slate-200 pt-8 sm:grid-cols-2">
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#0F2D5F]/20 bg-white px-5 py-4 font-bold text-[#0F2D5F] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#eef5ff]"
      >
        <LogOut className="size-5" />
        Logout
      </button>
      <button
        type="button"
        onClick={() => setConfirming(true)}
        disabled={deleting}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-4 font-bold text-white shadow-[0_10px_22px_rgba(220,38,38,0.25)] transition hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Trash2 className="size-5" />
        {deleting ? "Cancellazione in corso..." : "Cancella account"}
      </button>
      {confirming ? (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_42%,#1b4b87_62%,#0a2553_100%)] p-6 text-center text-white shadow-[0_18px_45px_rgba(2,16,42,0.45)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.18)_48%,transparent_62%)] [&>*]:relative [&>*]:z-10">
            <h2 className="text-xl font-black text-red-400">Cancellare l&apos;account?</h2>
            <p className="mt-4 leading-7 text-white/90">Verranno eliminati subito profilo, segnalazioni, foto, commenti e conferme. Questa azione non può essere annullata.</p>
            {errorMessage ? <p className="mt-4 text-sm leading-6 text-red-200">{errorMessage}</p> : null}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setConfirming(false)} disabled={deleting} className="rounded-xl border border-white/25 bg-white/10 py-3 font-bold text-white transition hover:bg-white/20 disabled:opacity-60">Annulla</button>
              <button type="button" onClick={handleDeleteAccount} disabled={deleting} className="rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700 disabled:opacity-60">{deleting ? "Cancellazione..." : "Cancella"}</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
