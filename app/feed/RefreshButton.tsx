"use client";

import { useState, useTransition } from "react";
import { refreshFeed } from "./actions";

export function RefreshButton() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        disabled={isPending}
        aria-busy={isPending}
        onClick={() => {
          startTransition(async () => {
            try {
              await refreshFeed();
              setError(null);
            } catch (e) {
              setError(
                e instanceof Error ? e.message : "Couldn't refresh the feed.",
              );
            }
          });
        }}
        className="rounded-full border border-neutral-700 px-4 py-1.5 text-sm font-medium text-neutral-50 transition-colors hover:border-neutral-500 hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-50 disabled:opacity-60"
      >
        {isPending ? "Refreshing…" : "Refresh"}
      </button>
      {error ? (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
