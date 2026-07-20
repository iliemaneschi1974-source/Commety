"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { House, LogIn, LogOut, Map, MessageCircle, Plus, UserRound } from "lucide-react";

import LoginModal from "@/components/Auth/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { useMapContext } from "@/contexts/MapContext";
import { getChatInbox } from "@/services/chat";

type NavigationItemProps = {
  href: string;
  label: string;
  active: boolean;
  color: string;
  children: React.ReactNode;
  badge?: number;
};

function NavigationItem({
  href,
  label,
  active,
  color,
  children,
  badge = 0,
}: NavigationItemProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl py-1 text-[10px] font-bold transition ${active ? "text-[#0F2D5F]" : "text-slate-500 hover:text-[#0F2D5F]"}`}
    >
      <span
        className="flex size-9 items-center justify-center rounded-[12px_12px_12px_4px] shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition"
        style={{ backgroundColor: color }}
      >
        {children}
      </span>
      <span className="truncate">{label}</span>
      {badge > 0 ? (
        <span className="absolute right-[calc(50%-21px)] top-0 flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#0F2D5F] bg-emerald-400 px-1 text-[10px] font-black text-[#062b20] shadow-lg">
          {badge > 99 ? "99+" : badge}
        </span>
      ) : null}
    </Link>
  );
}

export default function BottomAppNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, signOut } = useAuth();
  const { requestReportComposer } = useMapContext();
  const [pendingRequests, setPendingRequests] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);

  const loadPendingRequests = useCallback(async () => {
    if (!isAuthenticated || !user) return;

    try {
      const threads = await getChatInbox();
      setPendingRequests(
        threads.filter(
          (thread) =>
            thread.status === "REQUESTED" &&
            thread.requestedBy !== user.uid
        ).length
      );
    } catch (error) {
      console.error("Errore caricamento richieste chat:", error);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadPendingRequests();
    }, 0);
    const interval = window.setInterval(() => {
      void loadPendingRequests();
    }, 15_000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [loadPendingRequests]);

  if (
    pathname !== "/" &&
    !["/mappa", "/profile", "/chat"].some(
      (route) => pathname?.startsWith(route)
    )
  ) {
    return null;
  }

  async function handleLogout() {
    if (!window.confirm("Vuoi uscire da Commety?")) return;

    await signOut();
    router.push("/");
  }

  function handleCreateReport() {
    requestReportComposer();
    router.push("/mappa");
  }

  return (
    <>
    <nav
      aria-label="Navigazione principale"
      className="fixed bottom-0 left-1/2 z-[900] flex w-full -translate-x-1/2 items-end gap-1 rounded-t-[1.7rem] border border-b-0 border-slate-200 bg-white px-2 pb-2 pt-2 text-[#0F2D5F] shadow-[0_-10px_30px_rgba(2,16,42,0.18)]"
    >
      <NavigationItem href="/" label="Home" active={pathname === "/"} color="#0F2D5F">
        <House className="size-5 text-white" />
      </NavigationItem>
      <NavigationItem href="/mappa" label="Mappa" active={pathname === "/mappa"} color="#2563FF">
        <Map className="size-5 text-white" />
      </NavigationItem>
      {isAuthenticated ? <NavigationItem href="/profile" label="Profilo" active={pathname === "/profile"} color="#0F2D5F">
        <UserRound className="size-5 text-white" />
      </NavigationItem> : <button type="button" onClick={() => setLoginOpen(true)} className="flex min-w-0 flex-1 flex-col items-center gap-1 py-1 text-[10px] font-bold text-slate-500 transition hover:text-[#0F2D5F]"><span className="flex size-9 items-center justify-center rounded-[12px_12px_12px_4px] bg-[#0F2D5F] shadow-[0_4px_10px_rgba(0,0,0,0.2)]"><UserRound className="size-5 text-white" /></span><span>Profilo</span></button>}
      {isAuthenticated ? <button type="button" onClick={handleCreateReport} aria-label="Nuova segnalazione" className="-mt-7 flex min-w-0 flex-1 flex-col items-center gap-1 text-[10px] font-black text-[#0F2D5F] transition hover:scale-105 active:scale-95">
        <span className="flex size-14 items-center justify-center rounded-[18px_18px_18px_5px] border-4 border-white bg-emerald-400 shadow-[0_8px_18px_rgba(2,16,42,0.28)]"><Plus className="size-7" /></span>
        <span>Segnala</span>
      </button> : null}
      {isAuthenticated ? <NavigationItem href="/chat" label="Messaggi" active={pathname === "/chat"} color="#8B5CF6" badge={pendingRequests}>
        <MessageCircle className="size-5 text-white" />
      </NavigationItem> : <button type="button" onClick={() => setLoginOpen(true)} className="flex min-w-0 flex-1 flex-col items-center gap-1 py-1 text-[10px] font-bold text-slate-500 transition hover:text-[#0F2D5F]"><span className="flex size-9 items-center justify-center rounded-[12px_12px_12px_4px] bg-[#8B5CF6] shadow-[0_4px_10px_rgba(0,0,0,0.2)]"><MessageCircle className="size-5 text-white" /></span><span>Messaggi</span></button>}
      {isAuthenticated ? <button type="button" onClick={() => void handleLogout()} aria-label="Esci" className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl py-1 text-[10px] font-bold text-slate-500 transition hover:text-red-600">
        <span className="flex size-9 items-center justify-center rounded-[12px_12px_12px_4px] bg-red-500 shadow-[0_4px_10px_rgba(0,0,0,0.25)]"><LogOut className="size-5 text-white" /></span>
        <span>Esci</span>
      </button> : <button type="button" onClick={() => setLoginOpen(true)} aria-label="Accedi" className="flex min-w-0 flex-1 flex-col items-center gap-1 py-1 text-[10px] font-black text-[#0F2D5F] transition hover:scale-105 active:scale-95"><span className="flex size-11 items-center justify-center rounded-[15px_15px_15px_4px] border-2 border-white bg-emerald-400 shadow-[0_5px_12px_rgba(2,16,42,0.22)]"><LogIn className="size-5" /></span><span>Accedi</span></button>}
    </nav>
    <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
