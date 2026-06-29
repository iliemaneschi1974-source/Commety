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
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
    },

    error: {
      icon: XCircle,
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
    },

    info: {
      icon: Info,
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
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

        px-4
        py-3

        shadow-xl

        ${current.bg}
        ${current.border}
        ${current.text}

        backdrop-blur-xl
      `}
    >
      <Icon
        size={20}
        strokeWidth={2.5}
      />

      <span className="font-medium">
        {message}
      </span>
    </div>
  );
}