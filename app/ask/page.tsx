import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AskChat } from "./AskChat";

export const metadata: Metadata = {
  title: "Ask Pulse · Pulse",
  description: "Chat with Pulse — answers stream in token-by-token.",
};

export default function AskPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-neutral-950 px-6 py-16 font-sans text-neutral-50">
      <section className="flex w-full max-w-2xl flex-col">
        <Link
          href="/"
          className="self-start text-sm text-neutral-400 transition-colors hover:text-neutral-200"
        >
          ← Pulse
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
          Ask Pulse
        </h1>
        <p className="mt-4 text-base text-neutral-400 sm:text-lg">
          Ask anything. Answers stream in token-by-token.
        </p>
        <div className="mt-10">
          <Suspense
            fallback={
              <div className="flex flex-col gap-6" aria-hidden="true">
                <p className="text-center text-sm text-neutral-500">Loading…</p>
                <div className="h-[88px] rounded-2xl border border-neutral-800 bg-neutral-900" />
              </div>
            }
          >
            <AskChat />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
