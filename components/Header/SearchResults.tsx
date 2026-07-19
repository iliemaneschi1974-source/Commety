"use client";

import { MapPin } from "lucide-react";
import { SearchResult } from "@/lib/geocoding";

interface Props {
  results: SearchResult[];
  loading: boolean;
  onSelect: (result: SearchResult) => void;
}

export default function SearchResults({
  results,
  loading,
  onSelect,
}: Props) {
  if (loading) {
    return (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="p-4 text-center text-slate-500">
          Ricerca in corso...
        </div>
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      {results.map((result) => (
        <button
          key={result.id}
          onClick={() => onSelect(result)}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-4
            text-left
            hover:bg-slate-50
            transition
            border-b
            last:border-none
          "
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <MapPin
              size={18}
              className="text-[#2563FF]"
            />
          </div>

          <span className="text-sm text-slate-700">
            {result.name}
          </span>
        </button>
      ))}
    </div>
  );
}
