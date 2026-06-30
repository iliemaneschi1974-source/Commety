"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

import LoginModal from "@/components/Auth/LoginModal";
import UserMenu from "@/components/User/UserMenu";

import { useAuth } from "@/contexts/AuthContext";

export default function UserFab() {
  const { isAuthenticated, user } = useAuth();

  const [loginOpen, setLoginOpen] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  function handleClick() {
    if (isAuthenticated) {
      setMenuOpen(true);
      return;
    }

    setLoginOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={
          isAuthenticated
            ? "Menu utente"
            : "Accedi a commety"
        }
        title={
          isAuthenticated
            ? "Menu utente"
            : "Accedi"
        }
        className="
          fixed
          bottom-6
          right-6
          z-[1000]
          flex
          h-16
          w-16
          items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-[#2563FF]
          shadow-xl
          transition
          hover:scale-105
          hover:bg-[#1d4ed8]
          active:scale-95
        "
      >
        {isAuthenticated &&
        user?.profile.avatarUrl ? (
          <Image
            src={user.profile.avatarUrl}
            alt={
              user.profile.displayName ||
              "Profilo"
            }
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <User
            size={30}
            className="text-white"
          />
        )}
      </button>

      <LoginModal
        open={loginOpen}
        onClose={() =>
          setLoginOpen(false)
        }
      />

      <UserMenu
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      />
    </>
  );
}