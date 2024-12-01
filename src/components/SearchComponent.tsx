"use client";

import { useSearch } from "@/context/SearchContext";

export const SearchComponent = () => {
  const { query, setQuery } = useSearch();

  return (
    <div className="flex items-center gap-2">
      <div className="flex rounded-3xl ring-2 ring-inset ring-secondaryforeground opacity-50 focus-within:ring-2 hover:opacity-100 focus-within:ring-inset focus-within:opacity-100">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search..."
          className="text-lg rounded-3xl w-full px-5 py-1 border-0 bg-transparent focus:ring-0"
        />
      </div>
    </div>
  );
};
