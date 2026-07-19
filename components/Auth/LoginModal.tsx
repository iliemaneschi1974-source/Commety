"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Modal from "@/components/Modal/Modal";
import { useAuth } from "@/contexts/AuthContext";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({
  open,
  onClose,
}: LoginModalProps) {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const {
    loading,
    signInWithGoogle,
  } = useAuth();

  async function handleGoogleLogin() {
    try {
      await signInWithGoogle(analyticsEnabled);
      onClose();
    } catch (error) {
      console.error(
        "Errore durante il login:",
        error
      );
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="Commety"
          width={180}
          height={60}
          priority
          className="mb-6 h-auto"
        />

        <h2 className="text-center text-2xl font-bold text-slate-900">
          Benvenuto su Commety
        </h2>

        <p className="mt-3 text-center text-sm leading-6 text-slate-500">
          Continua ad utilizzare Commety anche senza
          account.
          <br />
          Accedendo potrai personalizzare la tua
          esperienza.
        </p>

        <ul className="mt-6 w-full space-y-3 text-sm text-slate-700">
          <li>✓ Crea il tuo profilo</li>
          <li>✓ Ottieni reputazione</li>
          <li>✓ Visualizza le tue statistiche</li>
          <li>✓ Ricevi notifiche</li>
        </ul>

        <div className="mt-6 w-full space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-sm text-slate-700">
          <label className="flex cursor-pointer items-start gap-3">
            <input checked={privacyAccepted} className="mt-1 size-4 accent-[#0F2D5F]" onChange={(event) => setPrivacyAccepted(event.target.checked)} type="checkbox" />
            <span>Ho letto e accetto la <Link className="font-semibold text-[#0F2D5F] underline" href="/privacy" target="_blank">Privacy Policy</Link>.</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input checked={termsAccepted} className="mt-1 size-4 accent-[#0F2D5F]" onChange={(event) => setTermsAccepted(event.target.checked)} type="checkbox" />
            <span>Accetto i <Link className="font-semibold text-[#0F2D5F] underline" href="/termini" target="_blank">Termini di utilizzo</Link>.</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 border-t border-slate-200 pt-3">
            <input checked={analyticsEnabled} className="mt-1 size-4 accent-emerald-600" onChange={(event) => setAnalyticsEnabled(event.target.checked)} type="checkbox" />
            <span>Aiutaci a migliorare Commety con statistiche anonime di utilizzo.<span className="mt-1 block text-xs text-slate-500">Facoltativo, senza pubblicità né remarketing.</span></span>
          </label>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || !privacyAccepted || !termsAccepted}
          className="
            mt-8
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            bg-[#2563FF]
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-[#1d4ed8]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading
            ? "Accesso in corso..."
            : "Continua con Google"}
        </button>

        {!privacyAccepted || !termsAccepted ? <p className="mt-3 text-center text-xs text-slate-500">Per accedere devi accettare Privacy Policy e Termini di utilizzo.</p> : null}

        <button
          type="button"
          onClick={onClose}
          className="
            mt-4
            text-sm
            font-medium
            text-slate-500
            transition
            hover:text-slate-700
          "
        >
          Non adesso
        </button>
      </div>
    </Modal>
  );
}
