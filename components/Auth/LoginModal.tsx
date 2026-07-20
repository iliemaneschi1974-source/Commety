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
          width={150}
          height={50}
          priority
          className="mb-3 h-auto"
        />

        <h2 className="text-center text-xl font-bold text-slate-900">
          Benvenuto su Commety
        </h2>

        <p className="mt-2 text-center text-sm leading-5 text-slate-500">
          Accedi per avere il tuo spazio personale nella community.
        </p>

        <ul className="mt-4 grid w-full grid-cols-2 gap-2 text-xs text-slate-700">
          <li>✓ Profilo e preferenze</li>
          <li>✓ Reputazione Commety</li>
          <li>✓ Chat privata</li>
          <li>✓ Le tue statistiche</li>
        </ul>

        <div className="mt-4 w-full space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left text-xs text-slate-700">
          <label className="flex cursor-pointer items-start gap-3">
            <input checked={privacyAccepted && termsAccepted} className="mt-0.5 size-4 accent-[#0F2D5F]" onChange={(event) => { setPrivacyAccepted(event.target.checked); setTermsAccepted(event.target.checked); }} type="checkbox" />
            <span>Accetto <Link className="font-semibold text-[#0F2D5F] underline" href="/privacy" target="_blank">Privacy Policy</Link> e <Link className="font-semibold text-[#0F2D5F] underline" href="/termini" target="_blank">Termini di utilizzo</Link>.</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 border-t border-slate-200 pt-3">
            <input checked={analyticsEnabled} className="mt-0.5 size-4 accent-emerald-600" onChange={(event) => setAnalyticsEnabled(event.target.checked)} type="checkbox" />
            <span>Statistiche anonime facoltative per migliorare Commety.</span>
          </label>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || !privacyAccepted || !termsAccepted}
          className="
            mt-5
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

        <button
          type="button"
          onClick={onClose}
          className="
            mt-3
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
