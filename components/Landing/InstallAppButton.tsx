"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function InstallAppButton() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as Navigator & { standalone?: boolean }).standalone === true);
    if (standalone) return;

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => setInstallPrompt(null);

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (!installPrompt) return null;

  async function install() {
    const prompt = installPrompt;
    if (!prompt) return;

    await prompt.prompt();
    await prompt.userChoice;
    setInstallPrompt(null);
  }

  return (
    <button
      type="button"
      onClick={() => void install()}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#9ed1ff]/45 bg-[#1762a8]/35 px-7 py-4 text-lg font-bold text-white shadow-[0_14px_30px_rgba(23,98,168,0.2)] transition hover:-translate-y-0.5 hover:bg-[#1762a8]/55"
    >
      <Download className="size-5" />
      Installa Commety
    </button>
  );
}
