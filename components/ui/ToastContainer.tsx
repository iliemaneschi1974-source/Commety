"use client";

import Toast, { ToastType } from "./Toast";

export interface ToastData {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastData[];
}

export default function ToastContainer({
  toasts,
}: ToastContainerProps) {
  return (
    <div
      className="
        fixed
        bottom-6
        left-1/2
        z-[5000]

        flex
        w-[92%]
        max-w-md
        -translate-x-1/2
        flex-col
        gap-3
      "
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </div>
  );
}