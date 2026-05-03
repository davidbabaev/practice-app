"use client";

import { useActionState } from "react";
import { signupAction, type SignupState } from "./actions";

const initialState: SignupState = { status: "idle" };

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-3">
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        disabled={isPending}
        placeholder="you@example.com"
        autoComplete="email"
        className="rounded-full border border-neutral-700 bg-neutral-900 px-5 py-3 text-sm text-neutral-50 placeholder:text-neutral-500 focus-visible:border-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-50 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-neutral-50 px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-50 disabled:opacity-60"
      >
        {isPending ? "Joining…" : "Join Pulse"}
      </button>
      <p className="min-h-5 text-center text-sm" aria-live="polite">
        {state.status === "success" && (
          <span className="text-emerald-400">
            You&apos;re on the list as {state.email}.
          </span>
        )}
        {state.status === "error" && (
          <span className="text-red-400">{state.error}</span>
        )}
      </p>
    </form>
  );
}
