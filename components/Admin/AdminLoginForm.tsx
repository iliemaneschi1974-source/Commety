"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, LoaderCircle, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setPending(true);
    setError("");

    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
      });
      const result = (await response.json()) as {
        error?: string;
      };
      if (!response.ok) {
        setError(
          result.error ??
            "Non è stato possibile effettuare l’accesso."
        );
        return;
      }
      router.replace("/admin-comune/dashboard");
      router.refresh();
    } catch {
      setError(
        "Connessione non disponibile. Riprova tra poco."
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_22px_55px_rgba(24,62,104,0.12)] sm:p-8"
    >
      <label
        htmlFor="admin-email"
        className="text-sm font-extrabold text-[#14345f]"
      >
        Email istituzionale
      </label>
      <input
        id="admin-email"
        name="email"
        type="email"
        autoComplete="username"
        required
        placeholder="nome@comune.it"
        className="mt-2 h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2c81d1] focus:bg-white focus:ring-4 focus:ring-blue-100"
      />

      <label
        htmlFor="admin-password"
        className="mt-5 block text-sm font-extrabold text-[#14345f]"
      >
        Password
      </label>
      <div className="relative mt-2">
        <input
          id="admin-password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          minLength={12}
          placeholder="Inserisci la password"
          className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2c81d1] focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-400 hover:text-[#14345f]"
          aria-label={
            showPassword
              ? "Nascondi password"
              : "Mostra password"
          }
        >
          {showPassword ? (
            <EyeOff className="size-5" />
          ) : (
            <Eye className="size-5" />
          )}
        </button>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#0d376f,#1f72bd)] font-black text-white shadow-[0_12px_26px_rgba(23,91,160,0.28)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-65"
      >
        {pending ? (
          <LoaderCircle className="size-5 animate-spin" />
        ) : (
          <LogIn className="size-5" />
        )}
        {pending ? "Accesso in corso..." : "Accedi al pannello"}
      </button>
    </form>
  );
}
