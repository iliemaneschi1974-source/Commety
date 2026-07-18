"use client";

import Image from "next/image";
import SearchBar from "./SearchBar";
import CategoryFilters from "./CategoryFilters";
import LocationButton from "./LocationButton";

export default function Header() {
  return (
    <div className="absolute top-5 left-1/2 z-[1000] w-[94%] max-w-3xl -translate-x-1/2">

      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_38%,#1b4b87_58%,#0a2553_100%)] p-4 shadow-[0_18px_45px_rgba(6,24,61,0.32)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.18)_48%,transparent_62%)] [&>*]:relative [&>*]:z-10 sm:p-5">

        <div className="mb-5 flex justify-center">

          <div className="rounded-2xl border border-white/70 bg-white/95 px-5 py-2 shadow-[0_8px_20px_rgba(2,16,42,0.28)]">
            <Image
              src="/logo.png"
              alt="Commety"
              width={160}
              height={44}
              priority
              className="object-contain"
            />
          </div>

        </div>

        <div className="flex gap-3">

          <SearchBar />

          <LocationButton />

        </div>

        <div className="mt-4">

          <CategoryFilters />

        </div>

      </div>

    </div>
  );
}
