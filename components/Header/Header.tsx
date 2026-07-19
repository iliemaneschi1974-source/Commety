"use client";

import Image from "next/image";
import SearchBar from "./SearchBar";
import LocationButton from "./LocationButton";

export default function Header() {
  return (
    <div className="absolute top-5 left-1/2 z-[1000] w-[94%] max-w-3xl -translate-x-1/2">

      <div className="relative overflow-visible rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_38%,#1b4b87_58%,#0a2553_100%)] p-4 shadow-[0_18px_45px_rgba(6,24,61,0.32)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.18)_48%,transparent_62%)] sm:p-5">

        <div className="relative z-10 mb-5 flex justify-center">

          <div className="px-5 py-1">
            <Image
              src="/logo-header-cropped.png"
              alt="Commety"
              width={180}
              height={48}
              priority
              className="object-contain [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.8))_drop-shadow(0_7px_8px_rgba(2,16,42,0.7))]"
            />
          </div>

        </div>

        <div className="relative z-20 flex gap-2 sm:gap-3">

          <SearchBar />

          <LocationButton />

        </div>

      </div>

    </div>
  );
}
