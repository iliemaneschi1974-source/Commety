"use client";

interface MessageDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function MessageDialog({
  open,
  title,
  message,
  onClose,
}: MessageDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

        <h2 className="mb-4 text-xl font-bold text-red-600">
          {title}
        </h2>

        <p className="mb-6 text-slate-700">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-[#2563FF] py-3 font-medium text-white transition hover:bg-[#1d4ed8]"
        >
          OK
        </button>

      </div>
    </div>
  );
}