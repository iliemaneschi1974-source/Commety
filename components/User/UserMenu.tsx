"use client";

import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { signOutUser } from "@/services/auth";

interface UserMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function UserMenu({
  open,
  onClose,
}: UserMenuProps) {
  const router = useRouter();

  if (!open) {
    return null;
  }

  async function handleLogout() {
    await signOutUser();

    onClose();
  }

  function handleProfile() {
    router.push("/profile");

    onClose();
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[1090]"
        onClick={onClose}
      />

      <div
        className="
          fixed
          bottom-24
          right-6
          z-[1100]
          w-64
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
      >
        <button
          type="button"
          onClick={handleProfile}
          className="
            flex
            w-full
            items-center
            gap-3
            px-5
            py-4
            transition
            hover:bg-slate-50
          "
        >
          <User size={20} />

          <span>Il mio profilo</span>
        </button>

        <div className="h-px bg-slate-200" />

        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            px-5
            py-4
            text-red-600
            transition
            hover:bg-red-50
          "
        >
          <LogOut size={20} />

          <span>Esci</span>
        </button>
      </div>
    </>
  );
}