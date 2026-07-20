"use client";

import Image from "next/image";
import { useState } from "react";

import {
  CommetyPreferencesValue,
  MAX_MOTIVATION_LENGTH,
  PreferencesForm,
} from "@/components/Profile/ProfilePreferences";
import { useAuth } from "@/contexts/AuthContext";
import { updateUser } from "@/services/users";

const EMPTY_PREFERENCES: CommetyPreferencesValue = {
  motivation: "",
  interestedCategories: [],
};

export default function PreferencesOnboarding() {
  const { user } = useAuth();
  const currentUser = user;
  const [draft, setDraft] = useState<CommetyPreferencesValue>(EMPTY_PREFERENCES);
  const [saving, setSaving] = useState(false);
  const [motivationError, setMotivationError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");

  const shouldShow = Boolean(currentUser) && !currentUser?.preferences.preferencesOnboardingCompleted;

  if (!currentUser || !shouldShow) return null;

  async function handleSave() {
    if (!currentUser) return;

    const motivation = draft.motivation.trim();
    const invalidMotivation = !motivation;
    const invalidCategories = draft.interestedCategories.length === 0;
    setMotivationError(invalidMotivation ? "Scrivi un breve motivo." : "");
    setCategoriesError(invalidCategories ? "Scegli almeno una categoria." : "");
    if (invalidMotivation || invalidCategories) return;

    setSaving(true);
    try {
      await updateUser(currentUser.uid, {
        preferences: {
          ...currentUser.preferences,
          commetyMotivation: motivation.slice(0, MAX_MOTIVATION_LENGTH),
          interestedCategories: draft.interestedCategories,
          preferencesOnboardingCompleted: true,
        },
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[3900] flex items-center justify-center overflow-y-auto bg-[#020b1f]/80 p-4 backdrop-blur-sm">
      <div className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-white shadow-[0_24px_70px_rgba(1,15,42,0.6)]">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_48%,#1b4b87_100%)] px-6 pb-7 pt-6 text-center text-white sm:px-9">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.18)_48%,transparent_64%)]" />
          <div className="relative">
            <Image src="/logo-header-cropped.png" alt="Commety" width={170} height={46} className="mx-auto h-10 w-auto [filter:drop-shadow(0_0_9px_rgba(255,255,255,0.75))]" />
            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#a9d5ff]">Personalizza Commety</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">Cosa conta per te?</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/80">Bastano pochi secondi per rendere il tuo profilo più personale e la tua esperienza più rilevante.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <PreferencesForm value={draft} onChange={setDraft} motivationError={motivationError} categoriesError={categoriesError} />
          <button type="button" onClick={handleSave} disabled={saving} className="mt-6 w-full rounded-2xl bg-emerald-500 px-5 py-3.5 font-bold text-white shadow-[0_12px_26px_rgba(16,185,129,0.28)] transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? "Salvataggio in corso..." : "Entra in Commety"}
          </button>
        </div>
      </div>
    </div>
  );
}
