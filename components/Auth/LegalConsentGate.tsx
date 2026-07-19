"use client";

import Link from "next/link";
import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { LEGAL_DOCUMENT_VERSION } from "@/lib/legal";

export default function LegalConsentGate() {
  const { acceptLegalConsent, loading, signOut, user } = useAuth();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  const requiresConsent = Boolean(user) && (
    user?.consents?.privacyPolicyVersion !== LEGAL_DOCUMENT_VERSION ||
    user?.consents?.termsVersion !== LEGAL_DOCUMENT_VERSION
  );

  if (!requiresConsent) {
    return null;
  }

  async function handleAccept() {
    setSaving(true);

    try {
      await acceptLegalConsent(analyticsEnabled);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-[#020b1f]/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(145deg,#071a3c_0%,#0F2D5F_48%,#123b73_100%)] p-6 text-white shadow-[0_22px_55px_rgba(1,15,42,0.55)] sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_26%,rgba(255,255,255,0.14)_48%,transparent_64%)]" />
        <div className="relative">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#a9d5ff]">Prima di iniziare</p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl">Conferma i documenti di Commety</h2>
          <p className="mt-3 leading-7 text-white/80">Per usare il tuo account devi accettare Privacy Policy e Termini di utilizzo.</p>

          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/15 bg-white/8 p-4 text-sm text-white/90">
            <input checked={analyticsEnabled} className="mt-1 size-4 accent-emerald-400" onChange={(event) => setAnalyticsEnabled(event.target.checked)} type="checkbox" />
            <span>Aiutaci a migliorare Commety con statistiche anonime di utilizzo.<span className="mt-1 block text-xs text-white/60">Facoltativo. Nessuna pubblicità o remarketing.</span></span>
          </label>

          <p className="mt-5 text-xs leading-5 text-white/65">Proseguendo accetti la <Link className="font-semibold text-[#a9d5ff] underline" href="/privacy" target="_blank">Privacy Policy</Link> e i <Link className="font-semibold text-[#a9d5ff] underline" href="/termini" target="_blank">Termini di utilizzo</Link>.</p>

          <button className="mt-6 w-full rounded-2xl bg-emerald-500 px-5 py-3.5 font-bold text-white shadow-[0_12px_26px_rgba(16,185,129,0.28)] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60" disabled={loading || saving} onClick={handleAccept} type="button">
            {saving ? "Salvataggio in corso..." : "Accetta e continua"}
          </button>
          <button className="mt-3 w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white" disabled={saving} onClick={() => void signOut()} type="button">
            Continua senza account
          </button>
        </div>
      </div>
    </div>
  );
}
