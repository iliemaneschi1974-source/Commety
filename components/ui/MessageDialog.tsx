"use client";

interface MessageDialogProps {
  open: boolean;
  title: string;
  message: string;
  variant?: "error" | "info";
  onClose: () => void;
}

export default function MessageDialog({
  open,
  title,
  message,
  variant = "error",
  onClose,
}: MessageDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_42%,#1b4b87_62%,#0a2553_100%)] p-6 shadow-[0_18px_45px_rgba(2,16,42,0.45)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.18)_48%,transparent_62%)] [&>*]:relative [&>*]:z-10">

        <h2
          className={`mb-4 text-center text-xl font-bold ${
            variant === "error"
              ? "text-red-400"
              : "text-white"
          }`}
        >
          {title}
        </h2>

        <p className="mb-6 text-center text-white/90">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl border border-white/50 bg-white/95 py-3 font-medium text-[#0F2D5F] transition hover:bg-white"
        >
          OK
        </button>

      </div>
    </div>
  );
}
