"use client";

import { useTransition } from "react";
import { refreshFeed } from "./actions";

export function RefreshButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await refreshFeed();
        });
      }}
      className="rounded-full border border-neutral-700 px-4 py-1.5 text-sm font-medium text-neutral-50 transition-colors hover:border-neutral-500 hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-50 disabled:opacity-60"
    >
      {isPending ? "Refreshing…" : "Refresh"}
    </button>
  );
}
