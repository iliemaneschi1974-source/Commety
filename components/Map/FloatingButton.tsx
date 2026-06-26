"use client";

interface FloatingButtonProps {
  onClick: () => void;
}

export default function FloatingButton({
  onClick,
}: FloatingButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
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
        rounded-full
        bg-[#2563FF]
        text-4xl
        text-white
        shadow-xl
        transition
        hover:scale-105
        hover:bg-[#1d4ed8]
        active:scale-95
      "
    >
      +
    </button>
  );
}