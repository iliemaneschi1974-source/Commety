"use client";

import { CheckCircle2, Info, XCircle } from "lucide-react";

export type ToastType =
  | "success"
  | "error"
  | "info";

interface ToastProps {
  message: string;
  type: ToastType;
}

export default function Toast({
  message,
  type,
}: ToastProps) {
  const config = {
    success: {
      icon: CheckCircle2,
      accent: "text-emerald-300",
    },

    error: {
      icon: XCircle,
      accent: "text-red-400",
    },

    info: {
      icon: Info,
      accent: "text-sky-300",
    },
  };

  const current = config[type];

  const Icon = current.icon;

  return (
    <div
      className={`
        flex
        items-center
        gap-3

        rounded-2xl
        border
        border-white/15

        bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_45%,#1b4b87_100%)]
        text-white

        px-4
        py-3

        shadow-[0_12px_28px_rgba(2,16,42,0.38)]

        backdrop-blur-xl
      `}
    >
      <Icon
        size={20}
        strokeWidth={2.5}
        className={current.accent}
      />

      <span className="font-medium">
        {message}
      </span>
    </div>
  );
}
