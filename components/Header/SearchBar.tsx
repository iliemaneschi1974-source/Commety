"use client";
import { getZoomForPlace } from "@/lib/mapZoom";
import { useState } from "react";
import { Search, X, Loader2 } from "lucide-react";

import SearchResults from "./SearchResults";

import { useSearch } from "@/hooks/useSearch";
import { SearchResult } from "@/lib/geocoding";
import { useMapContext } from "@/contexts/MapContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const { results, loading } = useSearch(query);

  const {
  flyTo,
  fitBounds,
} = useMapContext();

function handleSelect(result: SearchResult) {

  if (result.boundingBox) {
    fitBounds(result.boundingBox);
  } else {
    flyTo(
      [result.lat, result.lon],
      getZoomForPlace(result.type)
    );
  }

  setQuery("");
}

  return (
    <div className="relative flex-1">

      <div
        className="
          flex
          items-center
          gap-3
          h-14
          rounded-2xl
          bg-white
          border
          border-slate-200
          px-4
          shadow-sm
          transition
          focus-within:border-[#2563FF]
          focus-within:ring-4
          focus-within:ring-blue-100
        "
      >
        <Search
          size={20}
          className="text-slate-400"
        />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca città o indirizzo..."
          className="
            flex-1
            bg-transparent
            outline-none
            text-[15px]
            placeholder:text-slate-400
          "
        />

        {loading && (
          <Loader2
            size={18}
            className="animate-spin text-[#2563FF]"
          />
        )}

        {!loading && query.length > 0 && (
          <button
            onClick={() => setQuery("")}
            className="
              w-7
              h-7
              rounded-full
              hover:bg-slate-100
              flex
              items-center
              justify-center
              transition
            "
          >
            <X size={16} />
          </button>
        )}
      </div>

      <SearchResults
        results={results}
        loading={loading}
        onSelect={handleSelect}
      />

    </div>
  );
}