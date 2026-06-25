"use client";

import Image from "next/image";
import SearchBar from "./SearchBar";
import CategoryFilters from "./CategoryFilters";
import LocationButton from "./LocationButton";

export default function Header() {
  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[1000] w-[94%] max-w-3xl">

      <div className="
        rounded-3xl
        bg-white/90
        backdrop-blur-xl
        border
        border-white/60
        shadow-2xl
        p-5
      ">

        <div className="flex justify-center mb-5">

          <Image
            src="/logo.png"
            alt="Commety"
            width={180}
            height={50}
            priority
            className="object-contain"
          />

        </div>

        <div className="flex gap-3">

          <SearchBar />

          <LocationButton />

        </div>

        <div className="mt-5">

          <CategoryFilters />

        </div>

      </div>

    </div>
  );
}