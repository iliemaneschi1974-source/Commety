"use client";

import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";

import { REPORT_CATEGORY_CONFIG } from "@/lib/reportCategoryConfig";
import { ReportCategory } from "@/types/report";

export interface CommetyPreferencesValue {
  motivation: string;
  interestedCategories: ReportCategory[];
}

interface PreferencesFormProps {
  value: CommetyPreferencesValue;
  onChange: (value: CommetyPreferencesValue) => void;
  motivationError?: string;
  categoriesError?: string;
}

interface ProfilePreferencesProps {
  value: CommetyPreferencesValue;
  onSave: (value: CommetyPreferencesValue) => Promise<void>;
}

export const REPORT_CATEGORIES: ReportCategory[] = [
  "meteo",
  "traffico",
  "pericolo",
  "evento",
  "mare",
  "animali",
];

export const MAX_MOTIVATION_LENGTH = 280;

export function PreferencesForm({
  value,
  onChange,
  motivationError,
  categoriesError,
}: PreferencesFormProps) {
  function toggleCategory(category: ReportCategory) {
    const selected = value.interestedCategories.includes(category);

    onChange({
      ...value,
      interestedCategories: selected
        ? value.interestedCategories.filter((item) => item !== category)
        : [...value.interestedCategories, category],
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="commety-motivation" className="text-sm font-bold text-slate-800">
          Perché sei diventato un membro di Commety?
        </label>
        <textarea
          id="commety-motivation"
          value={value.motivation}
          maxLength={MAX_MOTIVATION_LENGTH}
          onChange={(event) => onChange({ ...value, motivation: event.target.value })}
          placeholder="Raccontaci cosa ti interessa della tua comunità..."
          rows={4}
          className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1b4b87] focus:bg-white focus:ring-4 focus:ring-[#1b4b87]/10"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-500">
          <span className="text-red-600">{motivationError}</span>
          <span>{value.motivation.length} / {MAX_MOTIVATION_LENGTH}</span>
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-bold text-slate-800">
          Le categorie che ti interessano
        </legend>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Scegline almeno una: ci aiuterà a rendere Commety più vicino a te.
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {REPORT_CATEGORIES.map((category) => {
            const config = REPORT_CATEGORY_CONFIG[category];
            const selected = value.interestedCategories.includes(category);

            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                aria-pressed={selected}
                className={`group flex min-h-[86px] flex-col items-center justify-center gap-1 rounded-2xl border p-2 text-xs font-bold transition-all active:scale-95 ${
                  selected
                    ? "border-transparent bg-slate-900 text-white shadow-lg"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
                style={selected ? { boxShadow: `0 10px 22px ${config.color}45` } : undefined}
              >
                <span className="relative flex size-11 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 size-4 rotate-45 rounded-[3px]"
                    style={{ backgroundColor: config.color }}
                  />
                  <span
                    className="relative z-10 flex size-9 items-center justify-center rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: config.color }}
                  >
                    {config.icon}
                  </span>
                </span>
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>
        {categoriesError && <p className="mt-2 text-xs font-medium text-red-600">{categoriesError}</p>}
      </fieldset>
    </div>
  );
}

export function ProfilePreferences({ value, onSave }: ProfilePreferencesProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [motivationError, setMotivationError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");

  function startEditing() {
    setDraft(value);
    setMotivationError("");
    setCategoriesError("");
    setEditing(true);
  }

  async function save() {
    const motivation = draft.motivation.trim();
    const categories = draft.interestedCategories;
    const invalidMotivation = !motivation;
    const invalidCategories = categories.length === 0;

    setMotivationError(invalidMotivation ? "Raccontaci brevemente il tuo motivo." : "");
    setCategoriesError(invalidCategories ? "Scegli almeno una categoria." : "");
    if (invalidMotivation || invalidCategories) return;

    setSaving(true);
    try {
      await onSave({ motivation, interestedCategories: categories });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,45,95,0.08)] sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1b4b87]">Il tuo spazio</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">Le mie preferenze</h2>
        </div>
        {!editing && (
          <button type="button" onClick={startEditing} aria-label="Modifica le mie preferenze" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0F2D5F] text-white shadow-sm transition hover:bg-[#1b4b87] active:scale-95">
            <Pencil className="size-4" />
          </button>
        )}
      </div>

      {editing ? (
        <>
          <PreferencesForm value={draft} onChange={setDraft} motivationError={motivationError} categoriesError={categoriesError} />
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" disabled={saving} onClick={() => setEditing(false)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 font-bold text-white transition hover:bg-red-600 disabled:opacity-60"><X className="size-4" />Annulla</button>
            <button type="button" disabled={saving} onClick={save} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 font-bold text-white transition hover:bg-emerald-600 disabled:opacity-60"><Check className="size-4" />{saving ? "Salvataggio..." : "Salva"}</button>
          </div>
        </>
      ) : (
        <div className="space-y-5">
          <p className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{value.motivation}</p>
          <div className="flex flex-wrap gap-2">
            {value.interestedCategories.map((category) => {
              const config = REPORT_CATEGORY_CONFIG[category];
              return <span key={category} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold text-white shadow-sm" style={{ backgroundColor: config.color }}>{config.icon}{config.label}</span>;
            })}
          </div>
        </div>
      )}
    </section>
  );
}
