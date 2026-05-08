"use client";

import { useActionState } from "react";
import { signupAction, type SignupState } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <Input
        id="email"
        name="email"
        type="email"
        required
        disabled={isPending}
        placeholder="you@example.com"
        autoComplete="email"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Joining…" : "Join Pulse"}
      </Button>
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
