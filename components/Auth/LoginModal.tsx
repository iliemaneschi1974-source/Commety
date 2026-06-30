"use client";

import Image from "next/image";

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
  const {
    loading,
    signInWithGoogle,
  } = useAuth();

  async function handleGoogleLogin() {
    try {
      await signInWithGoogle();
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

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
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