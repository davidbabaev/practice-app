"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CAR_BRAND_SLUGS, CAR_CATEGORIES } from "@/app/lib/cars";
import { cn } from "@/lib/utils";

const CATEGORY_OPTIONS: { value: string | null; label: string }[] = [
  { value: null, label: "All" },
  ...CAR_CATEGORIES.map((c) => ({
    value: c,
    label: c.charAt(0).toUpperCase() + c.slice(1),
  })),
];

const BRAND_LABELS: Record<(typeof CAR_BRAND_SLUGS)[number], string> = {
  lamborghini: "Lamborghini",
  ferrari: "Ferrari",
  mclaren: "McLaren",
  mercedes: "Mercedes",
  bmw: "BMW",
  audi: "Audi",
  porsche: "Porsche",
};

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const inputClass =
  "rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-200 transition-colors focus-visible:border-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne";

export function CarFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const activeBrand = searchParams.get("brand") ?? "";
  const activeSort = searchParams.get("sort") ?? "";
  const urlSearch = searchParams.get("search") ?? "";

  const [searchInput, setSearchInput] = useState(urlSearch);

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  useEffect(() => {
    if (searchInput === urlSearch) return;
    const handle = setTimeout(() => {
      setParam("search", searchInput.trim() || null);
    }, 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORY_OPTIONS.map((opt) => {
          const isActive = (opt.value ?? null) === (activeCategory ?? null);
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => setParam("category", opt.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                isActive
                  ? "border-champagne text-champagne"
                  : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <select
        aria-label="Brand"
        value={activeBrand}
        onChange={(e) => setParam("brand", e.target.value || null)}
        className={inputClass}
      >
        <option value="">All brands</option>
        {CAR_BRAND_SLUGS.map((slug) => (
          <option key={slug} value={slug}>
            {BRAND_LABELS[slug]}
          </option>
        ))}
      </select>

      <input
        type="search"
        placeholder="Search cars…"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={inputClass}
      />

      <select
        aria-label="Sort"
        value={activeSort}
        onChange={(e) => setParam("sort", e.target.value || null)}
        className={inputClass}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
